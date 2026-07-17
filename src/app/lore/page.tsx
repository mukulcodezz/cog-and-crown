import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { SCRIPTURE, GRADES } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({ title: "Scripture", description: "What the Order remembers: why nothing whole is holy, and the six grades of the mending.", path: "/lore", image: "/images/og-home.jpg" });

export default function LorePage() {
  return (
    <div className="px-6 pb-24 pt-24 md:px-10 md:pt-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 font-mono text-[11px] tracking-[0.2em] text-verdigris">
          SCRIPTURE // THE ORDER REMEMBERS
        </div>
        <h1 className="font-display text-[34px] font-black leading-[0.95] md:text-[60px]">
          Nothing whole
          <br />
          <span className="text-gold italic">is holy.</span>
        </h1>
      </div>

      <nav aria-label="Scripture chapters" className="mx-auto mt-10 flex max-w-3xl gap-2 overflow-x-auto pb-2">
        {SCRIPTURE.map((chapter, index) => (
          <a key={chapter.tag} href={`#chapter-${index + 1}`} className="flex min-h-11 shrink-0 items-center border border-brass/20 px-4 font-mono text-[9px] tracking-[0.12em] text-ivory/60 transition hover:border-brass hover:text-brass">
            {String(index + 1).padStart(2, "0")} · {chapter.title}
          </a>
        ))}
      </nav>

      {/* illuminated chapters, threaded by a gold seam */}
      <div className="relative mx-auto mt-16 max-w-3xl">
        <div className="absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-brass via-brass/40 to-transparent md:left-[9px]" />
        {SCRIPTURE.map((c, i) => (
          <ScrollReveal key={c.tag}>
            <section id={`chapter-${i + 1}`} className="relative grid scroll-mt-24 grid-cols-1 gap-6 border-t border-brass/15 py-12 pl-8 md:grid-cols-12 md:pl-10">
              {/* seam node */}
              <span className="absolute left-0 top-[52px] h-4 w-4 -translate-x-[6px] rounded-full border-2 border-brass bg-gunmetal shadow-[0_0_12px_rgba(199,151,46,0.6)]" />
              <div className="md:col-span-4">
                <div className="mb-3 font-mono text-[10px] tracking-[0.16em] text-verdigris">
                  {c.tag}
                </div>
                <h2 className="font-display text-2xl font-bold leading-tight">{c.title}</h2>
              </div>
              <div className="md:col-span-8">
                <p
                  className={`font-lore text-[19px] leading-relaxed text-ivory/85 ${
                    i === 0 ? "dropcap" : ""
                  }`}
                >
                  {c.body}
                </p>
              </div>
            </section>
          </ScrollReveal>
        ))}
      </div>

      {/* the six grades */}
      <ScrollReveal>
        <section className="mx-auto mt-8 max-w-3xl border-t border-brass/15 py-14">
          <div className="mb-6 font-mono text-[10px] tracking-[0.16em] text-verdigris">
            THE SIX GRADES
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {GRADES.map((g) => (
              <div key={g.key} className="border border-brass/20 bg-gunmetal-deep p-5">
                <div className="mb-2 flex items-center justify-between">
                  <div className="font-mono text-xs tracking-[0.08em] text-brass">{g.name}</div>
                  <div className="font-mono text-[9px] text-ivory/40">{g.share}</div>
                </div>
                <div className="mb-3 h-[4px] w-full bg-ivory/10">
                  <div
                    className="h-full"
                    style={{
                      width: `${g.gild * 100}%`,
                      background: "linear-gradient(90deg,#5C1A1B,#C7972E,#F0D488)",
                    }}
                  />
                </div>
                <div className="text-[13px] leading-relaxed text-ivory/65">{g.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
      <div className="mx-auto mt-4 max-w-3xl border-t border-brass/15 pt-10 text-right">
        <Link href="/gallery" className="font-mono text-[11px] uppercase tracking-[0.14em] text-brass transition hover:text-verdigris">Continue to the Reliquary →</Link>
      </div>
    </div>
  );
}
