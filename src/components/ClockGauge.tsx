"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HOURS } from "@/lib/content";

// Points the hour-hand at the current ("TICKING") hour on a 6-hour dial.
export default function ClockGauge({ size = 88 }: { size?: number }) {
  const reduce = useReducedMotion();
  const currentIndex = Math.max(
    HOURS.findIndex((h) => h.status === "descending"),
    0
  );
  const angle = (currentIndex / HOURS.length) * 360;

  return (
    <div
      className="relative shrink-0 rounded-full border border-brass/40 bg-gunmetal-deep"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {HOURS.map((_, i) => {
        const tickAngle = (i / HOURS.length) * 360;
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 h-2 w-px bg-brass/50"
            style={{
              transform: `rotate(${tickAngle}deg) translateY(-${size / 2 - 6}px)`,
              transformOrigin: "center",
            }}
          />
        );
      })}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[30%] w-[2px] origin-bottom bg-brass"
        style={{ marginLeft: -1, marginTop: -size * 0.3 }}
        initial={reduce ? { rotate: angle } : { rotate: 0 }}
        animate={{ rotate: angle }}
        transition={reduce ? { duration: 0 } : { duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass" />
    </div>
  );
}
