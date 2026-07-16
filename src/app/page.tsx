import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import GearCrest from "@/components/GearCrest";
import RankPortrait from "@/components/RankPortrait";
import Marquee from "@/components/Marquee";
import { BRAND, HOME_SHOWCASE, HERO_IMAGE } from "@/lib/content";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <section className="relative px-6 pb-20 pt-16 md:px-10">
        <div className="grid grid-cols-12 items-start gap-10">
          <div className="relative col-span-12 lg:col-span-8">
            <div className="font-mono text-[11px] tracking-[0.22em] text-verdigris mb-8">
              [ HOUR IV ] // STATUS: {BRAND.status.toUpperCase()}
            </div>

            <div className="relative">
              <h1 className="font-display relative z-20 text-[44px] font-black leading-[0.9] tracking-tight mix-blend-difference md:text-[92px]">
                FOUR THOUSAND
                <br />
                NINETY-SIX
                <br />
                PEERAGES FOR THE <span className="text-brass">CROWN</span>
              </h1>

              <div className="pointer-events-none absolute -right-4 top-0 z-10 opacity-90 md:-right-12">
                <GearCrest src={HERO_IMAGE} size={280} />
              </div>
            </div>

            <div className="relative z-20 mt-12 max-w-xl md:mt-16">
              <p className="font-lore italic text-[20px] leading-relaxed text-ivory/90 md:text-[24px]">
                Each token a title bound in brass and oath. Take your seat in the mechanism, or
                watch the hour pass you by.
              </p>
            </div>
          </div>

          <div className="col-span-12 flex flex-col items-start lg:col-span-4 lg:items-end lg:pt-32">
            <div className="mb-10 grid grid-cols-2 gap-x-10 gap-y-8 md:mb-16 md:gap-x-16 md:gap-y-12 lg:text-right">
              {[
                ["SUPPLY", BRAND.supply.toLocaleString()],
                ["PRICE", `${BRAND.price} SOL`],
                ["MINTED", BRAND.minted.toLocaleString()],
                ["STATUS", BRAND.status],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="font-mono text-[10px] tracking-[0.16em] text-ivory/45 mb-1.5">
                    {label}
                  </div>
                  <div className="text-xl font-semibold">{value}</div>
                </div>
              ))}
            </div>

            <div className="flex w-full max-w-[280px] flex-col gap-4">
              <Link
                href="/mint"
                className="group relative overflow-hidden bg-brass px-8 py-5 text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-gunmetal shadow-[0_0_30px_rgba(199,151,46,0.2)]"
              >
                <span className="relative z-10">Claim a Peerage</span>
                <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
              </Link>
              <Link
                href="/lore"
                className="border border-oxblood/40 px-8 py-5 text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-ivory/60 hover:border-verdigris hover:text-verdigris transition-colors"
              >
                Read the Royal Decree
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <Marquee />
      </ScrollReveal>

      <ScrollReveal>
        <section className="border-t border-brass/15 px-6 py-16 md:px-10 md:py-24">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold md:text-[28px]">
              Peers Already Seated
            </h2>
            <Link
              href="/gallery"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-brass hover:text-verdigris"
            >
              View Full Gallery →
            </Link>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-2">
            {HOME_SHOWCASE.map((peer) => (
              <Link
                key={peer.tokenId}
                href="/gallery"
                className="group w-[220px] shrink-0 border border-brass/20 bg-gunmetal-deep transition-transform hover:-translate-y-1"
              >
                <RankPortrait
                  src={peer.portrait.src}
                  rank={peer.portrait.rank}
                  alt={peer.title}
                  className="h-[220px] w-full"
                />
                <div className="p-3.5">
                  <div className="font-mono text-[10px] tracking-[0.1em] text-verdigris mb-1">
                    {peer.tokenId}
                  </div>
                  <div className="text-[13px]">{peer.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
