import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import SigilCrest from "@/components/SigilCrest";
import ReliquaryFrame from "@/components/ReliquaryFrame";
import Marquee from "@/components/Marquee";
import { createPageMetadata } from "@/lib/site";
import {
  BRAND,
  GRADES,
  RELIQUARIES,
  reliquaryByGrade,
  HOME_SHOWCASE,
  HERO_IMAGE,
  BANNER_HOME,
  BANNER_ROADMAP,
} from "@/lib/content";

export const metadata = createPageMetadata({
  title: "Nothing Whole Is Holy",
  description: "222 masks broken once and mended in gold. Enter the Order of Ash & Gilt.",
  path: "/",
  image: "/images/og-home.jpg",
});

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* ---------------- HERO ---------------- */}
      <section className="relative flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden">
        <Image
          src={BANNER_HOME}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gunmetal via-gunmetal/85 to-gunmetal/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-gunmetal via-transparent to-gunmetal/60" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-12 items-center gap-8 px-6 py-20 md:px-10 md:py-24">
          <div className="col-span-12 lg:col-span-7">
            <div className="mb-7 font-mono text-[11px] tracking-[0.28em] text-verdigris">
              THE ORDER OF ASH &amp; GILT // STATUS: {BRAND.status.toUpperCase()}
            </div>
            <h1 className="font-display text-[46px] font-black leading-[0.92] tracking-tight md:text-[104px]">
              NOTHING
              <br />
              WHOLE IS
              <br />
              <span className="text-gold italic">HOLY</span>
            </h1>
            <p className="mt-8 max-w-xl font-lore text-[20px] italic leading-relaxed text-ivory/85 md:text-[24px]">
              {BRAND.supply.toLocaleString()} masks, each broken once and mended in gold. The fault is not hidden — it is poured full and made the point.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/mint"
                className="group relative overflow-hidden bg-brass px-9 py-5 text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-gunmetal shadow-[0_0_40px_rgba(199,151,46,0.25)]"
              >
                <span className="relative z-10">Mend a Reliquary</span>
                <span className="absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-500 group-hover:translate-x-full" />
              </Link>
              <Link
                href="/lore"
                className="border border-oxblood/50 px-9 py-5 text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-ivory/70 transition-colors hover:border-verdigris hover:text-verdigris"
              >
                Read the Scripture
              </Link>
            </div>
          </div>

          <div className="col-span-12 hidden justify-center lg:col-span-5 lg:flex">
            <SigilCrest src={HERO_IMAGE} size={380} />
          </div>
        </div>

        {/* stats bar */}
        <div className="relative z-10 w-full border-t border-brass/20 bg-gunmetal-deep/80 backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
            {[
              ["SUPPLY", BRAND.supply.toLocaleString()],
              ["PRICE", `${BRAND.price} SOL`],
              ["MENDED", `${BRAND.minted.toLocaleString()} / ${BRAND.supply.toLocaleString()}`],
              ["CHAIN", BRAND.chain],
            ].map(([label, value], i) => (
              <div
                key={label}
                className={`px-6 py-5 md:px-10 ${i < 3 ? "border-r border-brass/15" : ""}`}
              >
                <div className="mb-1 font-mono text-[10px] tracking-[0.16em] text-ivory/45">
                  {label}
                </div>
                <div className="font-display text-lg font-bold md:text-xl">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal>
        <Marquee />
      </ScrollReveal>

      {/* ---------------- THE SIX GRADES ---------------- */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-verdigris">
              THE SIX GRADES
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-[42px]">
              The more it broke,
              <br />
              the more gold it holds.
            </h2>
          </div>
          <Link
            href="/gallery"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-brass hover:text-verdigris"
          >
            Browse the Reliquary →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {GRADES.map((g, i) => {
            const rel = reliquaryByGrade(g.key);
            return (
              <ScrollReveal key={g.key} delay={(i % 6) * 0.05}>
                <div className="group border border-brass/15 bg-gunmetal-deep transition-colors hover:border-brass/40">
                  <ReliquaryFrame
                    src={rel.src}
                    grade={g.key}
                    alt={g.name}
                    className="aspect-[4/5] w-full"
                    seam
                  />
                  <div className="p-3.5">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-[11px] font-bold tracking-[0.08em] text-brass">
                        {g.name}
                      </div>
                      <div className="font-mono text-[9px] text-ivory/40">{g.share}</div>
                    </div>
                    <div className="mt-1.5 text-[11px] leading-snug text-ivory/55">{g.desc}</div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ---------------- ALREADY MENDED ---------------- */}
      <ScrollReveal>
        <section className="border-t border-brass/15 px-6 py-16 md:px-10 md:py-24">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold md:text-[30px]">Already Mended</h2>
            <Link
              href="/gallery"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-brass hover:text-verdigris"
            >
              View Full Reliquary →
            </Link>
          </div>

          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4" aria-label="Already mended Reliquaries" tabIndex={0}>
            {HOME_SHOWCASE.map((peer) => (
              <Link
                key={peer.tokenId}
                href="/gallery"
                className="group w-[230px] shrink-0 snap-start border border-brass/20 bg-gunmetal-deep transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1"
              >
                <ReliquaryFrame
                  src={peer.reliquary.src}
                  grade={peer.reliquary.grade}
                  alt={peer.title}
                  className="h-[250px] w-full"
                  seam
                />
                <div className="p-4">
                  <div className="mb-1 font-mono text-[10px] tracking-[0.1em] text-verdigris">
                    {peer.tokenId}
                  </div>
                  <div className="font-lore text-[15px] italic">{peer.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ---------------- ROADMAP TEASER ---------------- */}
      <ScrollReveal>
        <section className="relative mx-6 mb-20 overflow-hidden border border-brass/20 md:mx-10">
          <Image
            src={BANNER_ROADMAP}
            alt=""
            width={1600}
            height={900}
            sizes="100vw"
            className="h-[320px] w-full object-cover opacity-55 md:h-[420px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gunmetal via-gunmetal/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center gap-5 p-8 md:p-14">
            <div className="font-mono text-[11px] tracking-[0.2em] text-verdigris">
              THE MENDING // A LIVING ROADMAP
            </div>
            <h2 className="max-w-lg font-display text-3xl font-bold leading-tight md:text-5xl">
              Walk the corridor of seams.
            </h2>
            <p className="max-w-md font-lore text-[17px] italic text-ivory/75">
              Six seams, poured in order. Scroll the procession and watch the gold reach the end.
            </p>
            <Link
              href="/roadmap"
              className="w-fit border border-brass/50 px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-brass transition-colors hover:bg-brass hover:text-gunmetal"
            >
              Enter the Mending →
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* trace image so bundler keeps every reliquary referenced */}
      <div className="hidden">{RELIQUARIES.length}</div>
    </div>
  );
}
