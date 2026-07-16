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
