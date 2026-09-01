"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Decorative FX board. Rates are simulated client-side only — they are a
 * visual motif for the domain, not market data. Rendering is deferred until
 * after mount so server and client markup always agree.
 */
const PAIRS = [
  { pair: "AUD/USD", base: 0.6612, dp: 4 },
  { pair: "EUR/USD", base: 1.0847, dp: 4 },
  { pair: "USD/JPY", base: 151.42, dp: 2 },
  { pair: "GBP/AUD", base: 1.9214, dp: 4 },
  { pair: "AUD/NZD", base: 1.0876, dp: 4 },
];

type Row = { pair: string; price: string; delta: number; dir: 1 | -1 | 0 };

function seedRows(): Row[] {
  return PAIRS.map((p) => ({
    pair: p.pair,
    price: p.base.toFixed(p.dp),
    delta: 0,
    dir: 0,
  }));
}

export default function FxTicker() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const prices = useRef(PAIRS.map((p) => p.base));

  useEffect(() => {
    setRows(seedRows());

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setRows(
        PAIRS.map((p, i) => {
          const drift = (Math.random() - 0.5) * p.base * 0.0009;
          const next = prices.current[i] + drift;
          const dir: 1 | -1 | 0 = drift > 0 ? 1 : drift < 0 ? -1 : 0;
          prices.current[i] = next;
          return {
            pair: p.pair,
            price: next.toFixed(p.dp),
            delta: ((next - p.base) / p.base) * 100,
            dir,
          };
        }),
      );
    }, 1600);

    return () => window.clearInterval(id);
  }, []);

  const display = rows ?? seedRows();

  return (
    <div className="edge relative overflow-hidden rounded-2xl border border-line bg-surface/70 backdrop-blur-xl">
      {/* header */}
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_10px_var(--color-mint)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            FX Desk
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
          Simulated
        </span>
      </div>

      {/* rows */}
      <div className="divide-y divide-line">
        {display.map((r) => {
          const up = r.dir === 1;
          const flat = r.dir === 0;
          return (
            <div
              key={r.pair}
              className="group grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-3 transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <span className="font-mono text-[12px] tracking-wide text-muted transition-colors group-hover:text-fg">
                {r.pair}
              </span>
              <span
                className={`font-mono text-[13px] tabular-nums transition-colors duration-500 ${
                  flat ? "text-fg" : up ? "text-mint" : "text-ember"
                }`}
              >
                {r.price}
              </span>
              <span
                className={`w-16 text-right font-mono text-[11px] tabular-nums ${
                  flat ? "text-dim" : up ? "text-mint/80" : "text-ember/80"
                }`}
              >
                {flat ? "—" : `${r.delta > 0 ? "+" : ""}${r.delta.toFixed(3)}%`}
              </span>
            </div>
          );
        })}
      </div>

      {/* footer strip */}
      <div className="flex items-center justify-between border-t border-line bg-ink/40 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
          Kafka · Spring Boot · SQL Server
        </span>
        <span className="font-mono text-[10px] text-dim">SYD</span>
      </div>

      {/* scanline sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="sweep h-24 w-full bg-gradient-to-b from-transparent via-volt/[0.055] to-transparent" />
      </div>
    </div>
  );
}
