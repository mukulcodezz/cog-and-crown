# Cog & Crown — Design System

## Product context
NFT collection site: "Cog & Crown" — a steampunk royal court running a clockwork empire; each token is a minted peerage (4,096 supply, 1.9 SOL, Solana). Existing UI (Next.js + Tailwind v4 + Framer Motion) is the ground truth for reproduction; this system captures its locked visual language.

## Key pages
Home (`/`), Mint (`/mint`), Roadmap (`/roadmap` — centerpiece, product-style live roadmap), Gallery (`/gallery`), Lore (`/lore`), Partners (`/partners`). Shared fixed top Nav + bottom Footer on every page.

## Colors (hard constraint — no other colors allowed)
- `gunmetal` `#2E2A26` — page background
- `gunmetal-deep` `#201D1A` — card/panel background
- `ivory` `#EFE7D2` — primary text (often at reduced opacity: /40, /45, /50, /55, /60, /65, /70, /75, /80 for hierarchy)
- `brass` `#C7972E` — primary accent: CTAs, active nav state, "WOUND"/shipped status, links
- `oxblood` `#5C1A1B` — secondary accent: secondary CTA outline, "NEXT HOUR" status, portrait rank-tint overlay color
- `verdigris` `#4A7C6F` — tertiary accent: hover state, "TICKING"/current status, current-hour clock hand

## Fonts (hard constraint — exactly these 3, never introduce another)
- **Playfair Display** (500/700/900) — all headings/display type, class `font-display`
- **Cardo** italic (400/700) — lore/body copy, pull quotes, class `font-lore`, always `italic`
- **Space Mono** (400/700) — labels, stats, nav links, buttons, eyebrows, tags — this is also the page's base/default font (`font-mono` on `<body>`)

## Type scale patterns observed
- Eyebrow label: `text-[11px] tracking-[0.2em] uppercase text-verdigris` above every page H1
- Page H1: `font-display font-black`, responsive clamp-like sizing (`text-[32px] md:text-[56px]` on sub-pages, up to `md:text-[92px]` on Home hero)
- Lead paragraph: `font-lore italic text-[18-22px] text-ivory/70-80`
- Body/description: `text-[13px] leading-relaxed text-ivory/60-65`
- Micro-label (tags, chips, stat labels): `font-mono text-[9-11px] tracking-[0.06-0.16em] uppercase`

## Layout conventions
- Hard corners everywhere — **no `border-radius`** except perfectly circular elements (portrait avatars in Marquee, clock gauge, nav-less dots). This is a deliberate "engraved/cast metal" aesthetic, not soft/rounded.
- 1px borders at low alpha (`border-brass/15` to `border-brass/40`) delineate sections and cards — never heavy borders or drop shadows except brass glow (`shadow-[0_0_Npx_rgba(199,151,46,alpha)]`) on primary CTAs and active/current elements.
- Section padding: generous, `px-6 md:px-10`, vertical `py-16` to `py-32` depending on section weight.
- Cards: `bg-gunmetal-deep` panel on `bg-gunmetal` page background, thin brass-tinted border, no shadow unless "glowing"/active.
- Grids: `grid-cols-1` → `sm:grid-cols-2` → `lg:grid-cols-3/4` responsive stacking (Gallery, Partners, Lore ranks).

## Motif (must appear, must not be diluted)
Interlocking gears, filigree corners, engraved royal crest, rivets, clock/hour iconography (the Roadmap's whole structure is a 6-hour clock face metaphor). Portrait imagery gets a rank-tinted oxblood overlay (junior peers brighter/cleaner brass, senior peers heavier oxblood/gilded tint) — this tint system IS the rarity-tier visual signal and must be preserved in any redesign.

## Motion patterns (Framer Motion + CSS)
- Global scroll-reveal: fade + 28px rise, `whileInView`, 0.6s, custom ease `[0.22,1,0.36,1]`, once-only — wraps nearly every section.
- Home hero: 3 concentric rotating brass/verdigris rings around the crest image (60s/44s reverse/90s loop, `aria-hidden` decorative).
- Roadmap signature: analog `ClockGauge` hand animates to the current Hour; a vertical timeline line draws in via scroll-linked `scaleY`; status-colored progress bars per node.
- Home Marquee: infinite horizontal CSS-keyframe scroll of circular portraits (32s linear).
- Buttons: diagonal white-overlay shimmer sweep on hover (translate-x, 500ms) on primary CTA.
- **`prefers-reduced-motion: reduce` is a hard requirement** — every animated component has a static/instant fallback (via `useReducedMotion()` in JS, plus a global CSS kill-switch zeroing all animation/transition durations). Any redesign must preserve this, not just visually but functionally.

## Full CSS token source
See `.superdesign/init/theme.md` for the complete raw `globals.css` and the Tailwind v4 `@theme inline` block — treat those values as the literal, non-negotiable token definitions.
