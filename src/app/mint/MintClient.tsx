"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ReliquaryFrame from "@/components/ReliquaryFrame";
import ScrollReveal from "@/components/ScrollReveal";
import { BANNER_MINT, BRAND, GRADES, MINT_FAQS, RELIQUARIES, WALLETS } from "@/lib/content";

type PreviewStatus = "idle" | "pending" | "complete";

export default function MintClient() {
  const reduce = useReducedMotion();
  const [qty, setQty] = useState(1);
  const [idx, setIdx] = useState(2);
  const [status, setStatus] = useState<PreviewStatus>("idle");
  const [manualGrade, setManualGrade] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduce || manualGrade || status !== "idle") return;
    const cycle = setInterval(() => setIdx((value) => (value + 1) % RELIQUARIES.length), 2400);
    return () => clearInterval(cycle);
  }, [manualGrade, reduce, status]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const runPreview = () => {
    if (timer.current) clearTimeout(timer.current);
    setStatus("pending");
    timer.current = setTimeout(() => setStatus("complete"), reduce ? 0 : 1200);
  };

  const selectGrade = (index: number) => {
    setIdx(index);
    setManualGrade(true);
    setStatus("idle");
  };

  const grade = GRADES[idx];
  const reliquary = RELIQUARIES[idx];
  const total = (qty * BRAND.price).toFixed(1);

  return (
    <div>
      <header className="relative min-h-[300px] w-full overflow-hidden md:min-h-[380px]">
        <Image src={BANNER_MINT} alt="" fill priority sizes="100vw" className="object-cover object-right opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-gunmetal via-gunmetal/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gunmetal to-transparent" />
        <div className="relative mx-auto flex min-h-[300px] max-w-7xl flex-col justify-center gap-3 px-6 py-16 md:min-h-[380px] md:px-10">
          <div className="font-mono text-[11px] tracking-[0.22em] text-verdigris">MINT // THE POUR</div>
          <h1 className="font-display text-[42px] font-black leading-[0.95] tracking-tight md:text-[72px]">Pour your seam.</h1>
          <p className="max-w-xl font-lore text-[18px] italic leading-relaxed text-ivory/80">
            {BRAND.supply.toLocaleString()} masks wait to be mended. The gold is poured the moment you claim — no blind box.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 pb-24 pt-14 md:px-10">
        <div className="grid gap-8 border border-brass/25 bg-gunmetal-deep p-6 md:grid-cols-[1fr_1.05fr] md:p-8">
          <div className="relative aspect-[4/5] overflow-hidden border border-brass/20">
            <AnimatePresence mode="wait">
              <motion.div key={reliquary.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.35 }} className="absolute inset-0">
                <ReliquaryFrame src={reliquary.src} grade={grade.key} alt={grade.name} className="h-full w-full" sizes="(max-width: 768px) 90vw, 420px" />
              </motion.div>
            </AnimatePresence>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brass/80 via-brass/30 to-transparent mix-blend-screen"
              initial={false}
              animate={{ scaleY: status === "pending" ? 1 : grade.gild, opacity: status === "complete" ? 0.9 : 0.65 }}
              style={{ height: "100%", transformOrigin: "bottom" }}
              transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="font-mono text-[10px] tracking-[0.14em] text-verdigris">WHAT YOU MIGHT POUR</div>
            <h2 className="mt-2 font-display text-3xl font-bold">{grade.name}</h2>
            <p className="mt-2 font-lore text-[16px] italic leading-relaxed text-ivory/70">{grade.desc}</p>
            <div className="mt-5 h-2 bg-ivory/10" role="progressbar" aria-label={`${grade.name} gild study`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(grade.gild * 100)}>
              <motion.div className="h-full bg-brass" animate={{ scaleX: grade.gild }} style={{ transformOrigin: "left" }} transition={{ duration: reduce ? 0 : 0.4 }} />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2" aria-label="Grade preview controls">
              {GRADES.map((item, index) => (
                <button key={item.key} type="button" onClick={() => selectGrade(index)} aria-pressed={idx === index} className={`min-h-11 border px-2 font-mono text-[9px] tracking-[0.08em] transition duration-300 active:translate-y-px ${idx === index ? "border-brass bg-brass text-gunmetal-deep" : "border-ivory/20 text-ivory/65 hover:border-verdigris hover:text-verdigris"}`}>
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-8 border border-brass/25 bg-gunmetal-deep p-6 md:p-8" aria-labelledby="preview-controls-title">
          <div className="mb-1 font-mono text-[10px] tracking-[0.14em] text-verdigris">THE POUR</div>
          <h2 id="preview-controls-title" className="font-display text-2xl font-bold">Choose your quantity</h2>
          <div className="mt-4 flex items-center justify-between border-b border-ivory/10 pb-4 text-sm"><span className="text-ivory/60">PRICE PER MASK</span><strong className="font-display text-xl">{BRAND.price} SOL</strong></div>
          <div className="mt-6 flex items-center justify-between border border-ivory/20 px-3 py-2">
            <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} disabled={qty === 1 || status === "pending"} className="min-h-11 min-w-11 text-xl text-brass disabled:cursor-not-allowed disabled:opacity-30" aria-label="Decrease preview quantity">−</button>
            <span className="font-mono text-lg tabular-nums" aria-live="polite">{qty}</span>
            <button type="button" onClick={() => setQty((value) => Math.min(10, value + 1))} disabled={qty === 10 || status === "pending"} className="min-h-11 min-w-11 text-xl text-brass disabled:cursor-not-allowed disabled:opacity-30" aria-label="Increase preview quantity">+</button>
          </div>
          <div className="mt-4 flex items-center justify-between font-mono text-sm"><span className="text-ivory/60">TOTAL POUR</span><strong>{total} SOL</strong></div>
          <button type="button" onClick={runPreview} disabled={status === "pending"} className="mt-5 min-h-12 w-full bg-brass px-6 font-mono text-xs font-bold uppercase tracking-[0.18em] text-gunmetal-deep transition duration-300 hover:-translate-y-0.5 active:translate-y-px disabled:cursor-wait disabled:opacity-70">
            {status === "pending" ? "POURING…" : status === "complete" ? "POUR AGAIN" : `MEND ${qty} MASK${qty > 1 ? "S" : ""}`}
          </button>
          <div role="status" aria-live="polite" className="mt-4 min-h-6 border-l-2 border-verdigris pl-3 text-[13px] text-ivory/70">
            {status === "idle" && "Ready to pour."}
            {status === "pending" && "The gold is pouring."}
            {status === "complete" && "The gold is poured."}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="compatibility-title">
          <h2 id="compatibility-title" className="font-display text-2xl font-bold">Supported wallets</h2>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-ivory/65">Pour directly via any major Solana wallet.</p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {WALLETS.map((wallet) => <div key={wallet} className="border border-ivory/15 px-4 py-4 text-center font-mono text-[10px] tracking-[0.1em] text-ivory/70">{wallet}</div>)}
          </div>
        </section>

        <ScrollReveal className="mt-14 border-t border-brass/20 pt-12">
          <h2 className="mb-6 font-display text-2xl font-bold">Questions at the Pour</h2>
          {MINT_FAQS.map((item) => <article key={item.q} className="border-b border-ivory/10 py-5"><h3 className="font-mono text-[12px] tracking-[0.1em] text-verdigris">{item.q}</h3><p className="mt-2 font-lore text-[16px] leading-relaxed text-ivory/75">{item.a}</p></article>)}
        </ScrollReveal>
      </div>
    </div>
  );
}
