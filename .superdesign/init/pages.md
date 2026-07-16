# Pages — dependency trees

All pages sit under the root layout (`src/app/layout.tsx` → `Nav.tsx`, `Footer.tsx`), so those three files apply to every page below in addition to what's listed.

## / (Home)
Entry: `src/app/page.tsx`
Dependencies:
- `src/components/ScrollReveal.tsx`
- `src/components/GearCrest.tsx`
- `src/components/RankPortrait.tsx`
  - `src/lib/content.ts` (rankByKey, RankKey)
- `src/components/Marquee.tsx`
  - `src/components/RankPortrait.tsx`
  - `src/lib/content.ts` (PORTRAITS)
- `src/lib/content.ts` (BRAND, HOME_SHOWCASE, HERO_IMAGE)

## /mint
Entry: `src/app/mint/page.tsx` (server, metadata only) → `src/app/mint/MintClient.tsx` (client)
Dependencies:
- `src/components/ScrollReveal.tsx`
- `src/lib/content.ts` (BRAND, MINT_FAQS, WALLETS, MINT_PREVIEW_IMAGE)

## /roadmap
Entry: `src/app/roadmap/page.tsx` (server, metadata only) → `src/app/roadmap/RoadmapClient.tsx` (client)
Dependencies:
- `src/components/ScrollReveal.tsx`
- `src/components/ClockGauge.tsx`
  - `src/lib/content.ts` (HOURS)
- `src/lib/content.ts` (HOURS, STATUS_META, ROADMAP_METRICS, RECEIPTS, HourStatus)

## /gallery
Entry: `src/app/gallery/page.tsx` (server, static)
Dependencies:
- `src/components/ScrollReveal.tsx`
- `src/components/RankPortrait.tsx`
- `src/lib/content.ts` (GALLERY_ITEMS)

## /lore
Entry: `src/app/lore/page.tsx` (server, static)
Dependencies:
- `src/components/ScrollReveal.tsx`
- `src/lib/content.ts` (LORE_CHAPTERS, COURT_RANKS)

## /partners
Entry: `src/app/partners/page.tsx` (server, static)
Dependencies:
- `src/components/ScrollReveal.tsx`
- `src/lib/content.ts` (PARTNERS)

## Shared data source
`src/lib/content.ts` is the single source of truth for all copy/content (brand stats, court ranks, portrait pool, gallery items, FAQs, roadmap hours, receipts, lore chapters, partners). Every page imports from it rather than hardcoding content — when designing alt versions, this file's exported shape should be treated as fixed (it's real, already-approved copy), only its presentation should change.
