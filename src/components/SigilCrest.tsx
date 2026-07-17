"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// Slow counter-rotating gold rings framing the hero mask — the Order's seal.
export default function SigilCrest({ src, size = 340 }: { src: string; size?: number }) {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative pointer-events-none select-none"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 rounded-full border border-brass/25"
        style={{ borderStyle: "dashed" }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 72, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-6 rounded-full border border-verdigris/25"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={reduce ? undefined : { duration: 52, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-14 overflow-hidden rounded-full border border-brass/50 shadow-[0_0_60px_rgba(199,151,46,0.3)]"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 110, repeat: Infinity, ease: "linear" }}
      >
        <Image src={src} alt="" fill sizes={`${size}px`} className="object-cover" priority />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 50% 30%, transparent 40%, rgba(32,29,26,0.7) 100%)" }}
        />
      </motion.div>
      {/* faint outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: "0 0 90px rgba(199,151,46,0.14)" }}
      />
    </div>
  );
}
