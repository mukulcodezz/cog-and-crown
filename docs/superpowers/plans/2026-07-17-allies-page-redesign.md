# Ash & Gilt Allies Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/partners` as a consistent, accessible Allies ledger with official outbound destinations and a polished responsive hierarchy.

**Architecture:** Keep ally data centralized in `src/lib/content.ts`, adding only official destinations and action labels. Render the route as a server component using semantic linked cards, preserve `/partners` as the URL, and use a source-level Node test to lock naming, link safety, and content-model requirements without adding a browser-test dependency.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, Node test runner, ESLint 9.

## Global Constraints

- Preserve the existing ally names, tags, descriptions, and Ash & Gilt brand voice.
- Keep `/partners` as the route while displaying `Allies` everywhere visible and in route metadata.
- Use only official HTTPS destinations for Solana, LaunchMyNFT, Phantom, Magic Eden, and Tensor.
- Do not add logos, endorsements, contacts, metrics, wallet behavior, or new partnership claims.
- External destinations must open in a new tab with `rel="noreferrer"` and an accessible label.
- Keep all controls at least 44px tall and all motion reduced-motion safe.

---

### Task 1: Build and verify the Allies ledger

**Files:**
- Create: `src/app/partners/allies.test.ts`
- Modify: `src/lib/content.ts`
- Modify: `src/components/Nav.tsx`
- Modify: `src/app/partners/page.tsx`

**Interfaces:**
- Consumes: `ScrollReveal`, `createPageMetadata`, and the existing `ALLIES` array.
- Produces: `ALLIES` entries with `{ tag, name, desc, href, action }` and an accessible `/partners` route labeled Allies.

- [ ] **Step 1: Write the failing source and content-model test**

Create `src/app/partners/allies.test.ts`:

```ts
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { ALLIES } from "../../lib/content.ts";

const pageSource = readFileSync(new URL("./page.tsx", import.meta.url), "utf8");
const navSource = readFileSync(new URL("../../components/Nav.tsx", import.meta.url), "utf8");

test("allies expose five unique official HTTPS destinations", () => {
  assert.equal(ALLIES.length, 5);
  assert.equal(new Set(ALLIES.map((ally) => ally.href)).size, 5);
  for (const ally of ALLIES) {
    assert.match(ally.href, /^https:\/\//);
    assert.ok(ally.action.length > 0);
  }
});

test("the partners route is presented consistently as Allies", () => {
  assert.match(pageSource, /title: "Allies"/);
  assert.match(pageSource, /path: "\/partners"/);
  assert.match(navSource, /href: "\/partners", label: "Allies"/);
});

test("ally cards use safe, accessible external links", () => {
  assert.match(pageSource, /target="_blank"/);
  assert.match(pageSource, /rel="noreferrer"/);
  assert.match(pageSource, /aria-label=/);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test src/app/partners/allies.test.ts`

Expected: FAIL because current `ALLIES` entries do not expose `href` or `action`, the navigation label is `Partners`, and the route has no external anchors.

- [ ] **Step 3: Extend the ally data model**

Update the five entries in `src/lib/content.ts` to preserve their existing `tag`, `name`, and `desc` fields and add these exact fields:

```ts
{ name: "Solana", href: "https://solana.com/", action: "Visit Solana" }
{ name: "LaunchMyNFT", href: "https://launchmynft.io/", action: "Visit LaunchMyNFT" }
{ name: "Phantom", href: "https://phantom.com/", action: "Visit Phantom" }
{ name: "Magic Eden", href: "https://magiceden.io/", action: "Visit Magic Eden" }
{ name: "Tensor", href: "https://www.tensor.trade/", action: "Visit Tensor" }
```

- [ ] **Step 4: Make the visible route name consistent**

In `src/components/Nav.tsx`, change only the `/partners` link label:

```ts
{ href: "/partners", label: "Allies" },
```

In `src/app/partners/page.tsx`, set metadata to:

```ts
export const metadata = createPageMetadata({
  title: "Allies",
  description: "The infrastructure allies that keep the Order of Ash & Gilt moving.",
  path: "/partners",
  image: "/images/og-roadmap.jpg",
});
```

- [ ] **Step 5: Replace the route body with the asymmetric ledger**

Keep `PartnersPage` as a server component. Use `max-w-7xl`, a contained hero, a semantic `<ol>`, one featured `lg:col-span-7` item, and a four-card `sm:grid-cols-2 lg:col-span-5` grid. Each ally card must be an anchor with:

```tsx
<a
  href={ally.href}
  target="_blank"
  rel="noreferrer"
  aria-label={`${ally.action} (opens in a new tab)`}
  className="group flex min-h-44 flex-col justify-between border border-brass/20 bg-gunmetal-deep p-6 transition duration-300 hover:-translate-y-1 hover:border-brass/60 focus-visible:-translate-y-1"
>
```

Use CSS-only decorative seal circles and index numerals with `aria-hidden="true"`. Add an explicit 44px-tall action row to each card. Keep the closing internal links to `/lore`, `/gallery`, and `/roadmap`.

- [ ] **Step 6: Run the focused test and verify GREEN**

Run: `node --test src/app/partners/allies.test.ts`

Expected: 3 tests pass, 0 fail.

- [ ] **Step 7: Run project verification**

Run: `npm test`

Expected: all Node tests pass.

Run: `npm run lint`

Expected: exit code 0 with no ESLint errors.

Run: `npm run build`

Expected: successful Next.js production build including `/partners`.

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 8: Review responsive and interaction behavior**

Run the production site and inspect `/partners` at approximately 390px and 1440px widths. Confirm no horizontal overflow, logical source order, visible keyboard focus, 44px actions, readable wrapping, and no continuous animation with reduced motion enabled.

- [ ] **Step 9: Commit the implementation**

```bash
git add src/app/partners/allies.test.ts src/app/partners/page.tsx src/components/Nav.tsx src/lib/content.ts
git commit -m "feat: rebuild Allies ledger"
```
