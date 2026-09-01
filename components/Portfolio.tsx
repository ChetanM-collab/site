import { profile } from "@/lib/profile";
import Reveal from "./Reveal";
import Section, { SectionHeading } from "./Section";
import Spotlight from "./Spotlight";

/**
 * Placeholder gallery. These are intentionally unnamed slots — the redacted
 * bars stand in for real case studies. To publish work, replace `slots` with
 * real entries and swap the skeleton body for content.
 */
const slots = [
  { id: "01", track: "Systems Engineering", bars: [88, 62, 74] },
  { id: "02", track: "AI / Machine Learning", bars: [72, 90, 58] },
  { id: "03", track: "Financial Technology", bars: [80, 55, 68] },
];

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect
        x="2.5"
        y="6"
        width="9"
        height="6.5"
        rx="1.6"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4.75 6V4.4a2.25 2.25 0 1 1 4.5 0V6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Portfolio() {
  return (
    <Section id="portfolio">
      <SectionHeading
        index="04"
        label="Portfolio"
        title={
          <>
            Selected work is{" "}
            <span className="text-gradient">in the build.</span>
          </>
        }
        lede="A case-study portfolio is being assembled — systems engineering, financial technology, and the AI work currently under way. This section is the placeholder it will drop into."
      />

      <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-3">
        {slots.map((slot, i) => (
          <Reveal key={slot.id} delay={i * 80}>
            <Spotlight
              as="article"
              className="edge group relative flex h-full min-h-[15rem] md:min-h-[19rem] flex-col overflow-hidden rounded-2xl border border-line bg-surface/40 p-6"
            >
              <div className="grid-field-sm pointer-events-none absolute inset-0 opacity-40" />

              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] text-dim">
                  {slot.id}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ink/70 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-dim transition-colors duration-500 group-hover:border-volt/35 group-hover:text-volt">
                  <LockIcon />
                  In progress
                </span>
              </div>

              {/* redacted skeleton */}
              <div className="relative mt-auto space-y-3 pt-10">
                <div className="h-3.5 w-2/3 rounded-sm bg-gradient-to-r from-white/[0.13] to-white/[0.04] transition-all duration-700 group-hover:from-volt/35" />
                <div className="space-y-2 pt-2">
                  {slot.bars.map((w, j) => (
                    <div
                      key={j}
                      style={{ width: `${w}%` }}
                      className="h-2 rounded-sm bg-white/[0.055] transition-colors duration-700 group-hover:bg-white/[0.09]"
                    />
                  ))}
                </div>
              </div>

              <div className="relative mt-6 border-t border-line pt-4">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-dim transition-colors duration-500 group-hover:text-muted">
                  {slot.track}
                </p>
              </div>
            </Spotlight>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="edge mt-4 flex flex-col items-start gap-5 rounded-2xl border border-line bg-gradient-to-br from-surface/60 to-ink p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="max-w-xl">
            <p className="font-display text-[19px] font-semibold tracking-[-0.02em] md:text-[21px]">
              Want to see the work before it ships?
            </p>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
              Happy to walk through architecture, trade-offs and results
              directly. Reach out and I&apos;ll share what I can.
            </p>
          </div>
          <a
            href={`mailto:${profile.email}?subject=Portfolio%20enquiry`}
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-fg px-6 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:shadow-[0_0_40px_-8px_rgba(255,255,255,0.45)]"
          >
            Request a walkthrough
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5">
              <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
