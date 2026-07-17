"use client";

import { motion, useReducedMotion } from "framer-motion";

// Radial "gold poured" gauge — an arc that fills to `pct`, brass over ash.
export default function MendGauge({ pct = 0, size = 48 }: { pct?: number; size?: number }) {
  const reduce = useReducedMotion();
  const stroke = Math.max(3, size * 0.09);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.min(100, Math.max(0, pct));

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="progressbar" aria-label="Total gold poured" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(clamped)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(239,231,212,0.12)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#mend-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: reduce ? c * (1 - clamped / 100) : c }}
          whileInView={{ strokeDashoffset: c * (1 - clamped / 100) }}
          viewport={{ once: true }}
          transition={reduce ? { duration: 0 } : { duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: "drop-shadow(0 0 5px rgba(199,151,46,0.5))" }}
        />
        <defs>
          <linearGradient id="mend-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5C1A1B" />
            <stop offset="55%" stopColor="#C7972E" />
            <stop offset="100%" stopColor="#F0D488" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono font-bold text-brass" style={{ fontSize: size * 0.24 }}>
          {Math.round(clamped)}
        </span>
      </div>
    </div>
  );
}
