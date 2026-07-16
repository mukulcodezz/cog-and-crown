# Cog & Crown — NFT Site Design Spec

Date: 2026-07-16
Status: Approved by user, pending implementation plan

## 1. Summary

Replace the earlier "Abyssal Choir" build (imported from Claude Design, theme #10 in `NFT-FACTORY-PROMPTS.md`) with **Cog & Crown** (theme #9 in the same file) — a steampunk royal court running a clockwork empire, where each NFT is a minted peerage. Rebuilt as a Next.js app instead of the static HTML the Abyssal Choir Home page used.

## 2. Non-goals

- No real wallet connection or on-chain mint — Mint button stays decorative (`alert('Binding... (connect a wallet to mint for real)')`), matching the source design's own placeholder pattern.
- No real smart contract, no backend/API, no payment processing.
- No true 4,096 unique generative images — only ~18-19 curated images are generated (see §6), reused/duplicated conceptually across the notional 4,096 supply.

## 3. Stack

Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion. `npm run dev` to view (no longer a double-click-the-HTML-file site). Existing `index.html` / `assets/css/site.css` from the Abyssal Choir static pass are superseded and removed during implementation.

## 4. Brand system

- **Palette:** gunmetal `#2E2A26` (background), ivory `#EFE7D2` (text), aged-brass `#C7972E` (primary), oxblood `#5C1A1B` (secondary accent), verdigris `#4A7C6F` (tertiary accent).
- **Fonts:** Playfair Display (display/headings), Cardo italic (lore/body), Space Mono (labels/stats/data).
- **Motif:** interlocking gears, filigree corners, engraved royal crest, rivets.
- **Supply/price/status:** Supply 4,096 · Price 1.9 SOL · Status "Court in Session" · Minted 3,187/4,096 (~77.8%).

## 5. Pages

All 6 pages share the nav pattern already proven in the Abyssal Choir pass (fixed top nav, active-state underline, logo → Home).

### 5.1 Home
- Eyebrow: `[ HOUR IV ] // STATUS: COURT IN SESSION`
- H1: "FOUR THOUSAND NINETY-SIX PEERAGES<br/>FOR THE **CROWN**" (accent on CROWN)
- Lead: "Each token a title bound in brass and oath. Take your seat in the mechanism, or watch the hour pass you by."
- Stats row: SUPPLY 4,096 / PRICE 1.9 SOL / MINTED 3,187 / STATUS Court in Session
- CTAs: "Claim a Peerage" → Mint (primary, brass) · "Read the Royal Decree" → Lore (outline, oxblood)
- Showcase section "Peers Already Seated" → 4 cards linking to Gallery:
  - `#0007` The Clockwright's Heir — *young noble, brass gear crown, warm gaslight*
  - `#0154` Warden of the Ninth Gear — *engraved brass mask, oxblood sash*
  - `#0512` Herald of the Brass Court — *trumpet-bearer noble, filigree collar*
  - `#1090` Keeper of the Verdigris Seal — *aged duke, verdigris signet ring glow*
- Decorative: slow-rotating brass gear/crest behind hero (motion, §7).

### 5.2 Mint
- Eyebrow: `MINT // INVESTITURE RITE`
- H1: "BIND YOUR<br/>TITLE TO<br/>THE CROWN"
- Lead: "4,096 seats remain at the mechanism. Each mint winds a new gear. There is no melting down what the court has cast."
- Progress bar: MINTED 3,187 / 4,096
- Wallets row: PHANTOM / MAGIC EDEN / TENSOR
- Right panel: preview render slot, price 1.9 SOL, qty stepper (min 1, max 10, − / +), total = qty × 1.9 (1 decimal), mint button label `MINT {qty} PEERAGE{S if qty>1}`, click → decorative alert.
- FAQ grid, expanded to 6 entries (was 4 in Abyssal Choir):
  1. WHEN DOES THE COURT CLOSE? — "When all 4,096 seats are bound, or the Crown calls session — whichever comes first."
  2. WHAT CHAIN? — "Solana. Mint directly or via Magic Eden / Tensor listings once live."
  3. IS THERE A WHITELIST? — "The founding roll closed during the First Reign. Public investiture is open now."
  4. WHAT DO I GET? — "A generative peerage, commercial rights, and a seat in the Great Mechanism staking protocol."
  5. ARE THERE ROYALTIES? — "5% secondary royalty funds the treasury and future Hours — enforced where marketplaces honor it."
  6. WHEN IS REVEAL? — "Peerages reveal at mint — no blind box, no delayed unveiling. What you bind is what you hold."

### 5.3 Gallery
- Eyebrow: `GALLERY // THE PEERAGE ROLL`
- H1: "4,096 TITLES,<br/>ONE COURT"
- Lead: "Every peer carries a rank in the court and titles engraved into their crest at investiture."
- 12-card grid, id pattern `'#' + String(1000 + i*137).padStart(4,'0')`, rank cycles through the 6 Court Ranks (§5.5), 2 trait chips per card from pools:
  - Trait 1: BRASS SEAL / OXBLOOD SASH / GEAR-EYE / IVORY GLOVE / VERDIGRIS PIN / RIVETED CROWN
  - Trait 2: RARE / FOUNDING WOUND / GILDED / COURT-BORN / FIRST REIGN / CLOCKWORK-TOUCHED

### 5.4 Lore
- Eyebrow: `LORE // THE ROYAL DECREE`
- H1: "WHAT THE<br/>CROWN REMEMBERS"
- 4 chapters:
  1. **ORIGIN — I, "The First Wind"** — the mechanism's founding; a court that wound itself into being before it had a ruler.
  2. **THE MECHANISM — II, "No Hand Turns It But Ours"** — the clockwork empire has no single monarch, only the mechanism and those who wind it.
  3. **THE COURT — III, "Six Reigns, One Face"** — the six-Hour structure that governs succession and season.
  4. **THE PEERAGE — IV, "A Title Cast, Not Given"** — what a token/peerage actually represents: a title struck once, in brass, unrepeatable.
- Court Structure section (5.5) rendered as a 2-column grid, same layout as Abyssal Choir's "Cult Structure".

### 5.5 Court Ranks (tiering system)
Replaces the Abyssal Choir depth-zone tiering. 6 ranks, junior → senior, used both in Gallery/Lore rank labels and to grade portrait brass-intensity in generated art:
1. **BARON** — newly invested; brass still bright, unweathered.
2. **VISCOUNT** — has held a seat through one full Reign.
3. **EARL** — oversees a Track (Art/Tech/Community/IRL/Token) on the council.
4. **MARQUESS** — warden of a hall; rarely seen outside session.
5. **DUKE** — one of six, each bound to an Hour of the Mechanism.
6. **PRINCE-REGENT** — holds no vote, only the key that winds the whole court.

### 5.6 Partners
- Eyebrow: `PARTNERS // THE GUILD LEDGER`
- H1: "WHO WINDS<br/>THE GEARS"
- Lead: "The infrastructure that keeps the mechanism turning without stripping its gears."
- 5 partner cards (same categories as Abyssal Choir, reworded): Solana (mint infrastructure), LaunchMyNFT (launchpad), Phantom (wallet), Magic Eden (marketplace), Tensor (marketplace).
- "How to work with us" 2-column block: Marketplace/Launchpad · Brand/IRL — same structure as Abyssal Choir.

### 5.7 Roadmap — "The Great Mechanism" (centerpiece)
- Eyebrow: `THE GREAT MECHANISM // LIVE ROADMAP`
- H1: "WIND THE COURT UNTIL<br/>THE CROWN AWAKENS"
- Lead: "This is not a plan with an end date. It is a mechanism still being wound, measured in what we've already cast."
- Metrics strip: HOLDERS 3,142 / HOURS WOUND 8 of 24 / FLOOR 1.4 SOL / TREASURY DEPLOYED 58%
- Overall progress bar: "OVERALL WIND" — average of the 6 Hour `pct` values below.
- Filter chips: ALL HOURS / WOUND / TICKING / NEXT HOUR / UNCHARTED (client-state filter, same interaction as Abyssal Choir's status filter).
- 6 Hour-nodes around a clock face, connected by a vertical route line (SVG draws on scroll, §7). Each node: number, codename, timeframe ("Reign I"–"Reign VI"), status chip, % bar, one-line "why it matters", 5 tracks (Art/Tech/Community/IRL/Token), expand/collapse on click (one node — Hour III — expanded by default, matching Abyssal Choir's default-expanded pattern):

  1. **Hour I — "First Wind"** · Reign I · **WOUND** (shipped) · 100%
     *Where the court first gathered — the last hour with no gears turning yet.*
     - ART: Genesis peerage art direction locked, 6 court-rank archetypes defined.
     - TECH: Smart contract written and independently audited.
     - COMMUNITY: Discord court opened, founding 1,000 admitted.
     - IRL: First cast-brass seal revealed at a private gathering.
     - TOKEN: $CROWN tokenomics drafted and shared with the court.

  2. **Hour II — "The Turning"** · Reign II · **WOUND** (shipped) · 100%
     *The first gear catches. Genesis mint sells out and the court starts being seen in public.*
     - ART: Full 4,096-peerage reveal completed across all court ranks.
     - TECH: Mainnet mint contract live; sold out in 9 minutes.
     - COMMUNITY: Court crosses 4,096 members across Discord and X.
     - IRL: First merch capsule (brass pins, wax-seal stamps) shipped.
     - TOKEN: $CROWN claim portal opened for genesis holders.

  3. **Hour III — "Mainspring"** · Reign III · **TICKING** (building, current) · 62%
     *The mainspring is wound but not released — this is the staking protocol that lets peerages keep earning after mint.*
     - ART: Rare "founding wound" trait reveal rolling out to holders now.
     - TECH: Great Mechanism staking ($CROWN yield by seat tenure) in closed beta.
     - COMMUNITY: Weekly "council session" AMAs; court-voted lore chapters.
     - IRL: Brass-merch pop-up confirmed for this cycle.
     - TOKEN: $CROWN listed on a secondary DEX; treasury deployment begun.

  4. **Hour IV — "The Escapement"** · Reign IV · **NEXT HOUR** (next) · 0%
     *The mechanism that lets one gear release without the whole court unwinding. Cross-collection peerage fusion and a second mint wave.*
     - ART: Fusion mechanic — two peerages can be sworn together into a rarer third.
     - TECH: On-chain "wind score" tracking cumulative staking + fusion history.
     - COMMUNITY: Court council elected to steward lore canon.
     - IRL: Cast-brass peerage objects for top wind scores.
     - TOKEN: $CROWN governance vote on treasury allocation.

  5. **Hour V — "The Chime"** · Reign V · **UNCHARTED** (exploring) · 0%
     *No one has heard the fifth chime yet. The roadmap ends because the mechanism's maker never wrote a sixth page.*
     - ART: Final peerage tier — unlisted by design, revealed only at the chime.
     - TECH: Fully on-chain generative "wake event" — outcome unknown, even to us.
     - COMMUNITY: Prince-Regent's Circle formed from the deepest-staked peerages.
     - IRL: A single physical gathering, location disclosed 24 hours prior.
     - TOKEN: Remaining treasury distributed to whoever still holds a seat.

  6. **Hour VI — "Midnight Court"** · Reign VI · **UNCHARTED** (exploring) · 0%
     *The hour the clock face doesn't show. What the mechanism becomes once it stops needing a court to wind it.*
     - ART: No brief exists for this tier yet — by design.
     - TECH: Contract upgrade path reserved, not yet drafted.
     - COMMUNITY: Succession vote on whether Midnight Court opens at all.
     - IRL: TBD by the Prince-Regent's Circle.
     - TOKEN: Final $CROWN emission schedule, pending Hour V outcome.

- Receipts strip (5 items):
  - Smart contract audited (Sec3) — 2025.10.18
  - Genesis mint sold out in 9 minutes — 2025.12.02
  - Listed on Magic Eden & Tensor — 2026.01.09
  - Discord court crosses 4,096 — 2026.02.20
  - Great Mechanism staking ($CROWN) beta live — 2026.05.14

## 6. Image generation plan (10 images max, hard cap on credits)

100 image credits total budget, but user capped actual generation to **10 images max**. 4,096 unique tokens was never realistic; now not even the original 17-19 slot-fill plan is — real budget is 10 generated assets, reused across every UI slot that needs art.

- **Style:** painterly/illustrated (not photoreal), consistent across every image — steampunk portrait bust, engraved-etching linework, warm gaslight rim-light, brass-clad nobles with clockwork crowns. Matches the Cog & Crown brief's own art-style line ("ornate steampunk portraits... engraved etching detail, warm gaslight").
- **Subject:** cultist/noble portrait, chest-up, PFP-style — ties to Lore's named ranks.
- **Rank tiering:** portrait brass-intensity/warmth grades junior (Baron, brighter/cooler brass) → senior (Prince-Regent, deep oxblood-and-brass, heavier gilding).
- **The 10 generated images:**
  1. Hero — brass gear/crest illustration (Home hero, reused cropped as OG image base)
  2-9. 8× unique noble portrait busts, spanning the 6 Court Ranks (§5.5), junior→senior grading — this pool is **reused/cycled** to fill both Home's 4 showcase cards AND Gallery's 12-card grid (each portrait appears on 1-2 Gallery cards with different id/rank/trait-chip text; no new generation per repeat) AND the Mint preview slot (reuses one existing portrait, no new generation).
  10. Simplified brass-crest icon for favicon (flat, legible at 16px) — separate generation since the hero image is too detailed to downscale cleanly.
- Duplication is visually masked by varying the id/rank/trait-chip text and a CSS color-grade filter per rank tier on repeated portraits — not by generating new art.

## 7. Motion system (Framer Motion)

- **Signature (Roadmap):** vertical route line between Hour-nodes draws on scroll (SVG path/stroke-dashoffset via `useScroll`+`useTransform`); hour-hand SVG rotates to point at the current ("Ticking") hour; each node rivet-stamps in (scale+opacity `whileInView`); connector segments draw in sequence.
- **Hero:** brass gear/crest behind headline rotates slowly, continuous, low-key.
- **Buttons:** metallic shimmer sweep on hover (CSS gradient position animation, not JS-driven).
- **Global:** scroll-reveal (fade+rise) per section on all pages; filigree corner accents draw in on first reveal; one marquee strip of peerage portraits (Home or Gallery); grain overlay + warm gaslight vignette (static CSS, not animated).
- **Accessibility:** `prefers-reduced-motion: reduce` disables all rotation/shimmer/draw animations — elements render in their final resting state instantly, no motion.

## 8. Extra features

- SEO/OG meta tags (unique title + description per page) + Twitter card + favicon (brass crest icon, §6).
- Mint FAQ expanded 4 → 6 entries (added royalties + reveal-timing questions, §5.2).

## 9. Superdesign alt pass (after this baseline ships)

Once all 6 Cog & Crown pages are built and functional, run the `superdesign` skill to produce an alternate visual pass across all 6 pages. Compare against the baseline, recommend a winner or a merge of best elements, get user approval before anything replaces the baseline.

## 10. Verification criteria

- `npm run build` succeeds, zero TypeScript errors; `npm run lint` clean.
- `npm run dev` — all 6 routes load with no console errors.
- Every generated image (§6) is referenced by exactly one `<Image>` slot; no broken `src`.
- `prefers-reduced-motion` emulated in devtools → all rotation/shimmer/draw animation replaced by static end-state.
- No horizontal scroll at 375px / 768px / 1440px viewport widths; Roadmap renders as a vertical stack on mobile.
- Nav active-state matches the current route on every page.
- Mint qty stepper clamps to [1,10]; total recalculates correctly; FAQ shows 6 entries.
- Roadmap: filter chips show/hide nodes by status correctly; expand/collapse toggles each node's tracks independently; Hour III starts expanded.
- Each page has a unique `<title>` + meta description; OG/Twitter tags present; favicon loads.

## 11. Open items carried into implementation

- Git: project directory is not yet a git repo. `git init` recommended before scaffolding so the loop-protocol-style iteration (multiple polish passes) has a safety net — to be done as the first implementation step, not silently.
- Old Abyssal Choir artifacts (`index.html`, `assets/css/site.css`, `assets/css/` dir) to be deleted once the Next.js scaffold's Home page is live and verified, not before.
