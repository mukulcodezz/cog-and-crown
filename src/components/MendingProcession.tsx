"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { SEAMS, STATUS_META, type Seam } from "@/lib/content";

const STEP = 460; // z-distance between steles
const SIDE = 210; // how far each stele sits off the corridor centre
const ROT = 26; // inward facing angle
const N = SEAMS.length;
const TOTAL_DEPTH = (N - 1) * STEP;

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/* ---------- one stele in the 3D corridor ---------- */
function Stele({
  seam,
  i,
  camZ,
  active,
}: {
  seam: Seam;
  i: number;
  camZ: MotionValue<number>;
  active: boolean;
}) {
  const meta = STATUS_META[seam.status];
  const left = i % 2 === 0;
  const x = left ? -SIDE : SIDE;
  const rotY = left ? ROT : -ROT;

  const opacity = useTransform(
    camZ,
    [(i - 1.25) * STEP, i * STEP, (i + 0.65) * STEP],
    [0.12, 1, 0]
  );
  const scale = useTransform(
    camZ,
    [(i - 1.25) * STEP, i * STEP, (i + 0.65) * STEP],
    [0.72, 1, 1.28]
  );

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        x,
        y: -150,
        z: -i * STEP,
        rotateY: rotY,
        opacity,
        scale,
        transformStyle: "preserve-3d",
        marginLeft: -150,
      }}
    >
      <div
        className={`stele-float relative h-[300px] w-[300px] border p-6 backdrop-blur-[2px] ${
          active ? "" : "grayscale-[0.25]"
        }`}
        style={{
          background:
            "linear-gradient(160deg, rgba(46,42,38,0.96), rgba(24,21,17,0.96))",
          borderColor: active ? meta.color : "rgba(199,151,46,0.18)",
          boxShadow: active
            ? `0 30px 80px rgba(0,0,0,0.6), 0 0 46px ${meta.color}55`
            : "0 24px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* gold seam down the stele */}
        <div
          className={`absolute left-0 top-6 h-[calc(100%-3rem)] w-[3px] ${active ? "vein-pulse" : ""}`}
          style={{ background: "linear-gradient(#5C1A1B,#C7972E,#F0D488,#C7972E)" }}
        />
        <div
          className="font-mono text-[10px] tracking-[0.14em]"
          style={{ color: meta.color }}
        >
          SEAM {seam.num} — {meta.label}
        </div>
        <div className="mt-3 font-display text-[26px] font-black leading-none text-ivory">
          {seam.codename.split("—")[1]?.replace(/["“”]/g, "").trim() ?? seam.codename}
        </div>
        <div className="mt-1 font-mono text-[10px] tracking-[0.12em] text-ivory/45">
          {seam.timeframe}
        </div>
        <p className="mt-4 font-lore italic text-[14px] leading-snug text-ivory/70 line-clamp-4">
          {seam.why}
        </p>
        <div className="absolute inset-x-6 bottom-6">
          <div className="mb-1 flex justify-between font-mono text-[9px] text-ivory/50">
            <span>GOLD POURED</span>
            <span>{seam.pct}%</span>
          </div>
          <div className="h-[4px] w-full bg-ivory/10">
            <div
              className="h-full"
              style={{ width: `${seam.pct}%`, background: meta.color }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- floating gold dust ---------- */
function GoldDust() {
  const motes = Array.from({ length: 26 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {motes.map((_, i) => (
        <span
          key={i}
          className="dust-mote"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${(i % 7) * 0.9}s`,
            animationDuration: `${6 + (i % 5)}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- reduced-motion / no-3D fallback ---------- */
function StaticStack() {
  return (
    <ol className="mx-auto grid max-w-3xl gap-4 px-6" aria-label="The six seams">
      {SEAMS.map((seam) => {
        const meta = STATUS_META[seam.status];
        return (
          <li
            key={seam.id}
            className="border bg-gunmetal-deep p-6"
            style={{ borderColor: `${meta.color}55` }}
          >
            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] tracking-[0.14em]" style={{ color: meta.color }}>
                SEAM {seam.num} — {meta.label}
              </div>
              <div className="font-mono text-[10px] text-ivory/50" role="progressbar" aria-label={`${seam.codename} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={seam.pct}>{seam.pct}%</div>
            </div>
            <div className="mt-2 font-display text-2xl font-bold">{seam.codename}</div>
            <p className="mt-2 font-lore italic text-[15px] text-ivory/70">{seam.why}</p>
            <div className="mt-4 grid gap-2 border-t border-ivory/10 pt-3">
              {seam.tracks.map((t) => (
                <div key={t.track} className="flex gap-2 text-[12px]">
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em]" style={{ color: meta.color }}>
                    {t.track}
                  </span>
                  <span className="text-ivory/65">{t.text}</span>
                </div>
              ))}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------- the 3D procession ---------- */
export default function MendingProcession() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const camZraw = useTransform(scrollYProgress, [0, 1], [0, TOTAL_DEPTH]);
  const camZ = useSpring(camZraw, { stiffness: 70, damping: 22, mass: 0.6 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(clamp(Math.round(v * (N - 1)), 0, N - 1));
  });

  const jumpTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const frac = N > 1 ? i / (N - 1) : 0;
    const top = el.offsetTop + frac * (el.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (reduce) return <StaticStack />;

  const activeSeam = SEAMS[active];
  const activeMeta = STATUS_META[activeSeam.status];

  return (
    <>
    <div className="py-16 md:hidden"><StaticStack /></div>
    <div ref={sectionRef} style={{ height: `${N * 74}vh` }} className="relative hidden md:block">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* corridor floor glow */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 100%, rgba(199,151,46,0.16), transparent 70%)",
          }}
        />
        <GoldDust />

        {/* 3D stage */}
        <div className="stage-3d absolute inset-0">
          <div className="preserve-3d absolute inset-0">
            {SEAMS.map((seam, i) => (
              <Stele key={seam.id} seam={seam} i={i} camZ={camZ} active={i === active} />
            ))}
          </div>
        </div>

        {/* header */}
        <div className="pointer-events-none absolute inset-x-0 top-6 flex flex-col items-center px-6 text-center md:top-10">
          <div className="font-mono text-[11px] tracking-[0.22em] text-verdigris">
            THE MENDING // PROCESSION OF SEAMS
          </div>
          <div className="mt-2 font-mono text-[10px] tracking-[0.16em] text-ivory/40">
            SCROLL TO WALK THE CORRIDOR
          </div>
        </div>

        {/* active seam detail */}
        <div className="absolute inset-x-0 bottom-24 flex justify-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSeam.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl border bg-gunmetal-deep/85 p-5 backdrop-blur-md"
              style={{ borderColor: `${activeMeta.color}66` }}
            >
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span
                  className="border px-2.5 py-1 font-mono text-[9px] tracking-[0.12em]"
                  style={{ borderColor: activeMeta.color, color: activeMeta.color }}
                >
                  SEAM {activeSeam.num} · {activeMeta.label}
                </span>
                {activeSeam.status === "mending" && (
                  <span className="bg-verdigris px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.1em] text-gunmetal">
                    POURING NOW
                  </span>
                )}
                <span className="font-display text-lg font-bold">
                  {activeSeam.codename.split("—")[1]?.replace(/["“”]/g, "").trim()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-5 gap-y-2 sm:grid-cols-3">
                {activeSeam.tracks.map((t) => (
                  <div key={t.track}>
                    <div
                      className="font-mono text-[8px] uppercase tracking-[0.12em]"
                      style={{ color: activeMeta.color }}
                    >
                      {t.track}
                    </div>
                    <div className="text-[11px] leading-snug text-ivory/70">{t.text}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* seam nav */}
        <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
          {SEAMS.map((seam, i) => {
            const on = i === active;
            const meta = STATUS_META[seam.status];
            return (
              <button
                key={seam.id}
                onClick={() => jumpTo(i)}
                aria-label={`Go to Seam ${seam.num}`}
                aria-current={on ? "step" : undefined}
                className="flex h-11 w-11 cursor-pointer items-center justify-center border font-mono text-[11px] transition-colors"
                style={{
                  borderColor: on ? meta.color : "rgba(199,151,46,0.25)",
                  color: on ? meta.color : "rgba(239,231,212,0.5)",
                  background: on ? `${meta.color}1a` : "transparent",
                }}
              >
                {seam.num}
              </button>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
}
