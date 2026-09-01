import { LIMITS, SYSTEM_PROMPT, TWIN_MODEL } from "@/lib/twin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

type ChatMessage = { role: "user" | "assistant"; content: string };

/**
 * Fixed-window rate limit. In-memory, so it is per server process — enough for
 * a single-instance personal site, not for a horizontally scaled deploy.
 */
const WINDOW_MS = 5 * 60_000;
const MAX_REQUESTS = 25;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    // Opportunistic cleanup so the map cannot grow without bound.
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
    }
    return { ok: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
}

function bad(message: string, status: number, extra?: HeadersInit) {
  return Response.json({ error: message }, { status, headers: extra });
}

function parseMessages(raw: unknown): ChatMessage[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const out: ChatMessage[] = [];
  for (const m of raw.slice(-LIMITS.maxMessages)) {
    if (typeof m !== "object" || m === null) return null;
    const { role, content } = m as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    const trimmed = content.trim();
    if (!trimmed) continue;
    out.push({ role, content: trimmed.slice(0, LIMITS.maxCharsPerMessage) });
  }

  if (!out.length || out[out.length - 1].role !== "user") return null;
  return out;
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return bad(
      "The digital twin is not configured — OPENROUTER_API_KEY is missing from .env.",
      500,
    );
  }

  const limit = rateLimit(clientKey(req));
  if (!limit.ok) {
    return bad("Too many messages just now. Give it a minute.", 429, {
      "Retry-After": String(limit.retryAfter),
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad("Malformed request body.", 400);
  }

  const messages = parseMessages((body as { messages?: unknown })?.messages);
  if (!messages) return bad("Invalid message list.", 400);

  let upstream: Response;
  try {
    upstream = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // OpenRouter attribution headers.
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Chetan Mohite - Digital Twin", // ASCII only: headers are ByteStrings
      },
      body: JSON.stringify({
        model: TWIN_MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: LIMITS.maxOutputTokens,
        temperature: 0.2,
        // This model otherwise emits its chain-of-thought into `content`.
        reasoning: { enabled: false },
        stream: true,
      }),
    });
  } catch (err) {
    console.error("OpenRouter fetch failed:", err);
    return bad("Could not reach OpenRouter.", 502);
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error("OpenRouter error", upstream.status, detail.slice(0, 500));
    return bad(
      upstream.status === 401
        ? "OpenRouter rejected the API key."
        : "The model is unavailable right now. Try again shortly.",
      502,
    );
  }

  // Translate OpenRouter's SSE frames into a plain UTF-8 text stream.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const reader = upstream.body.getReader();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          controller.close();
          return;
        }

        buffer += decoder.decode(value, { stream: true });

        // SSE frames are newline-delimited; keep any partial trailing line.
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        let emitted = "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue; // skips ": OPENROUTER PROCESSING" keepalives

          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") {
            controller.enqueue(encoder.encode(emitted));
            controller.close();
            return;
          }

          try {
            const chunk = JSON.parse(payload);
            const delta = chunk?.choices?.[0]?.delta?.content;
            if (typeof delta === "string") emitted += delta;
          } catch {
            // Ignore partial or unexpected frames.
          }
        }

        if (emitted) {
          controller.enqueue(encoder.encode(emitted));
          return;
        }
      }
    },
    cancel(reason) {
      reader.cancel(reason).catch(() => {});
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
