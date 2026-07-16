# Theme

Framework: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.
No component library (shadcn/MUI/etc) — hand-built primitives, Tailwind utility classes throughout.

## Fonts (src/app/layout.tsx)

- Display: **Playfair Display** (weights 500/700/900) — `--font-playfair` → `font-display`
- Lore/body italic: **Cardo** (italic + normal, 400/700) — `--font-cardo` → `font-lore`
- Data/labels/mono: **Space Mono** (400/700) — `--font-space-mono` → `font-mono` (also the body default)

## Full `src/app/globals.css`

```css
@import "tailwindcss";

@theme inline {
  --color-gunmetal: #2e2a26;
  --color-gunmetal-deep: #201d1a;
  --color-ivory: #efe7d2;
  --color-brass: #c7972e;
  --color-oxblood: #5c1a1b;
  --color-verdigris: #4a7c6f;

  --font-display: var(--font-playfair);
  --font-lore: var(--font-cardo);
  --font-mono: var(--font-space-mono);
}

body {
  background: var(--color-gunmetal);
  color: var(--color-ivory);
}

::selection {
  background: var(--color-brass);
  color: var(--color-gunmetal);
}

a {
  color: inherit;
}

/* Grain overlay: static SVG turbulence noise, low opacity, never animated */
.grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 40;
  opacity: 0.05;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}

.vignette {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 39;
  background: radial-gradient(ellipse at center, transparent 45%, rgba(0, 0, 0, 0.45) 100%);
}

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.marquee-track {
  animation: marquee-scroll 32s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none !important; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Color palette (source of truth)

| Token | Hex | Role |
|---|---|---|
| gunmetal | `#2E2A26` | page background |
| gunmetal-deep | `#201D1A` | card/panel background |
| ivory | `#EFE7D2` | primary text |
| brass | `#C7972E` | primary accent, CTAs |
| oxblood | `#5C1A1B` | secondary accent |
| verdigris | `#4A7C6F` | tertiary accent, active/current states |

## Motif

Interlocking gears, filigree corners, engraved royal crest, rivets. Signature interaction: Roadmap page has a rotating hour-hand clock gauge + scroll-linked line-draw timeline + gear rotation on Home hero. Grain overlay + vignette are global, static, non-animated. All motion respects `prefers-reduced-motion` via `useReducedMotion()` from framer-motion per-component, plus the global CSS kill-switch above.

No `tailwind.config.*` file exists — Tailwind v4 config lives entirely in the `@theme inline` block in globals.css shown above.
