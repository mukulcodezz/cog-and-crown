# Ash & Gilt Allies Page Design

## Goal

Turn `/partners` into a polished Allies page that uses one name consistently, gives each ally a useful official destination, and feels native to Ash & Gilt rather than like a generic sponsor grid.

## Chosen Direction

Use an asymmetric alliance ledger. Solana is the featured anchor because it is the collection's chain; LaunchMyNFT, Phantom, Magic Eden, and Tensor appear as four supporting seal cards. This creates hierarchy without inventing logos, endorsements, contacts, metrics, or additional partnership claims.

Alternatives rejected:

- A uniform logo grid is familiar but visually generic and would require logo assets and brand-usage review.
- A horizontal carousel creates unnecessary interaction cost, hides content on mobile, and weakens the editorial ledger concept.

## Page Structure

1. A contained editorial hero labeled `ALLIES // THE ORDER'S LEDGER`, with a large headline and a short explanation.
2. A compact ledger summary stating the number of allies and represented categories.
3. One large Solana feature card with an official external link and prominent `VISIT SOLANA` action.
4. Four supporting cards in a responsive two-column grid, each containing category, name, preserved description, and official external link.
5. A quiet closing panel linking internally to Scripture, Reliquary, and The Mending.

The page remains at `/partners` for URL stability, while all visible navigation and metadata use `Allies`.

## Content Model

Extend each `ALLIES` entry with an official `href` and a concise action label. Keep the existing names, tags, and descriptions unchanged except for necessary punctuation or accessibility wording. External links open in a new tab and use `rel="noreferrer"`; accessible labels make the destination and new-tab behavior clear.

## Visual System

- Retain gunmetal, brass, verdigris, oxblood, editorial serif, lore italic, and monospaced metadata.
- Use a faint ledger grid, inset brass rules, oversized index numerals, and seal-like circular marks made from CSS rather than fabricated company logos.
- Apply restrained 250–350ms transform and border-color feedback, with no perpetual animation.
- Disable reveal movement under reduced motion through the existing `ScrollReveal` behavior.
- Keep all text and cards inside the site's `max-w-7xl` content width.

## Responsive and Accessibility Behavior

- Stack all cards in source order on mobile; use the asymmetric 7/5 split only on large screens.
- Make the entire card link keyboard reachable with visible focus treatment and a minimum 44px action target.
- Use semantic headings and a list for the ally collection.
- Mark decorative seal graphics and index numerals as hidden from assistive technology.
- Avoid horizontal scrolling and ensure long descriptions wrap without overflow.

## Verification

- Add source-level tests for consistent `Allies` navigation/metadata, five official ally destinations, safe external-link attributes, and the `/partners` canonical path.
- Run the focused tests through an observed red/green cycle.
- Run the full test suite, ESLint, production build, and `git diff --check`.
- Review the page at mobile and desktop widths, including keyboard focus and reduced-motion behavior.

## Scope Boundaries

No wallet connection, contact form, logo downloads, fabricated social proof, new claims, backend work, or route rename is included.
