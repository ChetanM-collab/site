import { deployments, education, experience } from "@/lib/profile";
import Reveal from "./Reveal";
import Section, { SectionHeading } from "./Section";
import Spotlight from "./Spotlight";

export default function Career() {
  return (
    <Section id="career">
      <SectionHeading
        index="02"
        label="Career"
        title={
          <>
            Twenty-four years, one throughline:{" "}
            <span className="text-gradient">banking systems that hold.</span>
          </>
        }
        lede="From FLEXCUBE rollouts on four continents to the FX platform at an institutional bank — a career spent close to the money and close to the metal."
      />

      <ol className="relative mt-16 md:mt-20">
        {/* rail */}
        <span
          aria-hidden
          className="absolute left-[7px] top-2 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-volt/70 via-line to-transparent md:block"
        />

        {experience.map((role, i) => (
          <li key={role.company} className="relative md:pl-14">
            {/* node */}
            <span
              aria-hidden
              className="absolute left-0 top-9 hidden h-[15px] w-[15px] items-center justify-center md:flex"
            >
              <span
                className={`h-[7px] w-[7px] rotate-45 ${
                  role.current
                    ? "bg-volt shadow-[0_0_16px_var(--color-volt)]"
                    : "bg-line ring-1 ring-line"
                }`}
              />
            </span>

            <Reveal delay={i * 60}>
              <Spotlight
                as="article"
                className="edge group mb-4 overflow-hidden rounded-2xl border border-line bg-surface/40 p-6 transition-colors duration-500 hover:border-white/12 md:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-display text-[19px] font-semibold tracking-[-0.02em] md:text-[22px]">
                        {role.company}
                      </h3>
                      {role.current ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/30 bg-mint/10 px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-mint">
                          <span className="pulse-dot h-1 w-1 rounded-full bg-mint" />
                          Current
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1.5 text-[14px] text-muted">{role.title}</p>
                  </div>

                  <div className="shrink-0 text-left md:text-right">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                      {role.period}
                    </p>
                    <p className="mt-1 font-mono text-[10.5px] tracking-[0.12em] text-dim">
                      {role.duration}
                      {role.location ? ` · ${role.location}` : ""}
                    </p>
                  </div>
                </div>

                <p className="mt-5 max-w-3xl text-pretty text-[14.5px] leading-relaxed text-muted">
                  {role.summary}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {role.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[14px] leading-relaxed text-muted">
                      <span className="mt-[9px] h-px w-3.5 shrink-0 bg-volt/55" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                  {role.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-line bg-ink/60 px-2.5 py-1 font-mono text-[10.5px] tracking-wide text-dim transition-colors duration-300 group-hover:text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Spotlight>
            </Reveal>
          </li>
        ))}
      </ol>

      {/* Deployments + education */}
      <div className="mt-16 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="h-full rounded-2xl border border-line bg-surface/30 p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
              On-site deliveries
            </p>
            <ul className="mt-5 divide-y divide-line">
              {deployments.map((d) => (
                <li
                  key={d.org}
                  className="group flex items-baseline justify-between gap-4 py-3"
                >
                  <span className="text-[14.5px] text-fg/90">{d.org}</span>
                  <span className="flex items-center gap-3 font-mono text-[11px] tracking-wide text-dim">
                    <span className="h-px w-5 bg-line transition-all duration-300 group-hover:w-9 group-hover:bg-volt" />
                    {d.place}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="h-full rounded-2xl border border-line bg-surface/30 p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
              Education &amp; certification
            </p>
            <ul className="mt-5 space-y-5">
              {education.map((e) => (
                <li key={e.title}>
                  <p className="text-[15px] font-medium text-fg">{e.title}</p>
                  <p className="mt-1 text-[13.5px] text-muted">{e.org}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-dim">{e.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
