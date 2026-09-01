import type { ReactNode } from "react";
import Reveal from "./Reveal";

export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] text-dim uppercase">
      <span className="text-volt">{index}</span>
      <span className="h-px w-8 bg-line" />
      <span>{label}</span>
    </div>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  lede,
  align = "left",
}: {
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={
        align === "center"
          ? "flex flex-col items-center text-center gap-5"
          : "flex flex-col gap-5"
      }
    >
      <SectionLabel index={index} label={label} />
      <h2 className="font-display text-balance text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
        {title}
      </h2>
      {lede ? (
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted md:text-base">
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}

export default function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative border-t border-line px-6 py-24 md:px-10 md:py-32 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
