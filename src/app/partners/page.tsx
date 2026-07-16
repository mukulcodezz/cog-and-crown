import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import { PARTNERS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Partners",
  description: "The infrastructure that keeps the mechanism turning — Cog & Crown's partners.",
};

export default function PartnersPage() {
  return (
    <div className="px-6 pb-24 pt-24 md:px-10 md:pt-32">
      <div className="font-mono text-[11px] tracking-[0.2em] text-verdigris mb-5">
        PARTNERS // THE GUILD LEDGER
      </div>
      <h1 className="font-display text-[32px] font-black leading-tight md:text-[56px]">
        WHO WINDS
        <br />
        THE GEARS
      </h1>
      <p className="font-lore italic text-[18px] text-ivory/70 mt-4 max-w-xl">
        The infrastructure that keeps the mechanism turning without stripping its gears.
      </p>

      <div className="mt-12 flex gap-6 overflow-x-auto pb-8 snap-x">
        {PARTNERS.map((p, i) => (
          <ScrollReveal key={p.name} delay={(i % 3) * 0.06}>
            <div className="w-80 flex-shrink-0 snap-start h-full border border-brass/25 bg-gunmetal-deep p-10">
              <div className="mb-3.5 font-mono text-[9px] tracking-[0.14em] text-oxblood">
                {p.tag}
              </div>
              <div className="font-display text-xl font-bold mb-3">{p.name}</div>
              <div className="text-[13px] leading-relaxed text-ivory/60">{p.desc}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <section className="mt-16 border-t border-brass/15 pt-10">
          <div className="font-mono text-[10px] tracking-[0.16em] text-verdigris mb-6">
            HOW TO WORK WITH US
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="border border-brass/25 bg-gunmetal-deep p-8">
              <div className="text-sm text-brass mb-2.5">MARKETPLACE / LAUNCHPAD</div>
              <div className="text-[13px] leading-relaxed text-ivory/65">
                Reach out for co-marketing, launch calendar placement, or featured collection
                slots.
              </div>
            </div>
            <div className="border border-brass/25 bg-gunmetal-deep p-8">
              <div className="text-sm text-brass mb-2.5">BRAND / IRL</div>
              <div className="text-[13px] leading-relaxed text-ivory/65">
                Gala meetups, merch drops, and physical peerage objects — inquire for the
                current cycle.
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
