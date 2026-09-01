"use client";

import { useCallback, type ReactNode } from "react";

/**
 * Wraps content in a card that tracks the pointer and renders a soft
 * accent glow behind it (see `.spot` in globals.css).
 */
export default function Spotlight({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <Tag onMouseMove={onMove} className={`spot ${className}`}>
      {children}
    </Tag>
  );
}
