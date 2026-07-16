import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import { LORE_CHAPTERS, COURT_RANKS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Lore — The Royal Decree",
  description: "What the Crown remembers: the mechanism's origin, and the six ranks of the court.",
};

export default function LorePage() {
  return (
    <div className="px-6 pb-24 pt-24 md:px-10 md:pt-32">
      <div className="max-w-3xl">
        <div className="font-mono text-[11px] tracking-[0.2em] text-verdigris mb-5">
          LORE // THE ROYAL DECREE
        </div>
        <h1 className="font-display text-[32px] font-black leading-tight md:text-[56px]">
          WHAT THE
          <br />
          CROWN REMEMBERS
        </h1>
      </div>

      {LORE_CHAPTERS.map((c) => (
        <ScrollReveal key={c.tag}>
          <section className="max-w-3xl border-t border-brass/15 py-14 grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="font-mono text-[10px] tracking-[0.16em] text-oxblood mb-4">
                {c.tag}
              </div>
              <h2 className="font-display text-2xl font-bold">{c.title}</h2>
            </div>
            <div className="md:col-span-8">
              <p className="font-lore italic text-[19px] leading-relaxed text-ivory/80">
                {c.body}
              </p>
            </div>
          </section>
        </ScrollReveal>
      ))}

      <ScrollReveal>
        <section className="max-w-3xl border-t border-brass/15 py-14">
          <div className="font-mono text-[10px] tracking-[0.16em] text-verdigris mb-5">
            COURT STRUCTURE
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {COURT_RANKS.map((r) => (
              <div key={r.key} className="border border-brass/20 bg-gunmetal-deep p-5">
                <div className="mb-2 font-mono text-xs tracking-[0.08em] text-brass">
                  {r.name}
                </div>
                <div className="text-[13px] leading-relaxed text-ivory/65">{r.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
