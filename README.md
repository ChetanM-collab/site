# Chetan Mohite — Personal Site

A single-page professional site built with Next.js 16 (App Router) and Tailwind CSS v4.
Dark, hairline-structured "enterprise meets edgy" design with a two-stop voltage accent.

## Run it

```bash
npm run dev
```

Then open http://localhost:3000

The digital twin needs an OpenRouter key in `.env` at the project root
(see `.env.example`):

```
OPENROUTER_API_KEY=sk-or-v1-...
```

`.env` is gitignored. The key is read server-side only, in the API route — it is
never sent to the browser.

```bash
npm run build && npm start   # production build
```

## Where things live

| Path | What it is |
| --- | --- |
| `lib/profile.ts` | **All site content.** Name, roles, skills, education, awards, nav. Edit here and the whole page follows. |
| `app/globals.css` | Design tokens (`@theme`), grid/grain/glow utilities, scroll-reveal and marquee keyframes. |
| `app/layout.tsx` | Fonts (Space Grotesk / Inter / JetBrains Mono), metadata, Open Graph. |
| `app/page.tsx` | Section order + Person JSON-LD. |
| `app/icon.svg` | Favicon (CM monogram). |
| `components/` | One file per section, plus `Reveal`, `Spotlight`, `Section`, `CursorGlow` primitives. |
| `lib/twin.ts` | Digital-twin system prompt, model id, and request limits. The twin's knowledge is generated from `lib/profile.ts`. |
| `app/api/chat/route.ts` | Server-side OpenRouter proxy. Validates input, rate-limits, streams the reply back as plain text. |
| `components/Twin.tsx` | The chat UI. |

## Sections

`Hero → About → Career → Capabilities → Portfolio → Digital Twin → Contact`

## The digital twin

An AI that answers career questions in Chetan's voice, served by
`nvidia/nemotron-3.5-lightning:free` through OpenRouter.

- **Grounded in `lib/profile.ts`.** `buildDossier()` serialises the profile into
  the system prompt, so editing the profile updates what the twin knows. It is
  instructed to refuse anything the profile does not cover and point to email.
- **Reasoning is disabled** (`reasoning: { enabled: false }`). This model
  otherwise streams its chain-of-thought into `content`.
- **Guardrails:** no salary or visa talk, no speaking for Westpac, resists
  persona overrides and prompt-injection, and admits to being an AI when asked.
- **Abuse limits:** 25 requests per IP per 5 minutes, 16 messages of history,
  1200 chars per message, 700 output tokens. The limiter is in-memory, so it is
  per server process — fine for a single instance, not for a scaled deploy.
- **Accuracy caveat:** this is a small, free model. It is reliable on the facts
  in the profile but will occasionally add a flourish that is not sourced, and
  the free tier can be slow to first token or truncate a reply. Swap
  `TWIN_MODEL` in `lib/twin.ts` for a paid model if that matters.

## Notes

- **Portfolio is a placeholder.** `components/Portfolio.tsx` renders three redacted
  slots by design. To publish real work, replace the `slots` array with real entries
  and swap the skeleton body for content.
- **The FX ticker is decorative.** `components/FxTicker.tsx` simulates rates
  client-side purely as a visual motif — it is labelled "Simulated" on the page and
  is not market data.
- **The twin is labelled as AI** in the UI, with a line pointing to email for
  anything that matters. Worth keeping — it speaks in the first person as a real
  person.
- **Motion is hand-rolled**, no animation library: `IntersectionObserver` +
  CSS transitions. Everything respects `prefers-reduced-motion`.

## Content source

Text is drawn from `ChetanLinkedInProfile.pdf` (LinkedIn export).
