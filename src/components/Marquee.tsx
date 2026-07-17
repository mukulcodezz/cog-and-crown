import { BRAND } from "@/lib/content";

const WORDS = [
  BRAND.tagline,
  "ASH & GILT",
  "POUR YOUR SEAM",
  BRAND.token,
  "THE MENDING IS OPEN",
  `${BRAND.supply.toLocaleString()} RELIQUARIES`,
  "MENDED IN GOLD",
];

// Editorial text marquee — the Order's litany, running gold-to-ivory.
export default function Marquee() {
  const strip = [...WORDS, ...WORDS];
  return (
    <div className="overflow-hidden border-y border-brass/15 py-5" aria-hidden>
      <div className="marquee-track flex w-max items-center gap-8">
        {strip.map((w, i) => (
          <div key={`${w}-${i}`} className="flex shrink-0 items-center gap-8">
            <span className="font-display text-xl italic text-ivory/85 md:text-2xl">
              {w}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-brass" />
          </div>
        ))}
      </div>
    </div>
  );
}
