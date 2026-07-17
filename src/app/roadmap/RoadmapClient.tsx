import ScrollReveal from "@/components/ScrollReveal";
import MendGauge from "@/components/MendGauge";
import MendingProcession from "@/components/MendingProcession";
import { SEAMS, ROADMAP_METRICS, RECEIPTS } from "@/lib/content";

export default function RoadmapClient() {
  const overallPct = Math.round(SEAMS.reduce((s, h) => s + h.pct, 0) / SEAMS.length);
  const receiptCols = [RECEIPTS.slice(0, 3), RECEIPTS.slice(3)];

  return (
    <div>
      {/* header */}
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-10 md:pt-32">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex-1">
            <div className="mb-5 font-mono text-[11px] tracking-[0.2em] text-verdigris">
              THE MENDING // LIVING ROADMAP
            </div>
            <h1 className="font-display text-[34px] font-black leading-[0.95] md:text-[56px]">
              Watch the gold
              <br />
              reach the end.
            </h1>
            <p className="mt-5 max-w-xl font-lore text-[19px] italic leading-relaxed text-ivory/70">
              Not a plan with a finish line — a mask still being poured, measured in the seams
              already sealed.
            </p>
          </div>

          <div className="w-full max-w-2xl flex-1">
            <div className="mb-4 grid grid-cols-2 gap-px border border-brass/15 bg-brass/15">
              {ROADMAP_METRICS.map((m) => (
                <div key={m.label} className="bg-gunmetal-deep px-4 py-3">
                  <div className="mb-1 font-mono text-[9px] tracking-[0.12em] text-ivory/50">
                    {m.label}
                  </div>
                  <div className="text-lg font-bold">{m.value}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 border border-brass/25 bg-gunmetal-deep px-5 py-4">
              <MendGauge pct={overallPct} size={52} />
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <div className="font-mono text-[9px] tracking-[0.12em] text-verdigris">
                    TOTAL GOLD POURED
                  </div>
                  <div className="text-sm font-bold">{overallPct}%</div>
                </div>
                <div className="relative h-1.5 w-full bg-ivory/10">
                  <div
                    className="absolute inset-y-0 left-0 shadow-[0_0_10px_rgba(199,151,46,0.3)]"
                    style={{
                      width: `${overallPct}%`,
                      background: "linear-gradient(90deg,#5C1A1B,#C7972E)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* the 3D procession */}
      <MendingProcession />

      {/* receipts */}
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <ScrollReveal className="border-t border-brass/15 pt-12">
          <h2 className="mb-8 font-display text-xl font-bold uppercase tracking-wider">
            Receipts
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {receiptCols.map((col, i) => (
              <div key={i} className="flex flex-col gap-px border border-brass/10 bg-brass/10">
                {col.map((r) => (
                  <div
                    key={r.text}
                    className="flex flex-wrap items-center justify-between gap-4 bg-gunmetal-deep px-5 py-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-sm text-verdigris">✓</span>
                      <span className="text-[13px]">{r.text}</span>
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.06em] text-ivory/45">
                      {r.date}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
