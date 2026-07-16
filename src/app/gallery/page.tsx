import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import RankPortrait from "@/components/RankPortrait";
import { GALLERY_ITEMS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "4,096 titles, one court — browse the peerage roll.",
};

export default function GalleryPage() {
  return (
    <div className="px-6 pb-24 pt-24 md:px-10 md:pt-32">
      <div className="font-mono text-[11px] tracking-[0.2em] text-verdigris mb-5">
        GALLERY // THE PEERAGE ROLL
      </div>
      <h1 className="font-display text-[32px] font-black leading-tight md:text-[56px]">
        4,096 TITLES,
        <br />
        ONE COURT
      </h1>
      <p className="font-lore italic text-[18px] text-ivory/70 mt-4 max-w-xl">
        Every peer carries a rank in the court and titles engraved into their crest at
        investiture.
      </p>

      <div className="mt-10 flex flex-col border-t border-brass/20">
        {GALLERY_ITEMS.map((item, i) => (
          <ScrollReveal key={item.id} delay={(i % 4) * 0.05}>
            <div className="group flex items-center gap-6 border-b border-brass/20 py-4 transition-colors hover:bg-gunmetal-deep">
              <RankPortrait
                src={item.portrait.src}
                rank={item.portrait.rank}
                alt={`${item.id} — ${item.rank.name}`}
                className="h-16 w-16 shrink-0"
              />
              <div className="w-20 shrink-0 font-mono text-[12px] uppercase tracking-wider text-verdigris">
                {item.id}
              </div>
              <div className="w-48 shrink-0 text-sm font-bold uppercase tracking-widest">
                {item.rank.name}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="border border-oxblood/50 px-3 py-1 font-mono text-[10px] tracking-[0.06em] text-oxblood uppercase">
                  {item.trait1}
                </span>
                <span className="border border-brass/40 px-3 py-1 font-mono text-[10px] tracking-[0.06em] text-brass uppercase">
                  {item.trait2}
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
