"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ClockGauge from "@/components/ClockGauge";
import {
  HOURS,
  STATUS_META,
  ROADMAP_METRICS,
  RECEIPTS,
  type HourStatus,
} from "@/lib/content";

const FILTERS: { key: HourStatus | "all"; label: string }[] = [
  { key: "all", label: "ALL HOURS" },
  { key: "sounded", label: "WOUND" },
  { key: "descending", label: "TICKING" },
  { key: "next", label: "NEXT HOUR" },
  { key: "uncharted", label: "UNCHARTED" },
];

const ZONE_BG = ["#3A342C", "#332E27", "#2C2822", "#25211C", "#1E1B17", "#181510"];

export default function RoadmapClient() {
  const [filter, setFilter] = useState<HourStatus | "all">("all");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ mainspring: true });
  const trainRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollXProgress } = useScroll({ container: trainRef });
  const lineScale = useTransform(scrollXProgress, [0, 1], [0.15, 1]);

  const overallPct = Math.round(HOURS.reduce((sum, h) => sum + h.pct, 0) / HOURS.length);
  const visibleHours = filter === "all" ? HOURS : HOURS.filter((h) => h.status === filter);
  const receiptCols = [RECEIPTS.slice(0, 3), RECEIPTS.slice(3)];

  const toggle = (id: string) => setExpanded((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-24 md:px-10 md:pt-32">
      <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div className="flex-1">
          <div className="font-mono text-[11px] tracking-[0.2em] text-verdigris mb-5">
            THE GREAT MECHANISM // LIVE ROADMAP
          </div>
          <h1 className="font-display text-[32px] font-black leading-tight md:text-[54px]">
            WIND THE COURT UNTIL
            <br />
            THE CROWN AWAKENS
          </h1>
          <p className="font-lore italic text-[19px] leading-relaxed text-ivory/70 mt-5 max-w-xl">
            This is not a plan with an end date. It is a mechanism still being wound, measured in
            what we&rsquo;ve already cast.
          </p>
        </div>

        <div className="w-full max-w-2xl flex-1">
          <div className="mb-4 grid grid-cols-2 gap-px border border-brass/15 bg-brass/15">
            {ROADMAP_METRICS.map((m) => (
              <div key={m.label} className="bg-gunmetal-deep px-4 py-3">
                <div className="font-mono text-[9px] tracking-[0.12em] text-ivory/50 mb-1">
                  {m.label}
                </div>
                <div className="text-lg font-bold">{m.value}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 border border-brass/25 bg-gunmetal-deep px-5 py-4">
            <ClockGauge size={48} />
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between">
                <div className="font-mono text-[9px] tracking-[0.12em] text-verdigris">
                  OVERALL WIND
                </div>
                <div className="text-sm font-bold">{overallPct}%</div>
              </div>
              <div className="relative h-1.5 w-full bg-ivory/10">
                <motion.div
                  className="absolute inset-y-0 left-0 shadow-[0_0_10px_rgba(199,151,46,0.3)]"
                  style={{ background: "linear-gradient(90deg,#5C1A1B,#C7972E)" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${overallPct}%` }}
                  viewport={{ once: true }}
                  transition={reduce ? { duration: 0 } : { duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2.5">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`font-mono text-[10px] uppercase tracking-[0.1em] px-4.5 py-2.5 cursor-pointer border transition-colors ${
                active
                  ? "bg-brass text-gunmetal border-brass"
                  : "bg-transparent text-ivory/60 border-ivory/20 hover:border-brass/50"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div
        ref={trainRef}
        className="relative -mx-6 overflow-x-auto px-6 py-12 md:-mx-10 md:px-10"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="absolute left-6 right-6 top-[60px] h-px bg-gradient-to-r from-brass/10 via-verdigris/40 to-brass/10 md:left-10 md:right-10" />
        <motion.div
          className="absolute left-6 top-[60px] h-px origin-left bg-gradient-to-r from-brass to-verdigris md:left-10"
          style={{ scaleX: reduce ? 1 : lineScale, right: "24px" }}
        />

        <div className="flex min-w-max gap-8 pb-8">
          {visibleHours.map((hour) => {
            const meta = STATUS_META[hour.status];
            const isCurrent = hour.status === "descending";
            const isExpanded = !!expanded[hour.id];
            const bg = ZONE_BG[HOURS.findIndex((h) => h.id === hour.id)];

            return (
              <div key={hour.id} className="w-[340px] shrink-0 md:w-[380px]">
                <div className="mb-8 flex flex-col items-center">
                  <div
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 font-display text-base font-bold"
                    style={{
                      borderColor: meta.color,
                      color: meta.color,
                      background: bg,
                      boxShadow: isCurrent ? "0 0 20px rgba(199,151,46,0.5)" : "none",
                    }}
                  >
                    {hour.num}
                  </div>
                </div>

                <button
                  onClick={() => toggle(hour.id)}
                  className="h-full w-full cursor-pointer border p-7 text-left"
                  style={{
                    background: bg,
                    borderColor: isCurrent ? "rgba(199,151,46,0.45)" : "rgba(199,151,46,0.15)",
                  }}
                >
                  <div className="mb-4">
                    <div className="font-mono text-[10px] tracking-[0.14em] text-ivory/50 mb-1">
                      {hour.timeframe}
                    </div>
                    <div className="font-display text-[22px] font-bold">{hour.codename}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {isCurrent && (
                        <span className="bg-verdigris px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.1em] text-gunmetal">
                          SHIPPING NOW
                        </span>
                      )}
                      <span
                        className="border px-3 py-1 font-mono text-[9px] tracking-[0.1em]"
                        style={{ borderColor: meta.color, color: meta.color }}
                      >
                        {meta.label}
                      </span>
                    </div>
                  </div>

                  <p className="font-lore italic text-[15px] text-ivory/70 mb-6">{hour.why}</p>

                  <div className="flex items-center gap-3.5" style={{ marginBottom: isExpanded ? "1.5rem" : 0 }}>
                    <div className="h-[5px] flex-1 bg-ivory/10">
                      <div
                        className="h-full"
                        style={{ width: `${hour.pct}%`, background: meta.color }}
                      />
                    </div>
                    <div className="w-9 font-mono text-[11px] text-ivory/60">{hour.pct}%</div>
                  </div>

                  {isExpanded && (
                    <div className="grid grid-cols-1 gap-3 border-t border-ivory/10 pt-4">
                      {hour.tracks.map((t) => (
                        <div key={t.track} className="flex items-start gap-2">
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0"
                            style={{ background: meta.color }}
                          />
                          <div>
                            <span
                              className="font-mono text-[8px] tracking-[0.1em] uppercase"
                              style={{ color: meta.color }}
                            >
                              {t.track}
                            </span>
                            <p className="text-[11px] text-ivory/65">{t.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <ScrollReveal className="mt-16 border-t border-brass/15 pt-12">
        <h2 className="font-display text-xl mb-8 uppercase tracking-wider font-bold">RECEIPTS</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {receiptCols.map((col, i) => (
            <div key={i} className="flex flex-col gap-px border border-brass/10 bg-brass/10">
              {col.map((r) => (
                <div
                  key={r.text}
                  className="flex flex-wrap items-center justify-between gap-4 bg-gunmetal-deep px-5 py-4"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-verdigris text-sm">✓</span>
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
  );
}
