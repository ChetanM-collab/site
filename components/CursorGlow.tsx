"use client";

import { useEffect, useRef } from "react";

/**
 * Soft accent light that trails the pointer. Fine-pointer devices only,
 * disabled under prefers-reduced-motion.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let frame = 0;

    // The easing loop parks itself once it catches up to the pointer, so an
    // idle page does no per-frame work.
    const tick = () => {
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      pos.x += dx * 0.08;
      pos.y += dy * 0.08;
      el.style.transform = `translate3d(${pos.x - 320}px, ${pos.y - 320}px, 0)`;

      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      el.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[640px] w-[640px] opacity-0 transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--color-volt) 9%, transparent) 0%, transparent 62%)",
      }}
    />
  );
}
