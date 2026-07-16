# Components

Shared UI primitives used across pages. No component library — all hand-built with Tailwind.

## RankPortrait — `src/components/RankPortrait.tsx`
Renders a generated portrait image with a rank-tinted overlay (oxblood multiply blend, opacity scales with court-rank seniority) and a bottom gradient fade. Used everywhere a peer/peerage image appears (Home showcase, Gallery grid, Marquee, Mint preview).

```tsx
import Image from "next/image";
import { rankByKey, type RankKey } from "@/lib/content";

export default function RankPortrait({
  src,
  rank,
  alt,
  className,
}: {
  src: string;
  rank: RankKey;
  alt: string;
  className?: string;
}) {
  const tint = rankByKey(rank).tint;
  return (
    <div className={`relative overflow-hidden bg-gunmetal-deep ${className ?? ""}`}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{ backgroundColor: "#5C1A1B", opacity: tint }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-gunmetal-deep/70 via-transparent to-transparent"
        aria-hidden
      />
    </div>
  );
}
```

## ScrollReveal — `src/components/ScrollReveal.tsx`
Fade+rise-on-scroll wrapper (Framer Motion `whileInView`), used to wrap almost every page section. Falls back to a plain `div` (no animation) when `useReducedMotion()` is true.

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function ScrollReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

## GearCrest — `src/components/GearCrest.tsx`
Decorative rotating brass-ring + crest-image hero ornament (3 concentric rings rotating at different speeds/directions). Home page only, `aria-hidden`, disabled under reduced motion.

```tsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function GearCrest({ src, size = 340 }: { src: string; size?: number }) {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative pointer-events-none select-none"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 rounded-full border border-brass/25"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-8 rounded-full border border-verdigris/20"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={reduce ? undefined : { duration: 44, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-16 overflow-hidden rounded-full border border-brass/40 shadow-[0_0_50px_rgba(199,151,46,0.25)]"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <Image src={src} alt="" fill sizes={`${size}px`} className="object-cover" priority />
      </motion.div>
    </div>
  );
}
```

## ClockGauge — `src/components/ClockGauge.tsx`
Small analog clock dial with 6 ticks (one per roadmap Hour); the hand animates to point at whichever Hour has `status === "descending"` (the current/"TICKING" one). Roadmap page only.

```tsx
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
```

## Marquee — `src/components/Marquee.tsx`
Infinite horizontal scroll strip of circular portraits (duplicated list, CSS `marquee-scroll` keyframe). Home page, between hero and showcase section. Killed under reduced motion via global CSS.

```tsx
import RankPortrait from "@/components/RankPortrait";
import { PORTRAITS } from "@/lib/content";

export default function Marquee() {
  const strip = [...PORTRAITS, ...PORTRAITS];
  return (
    <div className="overflow-hidden border-y border-brass/15 py-3" aria-hidden>
      <div className="marquee-track flex w-max gap-4">
        {strip.map((p, i) => (
          <RankPortrait
            key={`${p.id}-${i}`}
            src={p.src}
            rank={p.rank}
            alt=""
            className="h-20 w-20 shrink-0 rounded-full border border-brass/25"
          />
        ))}
      </div>
    </div>
  );
}
```
