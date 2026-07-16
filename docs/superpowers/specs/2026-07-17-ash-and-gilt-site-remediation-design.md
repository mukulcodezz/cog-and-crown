# Ash & Gilt Site Remediation Design

## Goal

Complete the Ash & Gilt redesign as an honest, polished concept experience. The site must not present itself as a functioning NFT sale, wallet integration, verified partnership program, or live on-chain product.

## Product Positioning

Ash & Gilt is an interactive concept for a fictional kintsugi-inspired digital collection. Minting becomes a clearly labeled preview. Unsupported claims about audits, sellouts, marketplace verification, token listings, commercial rights, fees, live metrics, and wallet transactions are removed or rewritten as fictional lore.

No real NFT launch, wallet connection, contract integration, payment flow, or fabricated contact information will be added.

## Design Direction

Preserve the established dark heritage-reliquary identity:

- Gunmetal and deep-gunmetal surfaces
- Brass as the primary interaction accent
- Lightened verdigris for accessible positive or active states
- Oxblood reserved for decorative surfaces and borders rather than small text
- Editorial serif display typography, literary body typography, and monospaced metadata
- Sharp rectangular cards, with circles reserved for seals and gauges
- Restrained cinematic motion that communicates hierarchy, state, or feedback

All routes use a shared maximum content width, consistent spacing, accessible secondary text, visible keyboard focus, and explicit mobile layouts.

## Shared Navigation and Accessibility

- Replace the crowded mobile link row with an accessible menu supporting Escape, focus, `aria-expanded`, and 44-pixel targets.
- Keep existing route slugs. Display `/partners` as “Allies” in navigation and metadata.
- Add a skip link, main-content target, `aria-current`, global focus-visible styling, and clearer footer navigation.
- Raise essential text sizes and contrast. Hover interactions receive keyboard and touch equivalents.
- Preserve reduced-motion behavior across all animated components.

## Page Changes

### Home

- Prevent hero and statistics overlap on short and mobile viewports.
- Keep statistics in normal flow on mobile and constrain all content sections.
- Improve CTA focus and press feedback.
- Add scroll snapping and accessible focus to the specimen row.
- Avoid preloading the decorative crest alongside the true LCP image.

### Mint Preview

- Rename and frame the experience as an interactive mint preview.
- Replace the browser alert with inline pending and completion states announced through an ARIA live region.
- Add cleanup for pending timers, disabled quantity boundaries, 44-pixel controls, and semantic progress values.
- Add manual grade controls and pause automatic preview changes during interaction.
- Present wallet names as compatibility references, not selectable connection controls.
- Remove unsupported gas, protocol-fee, live-sale, and transaction language.

### Roadmap

- Use the semantic vertical timeline on mobile and for reduced motion.
- Keep the 3D procession for capable desktop viewports only.
- Add accessible active-step state, larger controls, semantic progress, and a list alternative.
- Reduce expensive blur, shadow-filter, and particle work.
- Rewrite contradictory completion language and remove unsupported proof claims.

### Gallery

- Describe the displayed pieces as representative grade studies rather than unique live tokens.
- Add filter pressed state, result announcements, focus styling, and reduced-motion-safe layout transitions.
- Remove misleading interactivity from cards unless they expose real details.
- Fix repeated SVG gradient identifiers and allow placement-specific responsive image sizes.

### Lore

- Align the header with the reading column and add a compact chapter index.
- Improve chapter-label contrast and decorative semantics.
- Simplify the repeated grade presentation and add a quiet next step.

### Allies

- Replace the unfinished equal-card grid with one featured ally and four supporting entries in an asymmetric ledger.
- Use honest typographic brand treatments rather than fabricated initial-letter logos.
- Link only to authoritative public organization sites. Do not claim formal partnerships or collection verification.
- Replace the dead-end collaboration cards with a concept-project explanation and useful internal next steps. Do not invent contact details.
- Add staggered entry and restrained hover/focus feedback using transform and opacity only.

## Motion System

- Entry motion: 700-900ms using the existing emphasized easing curve.
- Interaction feedback: 250-450ms using transform and opacity.
- Collection entries may stagger by 50-70ms.
- The Home marquee and hero sigil remain the only perpetual editorial motion.
- Filtering and status transitions preserve spatial understanding.
- All motion becomes static or instant when reduced motion is requested.

## SEO and Trust

- Do not emit the reserved `.example` domain as a canonical production origin.
- Add a validated site-origin helper with a safe local fallback that does not pretend to be a production domain.
- Add sitemap and robots metadata only when a real production origin is configured.
- Add self-referencing canonicals and route-specific Open Graph/Twitter metadata through a shared helper.
- Add conservative `WebSite` structured data using only the fictional brand and configured URL; do not add offers, prices, ratings, availability, company registration, social profiles, or contract data.
- Generate or optimize route-appropriate 1200x630 social images from existing assets.
- Rewrite stale Cog & Crown package and README metadata.
- Preserve `/partners` as the canonical route and use “Allies” as its visible label.

## Performance

- Compress oversized image masters and social assets while preserving source composition.
- Keep one priority LCP image per page.
- Improve `sizes` declarations for portrait placements.
- Isolate interactive client components where practical.
- Animate transforms rather than width, height, or filter effects.

## Verification

- Run ESLint, TypeScript/production build, and any added tests.
- Inspect the generated route list and metadata output.
- Verify keyboard navigation, reduced-motion behavior, mobile layout fallbacks, and concept/demo disclosure in source-level checks.
- Confirm no `.example`, live-mint, real-transaction, unsupported fee, audit, marketplace-verification, or sold-out claim remains visible.

