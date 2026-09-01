"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@/lib/profile";
import { LIMITS, SUGGESTED_QUESTIONS, TWIN_MODEL } from "@/lib/twin";
import Reveal from "./Reveal";
import Section, { SectionHeading } from "./Section";

type Message = { id: string; role: "user" | "assistant"; content: string };

let seq = 0;
const nextId = () => `m${++seq}`;

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2 7h10M8.5 3.5L12 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="4" y="4" width="6" height="6" rx="1" fill="currentColor" />
    </svg>
  );
}

export default function Twin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Keep the newest message in view without yanking the whole page around.
  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    log.scrollTop = log.scrollHeight;
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || pending) return;

      setError(null);
      setInput("");

      const userMessage: Message = {
        id: nextId(),
        role: "user",
        content: question.slice(0, LIMITS.maxCharsPerMessage),
      };
      const replyId = nextId();

      // Snapshot the transcript we send so we do not depend on state timing.
      const history = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      setMessages((prev) => [
        ...prev,
        userMessage,
        { id: replyId, role: "assistant", content: "" },
      ]);
      setPending(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const detail = await res
            .json()
            .then((d) => d?.error as string | undefined)
            .catch(() => undefined);
          throw new Error(detail ?? "The twin could not answer that one.");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) => (m.id === replyId ? { ...m, content: acc } : m)),
          );
        }

        if (!acc.trim()) {
          throw new Error("The model returned an empty answer. Try rephrasing.");
        }
      } catch (err) {
        if ((err as Error)?.name === "AbortError") {
          // User pressed stop — keep whatever streamed in, drop it if empty.
          setMessages((prev) =>
            prev.filter((m) => m.id !== replyId || m.content.trim()),
          );
        } else {
          setMessages((prev) => prev.filter((m) => m.id !== replyId));
          setError((err as Error).message);
        }
      } finally {
        setPending(false);
        abortRef.current = null;
      }
    },
    [messages, pending],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  };

  const empty = messages.length === 0;

  return (
    <Section id="twin" className="bg-ink-2/40">
      <SectionHeading
        index="05"
        label="Digital Twin"
        title={
          <>
            Ask my <span className="text-gradient">digital twin.</span>
          </>
        }
        lede="An AI trained on my professional profile. Ask it about the FX work, the FLEXCUBE rollouts, the stack, or where I'm heading next — it answers in my voice, from my record."
      />

      <Reveal delay={80} className="mt-12 md:mt-14">
        <div className="edge overflow-hidden rounded-2xl border border-line bg-surface/40">
          {/* Console header */}
          <div className="flex items-center justify-between gap-4 border-b border-line bg-ink/50 px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  pending
                    ? "pulse-dot bg-volt shadow-[0_0_10px_var(--color-volt)]"
                    : "bg-mint shadow-[0_0_10px_var(--color-mint)]"
                }`}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                {pending ? "Thinking" : "Twin online"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {messages.length > 0 && !pending ? (
                <button
                  type="button"
                  onClick={() => {
                    setMessages([]);
                    setError(null);
                    inputRef.current?.focus();
                  }}
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim transition-colors hover:text-fg"
                >
                  Reset
                </button>
              ) : null}
              <span
                className="hidden font-mono text-[10px] tracking-[0.14em] text-dim sm:block"
                title="Model serving this chat"
              >
                {TWIN_MODEL}
              </span>
            </div>
          </div>

          {/* Transcript */}
          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-label="Conversation with Chetan's digital twin"
            className="h-[24rem] overflow-y-auto px-5 py-6 md:h-[27rem] md:px-7"
          >
            {empty ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-ink font-display text-[13px] font-bold tracking-tight text-fg">
                  {profile.initials}
                </span>
                <p className="mt-4 max-w-sm text-pretty text-[14.5px] leading-relaxed text-muted">
                  Ask me anything about my 24 years in banking technology.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => void send(q)}
                      className="rounded-full border border-line bg-surface/60 px-3.5 py-2 text-[12.5px] text-muted transition-all duration-300 hover:border-volt/50 hover:bg-volt/10 hover:text-fg"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <ul className="space-y-5">
                {messages.map((m) => {
                  const isUser = m.role === "user";
                  const streaming = pending && !isUser && !m.content;
                  return (
                    <li
                      key={m.id}
                      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      {!isUser ? (
                        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-volt/30 bg-volt/10 font-display text-[10px] font-bold tracking-tight text-volt-soft">
                          {profile.initials}
                        </span>
                      ) : null}
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14.5px] leading-relaxed md:max-w-[76%] ${
                          isUser
                            ? "rounded-br-sm bg-fg text-ink"
                            : "rounded-bl-sm border border-line bg-ink/70 text-fg/90"
                        }`}
                      >
                        {streaming ? (
                          <span className="flex items-center gap-1.5 py-0.5">
                            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-volt" />
                            <span
                              className="pulse-dot h-1.5 w-1.5 rounded-full bg-volt"
                              style={{ animationDelay: "220ms" }}
                            />
                            <span
                              className="pulse-dot h-1.5 w-1.5 rounded-full bg-volt"
                              style={{ animationDelay: "440ms" }}
                            />
                          </span>
                        ) : (
                          <p className="whitespace-pre-wrap text-pretty">
                            {m.content}
                            {pending && !isUser ? (
                              <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-volt align-baseline" />
                            ) : null}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {error ? (
            <p
              role="alert"
              className="border-t border-ember/25 bg-ember/[0.07] px-5 py-3 text-[13px] text-ember md:px-7"
            >
              {error}
            </p>
          ) : null}

          {/* Composer */}
          <div className="border-t border-line bg-ink/50 p-3 md:p-4">
            <div className="flex items-end gap-2 rounded-xl border border-line bg-surface/60 px-3 py-2 transition-colors duration-300 focus-within:border-volt/50">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value.slice(0, LIMITS.maxCharsPerMessage));
                  e.target.style.height = "auto";
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                }}
                onKeyDown={onKeyDown}
                placeholder="Ask about the FX platform, the Kafka stack, the FLEXCUBE years…"
                aria-label="Ask the digital twin a question"
                className="max-h-[120px] flex-1 resize-none bg-transparent py-1.5 text-[14.5px] text-fg outline-none placeholder:text-dim"
              />
              {pending ? (
                <button
                  type="button"
                  onClick={() => abortRef.current?.abort()}
                  aria-label="Stop generating"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-ink text-muted transition-colors hover:border-ember/50 hover:text-ember"
                >
                  <StopIcon />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void send(input)}
                  disabled={!input.trim()}
                  aria-label="Send message"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-fg text-ink transition-all duration-300 enabled:hover:shadow-[0_0_24px_-6px_rgba(255,255,255,0.55)] disabled:cursor-not-allowed disabled:bg-surface disabled:text-dim"
                >
                  <SendIcon />
                </button>
              )}
            </div>

            <p className="mt-2.5 px-1 text-[11.5px] leading-relaxed text-dim">
              AI-generated from {profile.name}&apos;s professional profile — it can
              be imprecise or incomplete. For anything that matters, email{" "}
              <a
                href={`mailto:${profile.email}`}
                className="text-muted underline decoration-line underline-offset-2 transition-colors hover:text-volt"
              >
                {profile.email}
              </a>
              .
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
