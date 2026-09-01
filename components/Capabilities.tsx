import { certifications, skillGroups } from "@/lib/profile";
import Reveal from "./Reveal";
import Section, { SectionHeading } from "./Section";
import Spotlight from "./Spotlight";

export default function Capabilities() {
  return (
    <Section id="capabilities" className="bg-ink-2/40">
      <SectionHeading
        index="03"
        label="Capabilities"
        title={
          <>
            The stack behind the{" "}
            <span className="text-gradient">work.</span>
          </>
        }
        lede="Deep in the JVM and the database, fluent across the domain, and actively extending into machine learning."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.id} delay={i * 55}>
            <Spotlight className="flex h-full flex-col bg-ink px-6 py-7 transition-colors duration-500 hover:bg-surface/50">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-[16px] font-semibold tracking-[-0.01em]">
                  {group.label}
                </h3>
                <span className="font-mono text-[10px] tracking-[0.2em] text-dim">
                  {group.id}
                </span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-surface/50 px-2.5 py-1.5 text-[12.5px] text-muted transition-all duration-300 hover:border-volt/45 hover:bg-volt/10 hover:text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-4 flex flex-col gap-5 rounded-2xl border border-line bg-surface/30 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
              Certifications
            </p>
            <p className="mt-2 text-[14.5px] text-muted">
              Data science and machine learning coursework, completed alongside
              full-time engineering.
            </p>
          </div>
          <ul className="flex flex-wrap gap-1.5 md:justify-end">
            {certifications.map((c) => (
              <li
                key={c}
                className="rounded-full border border-line bg-ink/70 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-dim"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
