"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import ReliquaryFrame from "@/components/ReliquaryFrame";
import { GALLERY_ITEMS, GRADES, BRAND, type GradeKey } from "@/lib/content";

const FILTERS: { key: GradeKey | "all"; label: string }[] = [
  { key: "all", label: "ALL" },
  ...GRADES.map((g) => ({ key: g.key, label: g.name })),
];

export default function ReliquaryClient() {
  const [filter, setFilter] = useState<GradeKey | "all">("all");
  const visible =
    filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.grade.key === filter);

  return (
    <div className="px-6 pb-24 pt-24 md:px-10 md:pt-32">
      <div className="mb-3 font-mono text-[11px] tracking-[0.2em] text-verdigris">
        THE RELIQUARY // {BRAND.supply.toLocaleString()} MASKS
      </div>
      <h1 className="font-display text-[34px] font-black leading-[0.95] md:text-[64px]">
        Every fault,
        <br />
        <span className="text-gold italic">poured in gold.</span>
      </h1>
      <p className="mt-5 max-w-xl font-lore text-[18px] italic text-ivory/70">
        A wall of specimens from the Order. Each mask carries a grade, two traits, and the exact
        seam it was mended along. Hover to watch the gold run.
      </p>

      {/* grade filter */}
      <div className="mt-10 flex flex-wrap gap-2.5">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              aria-pressed={active}
              className={`cursor-pointer border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${
                active
                  ? "border-brass bg-brass text-gunmetal"
                  : "border-ivory/20 bg-transparent text-ivory/60 hover:border-brass/50"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {visible.length} Reliquaries shown{filter === "all" ? "" : ` in the ${FILTERS.find((item) => item.key === filter)?.label} grade`}.
      </p>

      {/* specimen grid */}
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((item, i) => (
          <ScrollReveal key={item.id} delay={(i % 4) * 0.05}>
            <div className="group flex h-full flex-col border border-brass/15 bg-gunmetal-deep transition-colors hover:border-brass/45">
              <ReliquaryFrame
                src={item.reliquary.src}
                grade={item.grade.key}
                alt={`${item.id} — ${item.grade.name}`}
                className="aspect-[4/5] w-full"
                seam
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {/* museum plaque */}
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.1em] text-verdigris">
                    {item.id}
                  </span>
                  <span className="font-mono text-[9px] text-ivory/40">{item.grade.share}</span>
                </div>
                <div className="mt-1 font-mono text-[12px] font-bold tracking-[0.06em] text-brass">
                  {item.grade.name}
                </div>

                {/* gild meter */}
                <div className="mt-3">
                  <div className="mb-1 flex justify-between font-mono text-[8px] tracking-[0.1em] text-ivory/40">
                    <span>GILD</span>
                    <span>{Math.round(item.grade.gild * 100)}%</span>
                  </div>
                  <div className="h-[4px] w-full bg-ivory/10">
                    <div
                      className="h-full"
                      style={{
                        width: `${item.grade.gild * 100}%`,
                        background: "linear-gradient(90deg,#5C1A1B,#C7972E,#F0D488)",
                      }}
                    />
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="border border-oxblood/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.06em] text-oxblood">
                    {item.trait1}
                  </span>
                  <span className="border border-brass/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.06em] text-brass">
                    {item.trait2}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
