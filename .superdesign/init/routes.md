# Routes

Next.js App Router, file-based. No router config file — routes are defined by the `src/app/**/page.tsx` file tree.

| URL | Page component | Layout | Notes |
|---|---|---|---|
| `/` | `src/app/page.tsx` | root | Home — hero, stats, showcase, marquee |
| `/mint` | `src/app/mint/page.tsx` → renders `src/app/mint/MintClient.tsx` | root | Mint — qty stepper, progress, FAQ (client component for interactivity, metadata exported from the server `page.tsx` wrapper) |
| `/roadmap` | `src/app/roadmap/page.tsx` → renders `src/app/roadmap/RoadmapClient.tsx` | root | Roadmap — centerpiece page: metrics, clock gauge, filter chips, 6-node timeline, receipts (client component; metadata from server wrapper) |
| `/gallery` | `src/app/gallery/page.tsx` | root | Gallery — 12-card grid, static server component |
| `/lore` | `src/app/lore/page.tsx` | root | Lore — 4 chapters + court structure grid, static server component |
| `/partners` | `src/app/partners/page.tsx` | root | Partners — 5 partner cards + "how to work with us", static server component |

All routes share `src/app/layout.tsx` as the single root layout (no nested/group layouts). Nav active-state is derived client-side via `usePathname()` matching the exact `href`, not a route param.

Every `page.tsx` exports its own `metadata: Metadata` (title + description); Mint/Roadmap keep metadata in the server `page.tsx` and delegate all interactive rendering to a co-located `*Client.tsx` "use client" component, since `metadata` exports are only valid in server components.
