"use client";

import { useState } from "react";
import { profile } from "@/lib/profile";
import Reveal from "./Reveal";
import { SectionLabel } from "./Section";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link is the fallback */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full border border-line bg-surface/50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-all duration-300 hover:border-volt/50 hover:text-fg"
    >
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="grain relative overflow-hidden border-t border-line px-6 py-28 md:px-10 md:py-40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-field absolute inset-0" />
        <div className="drift absolute -bottom-[26rem] left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-volt/[0.15] blur-[110px]" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl text-center">
        <Reveal className="flex justify-center">
          <SectionLabel index="06" label="Contact" />
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-7 font-display text-balance text-[clamp(2.2rem,6vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            Let&apos;s build something that{" "}
            <span className="text-gradient">holds up.</span>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-[15.5px] leading-relaxed text-muted md:text-base">
            Open to conversations about AI engineering, financial technology and
            hard system design problems. The inbox is the fastest way in.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-11 inline-block font-display text-[clamp(1.25rem,3.6vw,2.15rem)] font-medium tracking-[-0.02em]"
          >
            <span className="bg-gradient-to-r from-volt to-mint bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[length:100%_1px]">
              {profile.email}
            </span>
          </a>
        </Reveal>

        <Reveal delay={290} className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line bg-surface/50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-all duration-300 hover:border-volt/50 hover:text-fg"
          >
            LinkedIn ↗
          </a>
          <CopyButton value={profile.email} />
          <span className="rounded-full border border-line bg-surface/50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
            Sydney · AEST
          </span>
        </Reveal>
      </div>
    </section>
  );
}
