# Extractable components

## Layout Components (appear on most/all pages)

## NavBar
- Source: `src/components/Nav.tsx`
- Category: layout
- Description: Fixed top nav, logo + 6 links, brass underline on the active route.
- Extractable props: none needed today (active state is derived from `usePathname()`, not passed in) — could extract `activeHref` if reproducing statically.
- Hardcoded: "COG & CROWN" logo text, the 6-item LINKS array (Home/Mint/Roadmap/Gallery/Lore/Partners), all styling.

## Footer
- Source: `src/components/Footer.tsx`
- Category: layout
- Description: Bottom bar, copyright line + Partners/Roadmap links.
- Extractable props: none.
- Hardcoded: copyright text, the two footer links.

## Basic Components (used across pages)

## RankPortrait
- Source: `src/components/RankPortrait.tsx`
- Category: basic
- Description: Rank-tinted portrait image card (base unit for every peer/peerage visual on the site — Home showcase, Gallery grid, Marquee, Mint preview).
- Extractable props: `src` (image path), `rank` (RankKey, drives tint opacity), `alt`, `className` (size/shape).
- Hardcoded: the oxblood tint color (`#5C1A1B`), the bottom gradient fade.

## ScrollReveal
- Source: `src/components/ScrollReveal.tsx`
- Category: basic
- Description: Fade+rise scroll-triggered wrapper used around nearly every section on every page; respects reduced motion.
- Extractable props: `delay` (number), `className`.
- Hardcoded: the animation curve/duration, the 28px rise distance.

## GearCrest
- Source: `src/components/GearCrest.tsx`
- Category: basic
- Description: Decorative rotating brass-ring hero ornament, Home page only.
- Extractable props: `src` (image path), `size` (number).
- Hardcoded: the 3 ring speeds/directions/colors, the glow shadow.

## ClockGauge
- Source: `src/components/ClockGauge.tsx`
- Category: basic
- Description: 6-tick analog clock with an animated hand pointing at the current roadmap Hour. Roadmap page only.
- Extractable props: `size` (number).
- Hardcoded: reads `HOURS` from content.ts directly to find the current hour — not prop-driven.

## Marquee
- Source: `src/components/Marquee.tsx`
- Category: basic
- Description: Infinite-scroll strip of circular portraits, Home page only.
- Extractable props: none today (reads `PORTRAITS` from content.ts directly).
- Hardcoded: 32s scroll duration, circle size (h-20 w-20), gap.

## Page-local patterns worth noting (not yet extracted into components)
- **Stat tile** (label + value, used on Home hero and Roadmap metrics strip) — currently inlined per-page, same visual pattern both places.
- **CTA button** (brass-filled primary / outline secondary, with a diagonal shimmer sweep on hover) — currently inlined in Home hero; Mint's mint-button and FAQ styling loosely echo it but aren't shared.
- **Card-with-border-and-tag** (Gallery item, Partners card, Lore rank card) — three separate inline implementations of essentially the same "bordered gunmetal-deep panel with a small mono tag + heading + body text" shape.
