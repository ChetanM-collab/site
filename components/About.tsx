import { about, awards, profile } from "@/lib/profile";
import Reveal from "./Reveal";
import Section, { SectionLabel } from "./Section";

function Meta({ k, v, href }: { k: string; v: string; href?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-0">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
        {k}
      </span>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="text-right text-[13px] text-muted transition-colors hover:text-volt"
        >
          {v}
        </a>
      ) : (
        <span className="text-right text-[13px] text-muted">{v}</span>
      )}
    </div>
  );
}

export default function About() {
  return (
    <Section id="about">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Identity card */}
        <Reveal className="lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)] lg:self-start">
          <div className="edge relative overflow-hidden rounded-2xl border border-line bg-surface/50">
            <div className="relative aspect-[4/3.2] overflow-hidden border-b border-line bg-ink-2">
              <div className="grid-field-sm absolute inset-0 opacity-70" />
              <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-volt/20 blur-[80px]" />
              <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-mint/12 blur-[80px]" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-[clamp(4rem,12vw,6.5rem)] font-bold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(236,238,242,0.32)]">
                  {profile.initials}
                </span>
              </div>
              <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                Est. 2001
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Active
                </span>
              </div>
            </div>

            <div className="px-5 py-4">
              <Meta k="Role" v="Senior Engineer" />
              <Meta k="Desk" v="FX & CCE Technology" />
              <Meta k="Based" v="Greater Sydney, AU" />
              <Meta k="Email" v={profile.email} href={`mailto:${profile.email}`} />
              <Meta
                k="LinkedIn"
                v={profile.linkedinLabel}
                href={profile.linkedin}
              />
            </div>

            <div className="border-t border-line px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                Recognition
              </p>
              <ul className="mt-3 space-y-2.5">
                {awards.map((a) => (
                  <li key={a.title} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rotate-45 bg-volt" />
                    <span className="text-[13px] leading-snug text-muted">
                      {a.title}
                      <span className="ml-1.5 text-dim">· {a.org}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <SectionLabel index="01" label="About" />
            <p className="mt-6 font-display text-balance text-[clamp(1.6rem,3.1vw,2.35rem)] font-semibold leading-[1.16] tracking-[-0.03em]">
              {about.lead}
            </p>
          </Reveal>

          <div className="mt-8 space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={80 + i * 70}>
                <p className="text-pretty text-[15px] leading-[1.75] text-muted md:text-base">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300} className="mt-11 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                Strengths
              </p>
              <ul className="mt-4 space-y-2">
                {about.strengths.map((s) => (
                  <li
                    key={s}
                    className="group flex items-center gap-3 text-[14px] text-muted transition-colors hover:text-fg"
                  >
                    <span className="h-px w-4 bg-line transition-all duration-300 group-hover:w-7 group-hover:bg-volt" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                Interests
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {about.interests.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line bg-surface/50 px-3.5 py-1.5 text-[12.5px] text-muted transition-all duration-300 hover:border-volt/45 hover:text-fg"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
