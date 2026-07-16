"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { BRAND, MINT_FAQS, WALLETS, MINT_PREVIEW_IMAGE } from "@/lib/content";

export default function MintClient() {
  const [qty, setQty] = useState(1);
  const total = (qty * BRAND.price).toFixed(1);
  const mintedPct = ((BRAND.minted / BRAND.supply) * 100).toFixed(1);

  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-24 md:px-10 md:pt-32">
      <div className="mb-16 text-center">
        <div className="font-mono text-[11px] tracking-[0.2em] text-verdigris mb-5">
          MINT // INVESTITURE RITE
        </div>
        <h1 className="font-display text-[42px] font-black leading-[1.02] tracking-tight mb-8 md:text-[68px]">
          BIND YOUR TITLE
          <br />
          TO THE CROWN
        </h1>
        <p className="font-lore italic text-[20px] leading-relaxed text-ivory/75 mx-auto max-w-lg">
          4,096 seats remain at the mechanism. Each mint winds a new gear. There is no melting
          down what the court has cast.
        </p>
      </div>

      <div className="mb-16 border border-brass/30 bg-gunmetal-deep p-8 shadow-[0_0_40px_rgba(199,151,46,0.1)]">
        <div className="mb-8 flex items-center gap-6">
          <div className="relative h-[110px] w-[110px] shrink-0 overflow-hidden border border-brass/25">
            <Image src={MINT_PREVIEW_IMAGE} alt="Peerage preview render" fill sizes="110px" className="object-cover" />
          </div>
          <div className="flex-1">
            <div className="font-mono text-[10px] tracking-[0.1em] text-verdigris mb-1.5">
              WIND GAUGE
            </div>
            <div className="relative h-[12px] w-full border border-ivory/25">
              <div
                className="absolute inset-y-0 left-0"
                style={{ width: "80%", background: "linear-gradient(to right, #5C1A1B, #C7972E)" }}
              />
            </div>
            <div className="mt-2 font-mono text-[10px] tracking-wider text-ivory/40">
              PRESSURE: OPTIMAL
            </div>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between text-[13px]">
          <span className="font-mono text-ivory/60">PRICE PER SEAT</span>
          <span className="font-display text-xl font-bold">{BRAND.price} SOL</span>
        </div>

        <div className="mb-6 flex items-center justify-between border border-ivory/20 px-4 py-4">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-8 font-mono text-xl text-brass cursor-pointer hover:brightness-125 transition-all"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="font-mono text-lg">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            className="w-8 font-mono text-xl text-brass cursor-pointer hover:brightness-125 transition-all"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className="mb-8 flex justify-between border-t border-ivory/10 pt-4 font-mono text-sm">
          <span className="text-ivory/60">TOTAL INVESTITURE</span>
          <span className="font-bold text-ivory">{total} SOL</span>
        </div>

        <button
          onClick={() => alert("Binding... (connect a wallet to mint for real)")}
          className="mb-4 w-full bg-brass py-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-gunmetal shadow-[0_0_30px_rgba(199,151,46,0.35)] cursor-pointer hover:brightness-110 transition"
        >
          MINT {qty} PEERAGE{qty > 1 ? "S" : ""}
        </button>
        <div className="text-center font-mono text-[9px] uppercase tracking-[0.15em] text-ivory/30">
          Gas + protocol fee included. No refunds from the mechanism.
        </div>
      </div>

      <div className="mb-20">
        <div className="mb-8 border border-brass/25 bg-gunmetal-deep p-8">
          <div className="mb-4 flex justify-between font-mono text-[11px] tracking-[0.2em] text-ivory/60">
            <span>MINTED STATUS</span>
            <span className="text-ivory">
              {BRAND.minted.toLocaleString()} / {BRAND.supply.toLocaleString()}
            </span>
          </div>
          <div className="relative h-2 bg-ivory/10">
            <div
              className="absolute inset-y-0 left-0 bg-brass shadow-[0_0_12px_rgba(199,151,46,0.6)]"
              style={{ width: `${mintedPct}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {WALLETS.map((w) => (
            <div
              key={w}
              className="border border-ivory/15 py-4 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-ivory/70"
            >
              {w}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-ivory/30">
          Direct binding supported via major Solana vessels
        </div>
      </div>

      <ScrollReveal className="border-t border-brass/20 pt-16">
        <h2 className="font-display text-[26px] font-bold tracking-tight text-center mb-10">
          FREQUENTLY WOUND QUESTIONS
        </h2>
        <div>
          {MINT_FAQS.map((f) => (
            <div key={f.q} className="border-b border-ivory/10 py-6">
              <div className="mb-3 font-mono text-[14px] font-bold uppercase tracking-[0.1em] text-verdigris">
                {f.q}
              </div>
              <div className="font-lore text-[14px] leading-relaxed text-ivory/65">{f.a}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
