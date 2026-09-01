"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "@/lib/profile";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(y > 24);
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.querySelector(n.href))
      .filter((el): el is Element => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-b border-line bg-ink/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[var(--nav-h)] w-full max-w-6xl flex-nowrap items-center justify-between gap-4 px-6 md:px-10">
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label={`${profile.name} — home`}
          >
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[10px] border border-line bg-surface font-display text-[13px] font-bold tracking-tight">
              <span className="relative z-10">{profile.initials}</span>
              <span className="absolute inset-0 -translate-y-full bg-gradient-to-b from-volt/45 to-mint/25 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            </span>
            <span className="hidden text-[13px] font-medium tracking-tight lg:block">
              {profile.name}
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`group relative rounded-full px-3.5 py-2 text-[13px] transition-colors duration-300 ${
                    isActive ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  <span className="mr-1.5 font-mono text-[10px] text-dim transition-colors group-hover:text-volt">
                    {item.index}
                  </span>
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-volt to-transparent transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="hidden rounded-full border border-line bg-surface/60 px-4 py-2 text-[13px] font-medium text-fg transition-all duration-300 hover:border-volt/50 hover:bg-volt/10 lg:inline-block"
            >
              Get in touch
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-[10px] border border-line bg-surface/60 md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-px w-4 bg-fg transition-transform duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-4 bg-fg transition-opacity duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-4 bg-fg transition-transform duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          aria-hidden
          className="h-px w-full origin-left bg-gradient-to-r from-volt via-volt-soft to-mint transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-ink/96 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="grid-field-sm absolute inset-0 opacity-40" />
        <nav className="relative flex h-full flex-col justify-center gap-1 px-8">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${80 + i * 55}ms` : "0ms" }}
              className={`group flex items-baseline gap-4 border-b border-line py-5 font-display text-3xl font-semibold tracking-tight transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <span className="font-mono text-xs text-volt">{item.index}</span>
              <span className="transition-transform duration-300 group-active:translate-x-1">
                {item.label}
              </span>
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            onClick={() => setOpen(false)}
            className="mt-8 rounded-full bg-fg px-6 py-3.5 text-center text-sm font-semibold text-ink"
          >
            {profile.email}
          </a>
        </nav>
      </div>
    </>
  );
}
