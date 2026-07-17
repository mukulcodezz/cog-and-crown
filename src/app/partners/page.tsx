import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { ALLIES } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Allies",
  description: "The infrastructure allies that keep the Order of Ash & Gilt moving.",
  path: "/partners",
  image: "/images/og-roadmap.jpg",
});

const featuredAlly = ALLIES[0];
const supportingAllies = ALLIES.slice(1);
const categoryCount = new Set(ALLIES.map((ally) => ally.tag)).size;

export default function PartnersPage() {
  return (
    <div className="overflow-hidden px-6 pb-24 pt-16 md:px-10 md:pb-32 md:pt-24">
      <div className="mx-auto max-w-7xl">
        <header className="relative border-b border-brass/20 pb-12 md:pb-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border border-brass/10 shadow-[inset_0_0_0_24px_rgba(199,151,46,0.025),inset_0_0_0_48px_rgba(199,151,46,0.02)] md:right-0"
          />
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div>
              <div className="mb-5 font-mono text-[11px] tracking-[0.2em] text-verdigris">
                ALLIES // THE ORDER&apos;S LEDGER
              </div>
              <h1 className="max-w-4xl font-display text-[44px] font-black leading-[0.9] tracking-[-0.035em] sm:text-[58px] md:text-[76px]">
                The names behind
                <br />
                <span className="text-brass">the pour.</span>
              </h1>
              <p className="mt-7 max-w-2xl font-lore text-[19px] italic leading-relaxed text-ivory/70 md:text-[22px]">
                Every ally is entered into the ledger by the role it plays—chain, launchpad,
                wallet, or market. Together, they keep the gold moving after the first seam.
              </p>
            </div>

            <dl className="grid grid-cols-2 border border-brass/20 bg-gunmetal-deep/70">
              <div className="border-r border-brass/15 p-5">
                <dt className="font-mono text-[9px] tracking-[0.16em] text-verdigris">ALLIES ENTERED</dt>
                <dd className="mt-2 font-display text-4xl font-black text-brass">{ALLIES.length}</dd>
              </div>
              <div className="p-5">
                <dt className="font-mono text-[9px] tracking-[0.16em] text-verdigris">ROLES SEALED</dt>
                <dd className="mt-2 font-display text-4xl font-black text-brass">{categoryCount}</dd>
              </div>
            </dl>
          </div>
        </header>

        <section className="pt-12 md:pt-16" aria-labelledby="allies-ledger-title">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-verdigris">LEDGER 01—05</div>
              <h2 id="allies-ledger-title" className="mt-2 font-display text-3xl font-bold md:text-4xl">
                Infrastructure, sealed.
              </h2>
            </div>
            <p className="max-w-md text-[12px] leading-relaxed text-ivory/45">
              Each entry opens the ally&apos;s official destination in a new tab.
            </p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(16,minmax(0,1fr))] lg:grid-rows-2">
            <li className="sm:col-span-2 lg:col-span-10 lg:row-span-2">
              <ScrollReveal className="h-full">
                <a
                  href={featuredAlly.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${featuredAlly.action} (opens in a new tab)`}
                  className="group relative flex h-full min-h-[430px] flex-col justify-between overflow-hidden border border-brass/35 bg-gunmetal-deep p-7 transition duration-300 hover:-translate-y-1 hover:border-brass/70 focus-visible:-translate-y-1 md:p-12"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-16 -top-16 flex h-64 w-64 items-center justify-center rounded-full border border-brass/20 font-display text-[120px] font-black text-brass/[0.055] shadow-[inset_0_0_0_18px_rgba(199,151,46,0.025),inset_0_0_0_38px_rgba(199,151,46,0.02)] transition duration-300 group-hover:rotate-6 group-hover:border-brass/35"
                  >
                    S
                  </div>
                  <div className="relative flex items-start justify-between gap-6">
                    <div className="font-mono text-[10px] tracking-[0.18em] text-verdigris">
                      {`01 // ${featuredAlly.tag} // ANCHOR`}
                    </div>
                    <span aria-hidden="true" className="font-display text-5xl font-black text-brass/15">
                      I
                    </span>
                  </div>

                  <div className="relative max-w-2xl">
                    <div className="mb-4 h-px w-20 bg-oxblood transition-[width] duration-300 group-hover:w-32" />
                    <h3 className="font-display text-6xl font-black tracking-[-0.04em] text-brass sm:text-7xl md:text-8xl">
                      {featuredAlly.name}
                    </h3>
                    <p className="mt-5 max-w-xl font-lore text-xl italic leading-relaxed text-ivory/68 md:text-2xl">
                      {featuredAlly.desc}
                    </p>
                  </div>

                  <div className="relative mt-10 flex min-h-11 items-center justify-between border-t border-brass/20 pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-brass">
                    <span>{featuredAlly.action}</span>
                    <span aria-hidden="true" className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            </li>

            {supportingAllies.map((ally, index) => (
              <li key={ally.name} className="lg:col-span-3">
                <ScrollReveal className="h-full" delay={(index + 1) * 0.06}>
                  <a
                    href={ally.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${ally.action} (opens in a new tab)`}
                    className="group relative flex h-full min-h-52 flex-col justify-between overflow-hidden border border-brass/20 bg-gunmetal-deep p-6 transition duration-300 hover:-translate-y-1 hover:border-brass/60 focus-visible:-translate-y-1"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-mono text-[9px] tracking-[0.14em] text-verdigris">{ally.tag}</div>
                      <span aria-hidden="true" className="font-display text-3xl font-black text-brass/15">
                        {String(index + 2).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="relative mt-8">
                      <div aria-hidden="true" className="mb-4 h-8 w-8 rounded-full border border-brass/30 shadow-[inset_0_0_0_6px_rgba(199,151,46,0.035)]" />
                      <h3 className="font-display text-2xl font-bold leading-none text-brass md:text-[28px]">{ally.name}</h3>
                      <p className="mt-3 text-[12px] leading-relaxed text-ivory/60">{ally.desc}</p>
                    </div>
                    <div className="mt-7 flex min-h-11 items-end justify-between border-t border-brass/15 pt-4 font-mono text-[9px] uppercase tracking-[0.13em] text-brass">
                      <span>{ally.action}</span>
                      <span aria-hidden="true" className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        ↗
                      </span>
                    </div>
                  </a>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </section>

        <ScrollReveal>
          <section className="mt-16 border-y border-brass/20 bg-gunmetal-deep/55 px-6 py-8 md:mt-24 md:px-9 md:py-10" aria-labelledby="continue-title">
            <div className="grid gap-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div>
                <div className="font-mono text-[10px] tracking-[0.16em] text-verdigris">CONTINUE THROUGH THE ORDER</div>
                <h2 id="continue-title" className="mt-3 font-display text-3xl font-bold">The ledger is only one chamber.</h2>
                <p className="mt-3 max-w-2xl font-lore text-lg italic leading-relaxed text-ivory/65">
                  Read what the Order keeps, inspect what it has mended, or follow the six seams still ahead.
                </p>
              </div>
              <nav aria-label="Continue exploring" className="flex flex-wrap gap-3">
                <Link href="/lore" className="flex min-h-11 items-center border border-brass/40 px-5 font-mono text-[10px] tracking-[0.12em] text-brass transition hover:bg-brass hover:text-gunmetal">
                  SCRIPTURE
                </Link>
                <Link href="/gallery" className="flex min-h-11 items-center border border-ivory/20 px-5 font-mono text-[10px] tracking-[0.12em] text-ivory/70 transition hover:border-verdigris hover:text-verdigris">
                  RELIQUARY
                </Link>
                <Link href="/roadmap" className="flex min-h-11 items-center border border-ivory/20 px-5 font-mono text-[10px] tracking-[0.12em] text-ivory/70 transition hover:border-verdigris hover:text-verdigris">
                  THE MENDING
                </Link>
              </nav>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
