import { marquee, profile, stats } from "@/lib/profile";
import FxTicker from "./FxTicker";
import Reveal from "./Reveal";

function ArrowDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M6 1v10M2 7l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path
        d="M3 9L9 3M9 3H4M9 3v5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden">
      {/* Ambient field */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-field absolute inset-0" />
        <div className="drift absolute -top-[28rem] left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-volt/[0.17] blur-[110px]" />
        <div className="absolute -right-40 top-40 h-[30rem] w-[30rem] rounded-full bg-mint/[0.08] blur-[110px]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-[calc(var(--nav-h)+3.5rem)] md:px-10 md:pb-20 md:pt-[calc(var(--nav-h)+5rem)]">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Left */}
          <div>
            <Reveal className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/50 py-1.5 pl-2.5 pr-4 backdrop-blur-sm">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_10px_var(--color-mint)]" />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">
                Sydney, AU
                <span className="hidden sm:inline"> · {profile.availability}</span>
              </span>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-7 font-display text-balance text-[clamp(2.5rem,6.1vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.042em]">
                Building the{" "}
                <span className="text-gradient whitespace-nowrap">high-stakes</span> systems
                behind global FX.
              </h1>
            </Reveal>

            <Reveal delay={170}>
              <p className="mt-7 max-w-xl text-pretty text-[16px] leading-relaxed text-muted md:text-[17px]">
                I&apos;m <span className="text-fg">{profile.name}</span> — a senior
                engineer on the FX &amp; CCE technology team at{" "}
                <span className="text-fg">{profile.company}</span>. Core Java,
                Spring Boot, Kafka and SQL Server, applied to systems where
                downtime is measured in money.
              </p>
            </Reveal>

            <Reveal delay={240} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#career"
                className="group inline-flex items-center gap-2.5 rounded-full bg-fg px-6 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:shadow-[0_0_40px_-8px_rgba(255,255,255,0.45)]"
              >
                Explore the career
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                  <ArrowDown />
                </span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/50 px-6 py-3.5 text-sm font-medium text-fg backdrop-blur-sm transition-all duration-300 hover:border-volt/50 hover:bg-volt/10"
              >
                LinkedIn
                <ArrowUpRight />
              </a>
            </Reveal>

            {/* Stats */}
            <Reveal delay={320}>
              <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="group bg-ink/85 px-4 py-5 transition-colors duration-300 hover:bg-surface/80"
                  >
                    <dt className="font-display text-[26px] font-semibold leading-none tracking-tight">
                      {s.value}
                      {s.suffix ? (
                        <span className="ml-1 align-top font-mono text-[10px] font-normal text-volt">
                          {s.suffix}
                        </span>
                      ) : null}
                    </dt>
                    <dd className="mt-2 text-[11.5px] leading-snug text-dim transition-colors duration-300 group-hover:text-muted">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right */}
          <Reveal delay={220} className="lg:pl-4">
            <FxTicker />
          </Reveal>
        </div>
      </div>

      {/* Tech marquee */}
      <div className="relative border-y border-line bg-ink/60 py-4 backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
        <div className="flex w-max">
          <div className="marquee-track flex w-max">
            {[...marquee, ...marquee].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex items-center gap-8 whitespace-nowrap px-8 font-mono text-[11px] uppercase tracking-[0.24em] text-dim"
              >
                {item}
                <span className="h-1 w-1 rotate-45 bg-volt/60" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
