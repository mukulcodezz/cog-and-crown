# Ash & Gilt — NFT Layer Generation Roadmap

**Audience:** Image AI operator / generative artist friend
**Goal:** Produce a layered trait asset pack that composites into a full generative NFT collection and exports in **LaunchMyNFT** launch-input format.
**Brand:** Ash & Gilt — kintsugi-inspired reliquary masks, mended in gold, on Solana
**Tagline:** *Nothing whole is holy.*
**Target supply:** **222 max** unique reliquaries (`0` … `221`) — matches `BRAND.supply` in `src/lib/content.ts`
**Layer budget:** 55–70 trait plates (enough variety for 222; do not generate 222 full AI images)

---

## 0. Executive summary (read this first)

Build the collection like an improved Alfie-style pipeline:

1. **AI generates ~55–70 transparent trait layers** (once).
2. **A script composites random unique combinations** into final NFTs (free locally) up to **222 max**.
3. **Output matches LaunchMyNFT:**

```text
launch_input/
  images/
    0.jpeg
    1.jpeg
    ...
  metadata/
    0.json
    1.json
    ...
```

Do **not** generate one AI image per NFT. That is expensive and inconsistent.
Generate **modular layers**, then assemble.

**Recommended AI stack for the friend:**

| Stage | Model | Why |
|---|---|---|
| Style lock / matching masks | FLUX Kontext Pro | Locks look to existing Ash & Gilt portraits |
| Final trait plates | FLUX Dev or FLUX.2 Pro | Best quality-per-dollar photoreal |
| Seals / rings / crests | Recraft | Native transparent PNG |
| Drafts only | FLUX Schnell | Cheap exploration, not finals |
| Background removal | Recraft rembg or BiRefNet | Clean alpha plates |

**Estimated AI spend for ~55–70 keepers + retries:** ~$4–9.

---

## 1. Brand bible (non-negotiable)

### 1.1 Concept

Each NFT is a **reliquary** — a face struck once and mended in gold, "the exact map of a single break, poured in gold and never poured again."
Not cute PFPs. Not meme avatars. **Solemn, cinematic, prestige kintsugi reliquary.**

### 1.2 Visual identity

| Token | Hex | Use |
|---|---|---|
| Gunmetal | `#2E2A26` / `#201D1A` | Dark atmosphere, shadows |
| Ivory | `#EFE7D2` | Porcelain highlights, parchment accents |
| Brass | `#C7972E` | Poured gold, seals, borders |
| Oxblood | `#5C1A1B` | Velvet backdrops, fault shadow, low-grade weathering |
| Verdigris | `#4A7C6F` | Patina, rare pins, aged copper |

**Art style keywords (always include):**
photoreal cinematic reliquary portrait, kintsugi gold-seam mending, aged porcelain and fired clay, oxblood velvet backdrop, verdigris patina, molten gold crack filigree, chiaroscuro lighting, engraved fault topography, high craft, dark prestige, 85mm portrait lens look

**Never include:** cartoon, anime, chibi, neon cyberpunk, plastic 3D toy, flat vector PFP, purple glow, cute animal mashup, modern streetwear, sci-fi chrome future city, clockwork/gear ornamentation, crowns or royal court regalia

### 1.3 The Six Grades (hierarchy)

Higher grade = more gold poured into the fault, less bare porcelain, more brass sheen. These values and shares are canon in `GRADES` (`src/lib/content.ts`) — do not diverge from them.

| Grade | Visual cue | Gild | Share |
|---|---|---|---|
| Ashborn | Bare porcelain, not one seam poured yet | 0.00 | 38% |
| Hairline | The first gold traces a crack | 0.15 | 27% |
| Seam | A single bold seam of gold crosses the face | 0.35 | 18% |
| Lattice | A whole lattice of veins — more gold than fault | 0.60 | 11% |
| Gilt-Wrought | Almost wholly gold, only shards of white remain | 0.85 | 5% |
| Solid Gold | The Unbroken — a flawless gold face | 1.00 | 1% |

### 1.4 Reference assets (must be provided to the image AI)

Give the friend these files from the project:

- `public/images/hero-crest.png` — brand emblem / sigil seal
- `public/images/portrait-01.png` … `portrait-06.png` — locked visual target, one per grade (Ashborn → Solid Gold, in order)

**Instruction to the image AI:**
"Match the material language, lighting, palette, and craft level of these references. Do not copy faces 1:1 across every base; vary identity while keeping the same world."

---

## 2. Architecture (improved Alfie model)

### 2.1 Why layers

| Approach | Cost | Consistency | Fit for Ash & Gilt |
|---|---|---|---|
| 222 full AI images | Moderate (~$9–15) | Weak | Poor |
| **~55–70 layers + scripted composite** | Low ($4–9) | Strong | **Best** |
| Hybrid (AI bases + overlay traits) | Low–mid | Strongest for photoreal | Recommended here |

### 2.2 Photoreal rule (critical)

Unlike cartoon collections, **do not** try to swap photoreal mouths/eyes as separate floating stickers unless edges are perfect.

**Safe to overlay as transparent plates:**
- Backgrounds
- Cowl / adornment (halo, sash, clasp)
- Mark / rune pin
- Halo ring
- Frame / vignette / atmospheric overlays

**Bake into the base mask (do not separate):**
- Fault/crack geometry and gold coverage (this *is* the Grade — see §4.2)
- Face/mask identity
- Porcelain fracture topography
- Core void/eye treatment
- Lineage clay tone
- Neck/shoulder anatomy continuity

### 2.3 Canvas specification

| Spec | Value |
|---|---|
| Canvas size | **2048 × 2048 px** (generate), export finals at **1024 × 1024** or **1000 × 1000** JPEG |
| Color space | sRGB |
| Layer format | **PNG-24 + alpha** |
| Alignment | Same center, same bust framing for every plate |
| Subject framing | Head + upper torso (chest-up reliquary portrait), face roughly in upper-middle third |
| Background layers | Full-bleed, opaque |
| Trait overlays | Transparent outside the object; **no drop shadows that paint onto the mask unless intended** |
| Safe margin | Keep critical halo tips / shoulders inside 5% inset from edges |

### 2.4 Layer stack order (bottom → top)

```text
01 Background       (opaque)
02 Base Mask        (bust + fractured face; grade + lineage baked in; opaque subject)
03 Adornment        (cowl / halo / sash / clasp; transparent)
04 Mark             (rune / pin; transparent)
05 Halo Ring        (transparent, optional)
06 Atmosphere       (vignette, gold dust, grain; transparent)
```

Any plate that violates alignment will destroy the whole collection. **Alignment is more important than artistic flourish.**

---

## 3. Trait bible — full layer inventory (~57 plates)

Sized for a **222 max** supply: enough combinatorial depth without over-producing assets.

Target band: **55–70**. This plan uses **57** keepers. Friend may cut weak ones or add up to ~13 variants after QA (hard cap **70** plates).

### 3.1 Summary counts

| # | Trait type | Folder name | Count | Notes |
|---|---|---|---|---|
| 01 | Background | `01-background` | 10 | Opaque |
| 02 | Base Mask | `02-base-mask` | 18 | 6 grades × 3 lineages; grade is baked in |
| 03 | Adornment | `03-adornment` | 6 | Matches `TRAIT1_POOL`; include `None` in script |
| 04 | Mark | `04-mark` | 6 | Matches `TRAIT2_POOL`; include `None` |
| 05 | Halo Ring | `05-halo-ring` | 8 | Include `None` |
| 06 | Atmosphere | `06-atmosphere` | 9 | Include `None` / subtle default |
| | **Total plates** | | **57** | |

Script-side `None` options do not require blank PNG files (skip compositing that layer).

**Uniqueness note for 222 supply:** `10 backgrounds × 18 bases × 7 adornment × 7 mark × 9 ring × 10 atmosphere` far exceeds 222 combinations. Enforce unique DNA and stop at token `221`. Grade counts are controlled separately by weighted selection of the Base Mask plate (§7.1), not by raw combinatorics.

---

## 4. Exact trait lists + metadata names

Use these **exact metadata values**. Filenames use kebab-case IDs. Adornment and Mark values are copied verbatim from `TRAIT1_POOL` / `TRAIT2_POOL` in `src/lib/content.ts` (title-cased for metadata) so generated art can eventually replace the site's text-only specimen traits.

### 4.1 Background (10) — `trait_type: "Background"`

| ID | Metadata value | Prompt intent |
|---|---|---|
| `bg-ash-sanctum` | Ash Sanctum | Dark stone hall, carved circular relief, torch warmth |
| `bg-reliquary-vault` | Reliquary Vault | Rows of shelved masks in shadow, cathedral hush |
| `bg-gilt-foundry` | Gilt Foundry | Molten gold glow, crucible sparks, forge heat |
| `bg-oxblood-chapel` | Oxblood Chapel | Velvet drapery, deep red alcove |
| `bg-verdigris-cistern` | Verdigris Cistern | Oxidized copper doors, green patina walls |
| `bg-kiln-chamber` | Kiln Chamber | Firing kiln embers, cracked clay shards on shelves |
| `bg-seam-court` | Seam Court | Heraldic wall with embossed brass seals |
| `bg-ivory-archive` | Ivory Archive | Dusty parchment shelves, warm ivory light |
| `bg-gunmetal-nave` | Gunmetal Nave | Bare stone nave, single high window shaft of light |
| `bg-pouring-hall` | Pouring Hall | Gold being poured in the background, out of focus |

### 4.2 Base Mask (18) — `trait_type: "Grade"` + `trait_type: "Lineage"`

Each base encodes **Grade** (gold coverage, canon in §1.3) and **Lineage** (identity family). Grade is baked into the base — it is *not* a separate overlay, because the amount of gold in the fault visibly reshapes the crack geometry and light response of the mask.

**Lineages (3):**
1. `Ashclay` — angular features, cool porcelain undertone
2. `Gilt-Cast` — warmer ivory tone, classical reliquary face
3. `Verdigris-Worn` — weathered, slightly aged patina undertone

| Filename pattern | Grade metadata | Lineage metadata |
|---|---|---|
| `base-ashborn-ashclay.png` | Ashborn | Ashclay |
| `base-ashborn-gilt-cast.png` | Ashborn | Gilt-Cast |
| `base-ashborn-verdigris-worn.png` | Ashborn | Verdigris-Worn |
| …repeat for Hairline, Seam, Lattice, Gilt-Wrought, Solid Gold | | |

**Grade visual grading (must be visible, gild values from §1.3):**

- **Ashborn (0.00):** bare porcelain clarity, one clean fracture, no gold, faint oxblood shadow in the crack
- **Hairline (0.15):** the first thin gold trace along a single crack
- **Seam (0.35):** one bold gold seam crossing the face, still mostly bare porcelain
- **Lattice (0.60):** a dense lattice of gold veins — more gold than fault now
- **Gilt-Wrought (0.85):** almost wholly gold, only shards of white porcelain remain
- **Solid Gold (1.00):** flawless gold face, no visible fault, darkest prestige lighting

**Base mask prompt rules:**
- Chest-up, centered, facing ~3/4 or slight camera-left (pick ONE angle and keep ALL bases on that same angle)
- Neutral, still expression — masks do not emote
- No cowl, no halo ring, no mark/pin, no heavy adornment (those are separate layers)
- Simple bare neck/collar stub allowed so adornment can seat cleanly
- Transparent outside body OR solid on transparent canvas — but silhouette must align across all 18

### 4.3 Adornment (6) — `trait_type: "Adornment"`

| ID | Metadata value |
|---|---|
| `adorn-brass-halo` | Brass Halo |
| `adorn-oxblood-sash` | Oxblood Sash |
| `adorn-verdigris-clasp` | Verdigris Clasp |
| `adorn-ash-cowl` | Ash Cowl |
| `adorn-gold-tears` | Gold Tears |
| `adorn-seal-of-mending` | Seal of Mending |
| `adorn-none` | None *(or omit file; script handles None)* |

### 4.4 Mark (6) — `trait_type: "Mark"`

| ID | Metadata value |
|---|---|
| `mark-first-break` | First Break |
| `mark-gilded` | Gilded |
| `mark-twice-mended` | Twice-Mended |
| `mark-relic-born` | Relic-Born |
| `mark-hollow` | Hollow |
| `mark-unseamed` | Unseamed |
| `mark-none` | None |

### 4.5 Halo Ring (8) — `trait_type: "Halo Ring"`

Echoes the counter-rotating brass/verdigris rings around the hero sigil (`SigilCrest.tsx`).

| ID | Metadata value |
|---|---|
| `ring-brass-dashed` | Brass Dashed |
| `ring-verdigris-inner` | Verdigris Inner |
| `ring-gold-vein` | Gold Vein |
| `ring-oxblood-inlay` | Oxblood Inlay |
| `ring-ivory-plain` | Ivory Plain |
| `ring-seam-braid` | Seam Braid |
| `ring-ash-worn` | Ash Worn |
| `ring-solid-halo` | Solid Halo |
| `ring-none` | None |

### 4.6 Atmosphere / Frame (9) — `trait_type: "Atmosphere"`

| ID | Metadata value |
|---|---|
| `atm-gold-dust` | Gold Dust |
| `atm-soft-vignette` | Soft Vignette |
| `atm-grain` | Reliquary Grain |
| `atm-embers` | Foundry Embers |
| `atm-verdigris-haze` | Verdigris Haze |
| `atm-oxblood-falloff` | Oxblood Falloff |
| `atm-candle-bloom` | Candle Bloom |
| `atm-engraved-border` | Engraved Border |
| `atm-kiln-glow` | Kiln Glow |
| `atm-none` | None |

---

## 5. Master prompts for the image AI

### 5.1 Global positive prompt block (prepend to every generation)

```text
Ash & Gilt official reliquary portrait asset, photoreal cinematic kintsugi mending,
poured gold #C7972E, oxblood velvet #5C1A1B, verdigris patina #4A7C6F, gunmetal shadows #2E2A26,
ivory porcelain highlights #EFE7D2, high-craft materials, engraved fault filigree, chiaroscuro
Rembrandt lighting, 85mm portrait, sharp micro-detail on gold and porcelain, solemn prestige,
no modern clothing, matched framing for generative NFT layer compositing, centered chest-up
composition, consistent camera distance and head scale
```

### 5.2 Global negative prompt block (append always)

```text
cartoon, anime, chibi, cute, meme, sticker, plastic toy, low poly, oversmoothed skin,
neon cyberpunk, purple lighting, glowing eyes bloom, text watermark, logo watermark,
extra fingers, deformed hands, crooked halo, asymmetrical eyes, cropped ring tips,
different camera distance, full body, wide landscape, busy collage, white studio backdrop
unless requested, flat vector, comic outline, duplicate heads, modern sneakers, hoodie,
clockwork gears, crowns, royal court regalia
```

### 5.3 Background prompt template

```text
[GLOBAL POSITIVE],
full-bleed opaque background plate only, NO person, NO face, NO halo ring,
environment: {BACKGROUND_DESCRIPTION},
depth behind a future portrait subject, dark prestige atmosphere,
empty center composition safe for bust overlay, 2048x2048
```

### 5.4 Base mask prompt template

```text
[GLOBAL POSITIVE],
single reliquary bust only, grade visual gold coverage: {GRADE_RULES},
lineage identity: {LINEAGE_DESCRIPTION},
NO cowl, NO halo ring, NO mark pin, NO heavy adornment,
simple bare collar stub for later adornment seating,
transparent background outside the figure,
identical head scale and shoulder width to the style lock references,
solemn still expression, engraved fault topography subtle, 2048x2048 PNG alpha
```

### 5.5 Overlay trait prompt template (adornment / mark / ring / atmosphere)

```text
[GLOBAL POSITIVE],
isolated {TRAIT_OBJECT} for NFT layer compositing,
object only on transparent background, no person body unless partial neck/shoulder contact needed,
aligned to the same bust framing as Ash & Gilt bases,
materials match brass/oxblood/verdigris/gold language,
clean silhouette edges, no full-scene background, 2048x2048 PNG alpha
```

### 5.6 Style-lock instruction (Kontext / reference mode)

```text
Use portrait-01 through portrait-06 and hero-crest as style references.
Preserve material language, lighting direction, and craft density.
Vary face identity per lineage; do not clone one face across all bases.
Match head size and bust crop of the references.
```

---

## 6. Production workflow (phases)

### Phase A — Lock the system (Day 1)

**Deliverables:**
- [ ] Friend receives this roadmap + 7 reference images
- [ ] Choose AI stack (recommended: fal + FLUX Dev/Kontext + Recraft rembg)
- [ ] Generate **alignment slate**: 1 background + 1 base mask + 1 adornment + 1 halo ring
- [ ] Composite test manually in Photoshop/Figma/Python
- [ ] Approve head scale, neck seat, ring placement

**Exit criteria:** Four plates stack without sliding/mis-scale.

### Phase B — Generate all plates (Days 2–4)

Order of generation (do not randomize):

1. Backgrounds (10)
2. Base masks (18) — hardest; do these carefully
3. Adornment (6)
4. Mark (6)
5. Halo ring (8)
6. Atmosphere (9)

**Per plate checklist:**
- [ ] Correct filename
- [ ] 2048×2048
- [ ] Alpha clean (overlays)
- [ ] Palette on-brand
- [ ] No forbidden elements baked in
- [ ] Alignment vs slate within ~10px on major landmarks

**Budget control:** Draft on Schnell if needed, finalize on Dev/Pro. Expect ~1.3× generations for retries.

### Phase C — Cutout / cleanup (Day 4–5)

- [ ] Run background removal on any plate that isn't native transparent
- [ ] Manual cleanup on hairline gold edges, ring tips, cowl overlaps
- [ ] Delete rejects; keep only approved **55–70** (hard cap 70)
- [ ] Store originals + cleaned PNGs separately

### Phase D — Compositor build (Day 5–6)

Script responsibilities (Python / Node):

1. Load layers by folder order
2. Weighted random selection by rarity tables (below) — Grade weight comes from Base Mask selection
3. Enforce uniqueness via DNA hash of trait combo
4. Optional conflict rules (examples below)
5. Composite RGBA → RGB JPEG
6. Write metadata JSON
7. Zip LaunchMyNFT structure
8. **Hard stop at 222 tokens** (`0`–`221`) — never exceed max supply

### Phase E — Pilot mint pack (Day 6)

- [ ] Generate **50** NFTs first (pilot)
- [ ] Visual QA gallery
- [ ] Fix broken plates
- [ ] Then scale to **222 max**

### Phase F — Final delivery

- [ ] `ash_and_gilt_launch_input.zip` in LaunchMyNFT format (**exactly 222** images + 222 metadata files)
- [ ] Trait rarity report CSV
- [ ] Layer source pack zip (`layers/`)

---

## 7. Rarity & supply rules

### 7.1 Grade distribution (for **222 max** supply)

Shares match `GRADES` in `src/lib/content.ts`; counts are rounded to sum exactly to 222.

| Grade | Share | Count |
|---|---|---|
| Ashborn | 38% | 85 |
| Hairline | 27% | 60 |
| Seam | 18% | 40 |
| Lattice | 11% | 24 |
| Gilt-Wrought | 5% | 11 |
| Solid Gold | 1% | 2 |
| **Total** | 100% | **222** |

These counts are exact. Do not mint past token `#221`. Split each grade's count roughly evenly across the 3 lineages (e.g. Ashborn's 85 ≈ 28 / 28 / 29 per lineage).

### 7.2 Optional layer weights (script)

| Trait type | Chance of None |
|---|---|
| Adornment | 15% |
| Mark | 30% |
| Halo Ring | 40% |
| Atmosphere | 20% |

Background and Base Mask are always present (no None option).

### 7.3 Conflict / pairing rules (recommended)

- `Solid Gold` grade prefers `adorn-seal-of-mending` or `adorn-gold-tears` (≥60% of Solid Gold outputs)
- `Gilt-Wrought` prefers a Halo Ring present (None ≤ 20% for this grade)
- `mark-first-break` should skew heavily toward `Ashborn` grade (echoes the "#0021 — The First Break" showcase piece)
- `ring-solid-halo` only with Gilt-Wrought / Solid Gold
- Avoid stacking heavy Atmosphere + busy Background (pick one dominant)

---

## 8. LaunchMyNFT output specification (exact)

### 8.1 Folder structure

```text
ash_and_gilt_launch_input/
  images/
    0.jpeg
    1.jpeg
    2.jpeg
    ...
    221.jpeg
  metadata/
    0.json
    1.json
    2.json
    ...
    221.json
```

Zip root must contain `images/` and `metadata/` directly (same as `example_launch_input`).
**File count must be exactly 222 images + 222 metadata files.**

### 8.2 Image rules

- Filename: `{tokenId}.jpeg` (not `.jpg` if matching example; example uses `.jpeg`)
- Sequential from `0`
- RGB JPEG, quality ~85–92
- Square

### 8.3 Metadata schema

```json
{
  "name": "Ash & Gilt #<tokenId>",
  "symbol": "GILT",
  "description": "Ash & Gilt #<tokenId> — a reliquary mask broken once and mended in gold. Generated for LaunchMyNFT.",
  "attributes": [
    { "trait_type": "Background", "value": "Gilt Foundry" },
    { "trait_type": "Grade", "value": "Seam" },
    { "trait_type": "Lineage", "value": "Gilt-Cast" },
    { "trait_type": "Adornment", "value": "Verdigris Clasp" },
    { "trait_type": "Mark", "value": "Gilded" },
    { "trait_type": "Halo Ring", "value": "Brass Dashed" },
    { "trait_type": "Atmosphere", "value": "Soft Vignette" },
    {
      "trait_type": "Rarity Rank",
      "value": 118,
      "display_type": "number",
      "max_value": 222
    }
  ]
}
```

**Notes:**
- `Rarity Rank` `1` = rarest, `max_value` = **222** (collection size / max supply)
- Omit empty optional traits or set value to `"None"` — pick one convention and keep it consistent (recommend include `"None"` for marketplace clarity)
- `symbol` should be agreed (`GILT` recommended, matches `BRAND.token` = `$GILT`)
- Token IDs run `0` through `221` only

### 8.4 Example from reference zip (shape to match)

The example uses:

- `images/N.jpeg`
- `metadata/N.json`
- attributes array with `trait_type` / `value`
- rarity object with `display_type: "number"` and `max_value`

Your pack must follow that shape so LaunchMyNFT ingest works.

---

## 9. Source layer pack structure (for the friend to deliver)

Before compositing, deliver layers as:

```text
ash_and_gilt_layers/
  01-background/
    bg-ash-sanctum.png
    ...
  02-base-mask/
    base-ashborn-ashclay.png
    ...
  03-adornment/
  04-mark/
  05-halo-ring/
  06-atmosphere/
  REFERENCES/
    hero-crest.png
    portrait-01.png
    ...
    portrait-06.png
  MANIFEST.csv
```

### 9.1 MANIFEST.csv columns

```text
folder,filename,trait_type,trait_value,grade_gate,notes,approved
05-halo-ring,ring-solid-halo.png,Halo Ring,Solid Halo,gilt-wrought|solid-gold,ultra,yes
```

---

## 10. QA checklist (reject freely)

Reject a plate if any apply:

- [ ] Head/ring scale doesn't match slate
- [ ] Soft white halo / bad cutout fringe
- [ ] Wrong palette (purple neon, teal cyber, etc.)
- [ ] Extra baked traits that belong on another layer
- [ ] Text/watermarks
- [ ] Face identity accidentally duplicated across lineages
- [ ] Halo ring clipped by canvas edge
- [ ] Cowl/adornment that covers the entire face
- [ ] Transparent holes inside gold seam that look broken

Pilot gallery QA (50 images, then full 222):

- [ ] No identical DNA duplicates
- [ ] Grade distribution matches the 222 table (85/60/40/24/11/2)
- [ ] At least one of each halo ring appears across the full set
- [ ] Solid Gold looks distinctly top-tier (exactly 2)
- [ ] Marketplace metadata traits readable and consistent
- [ ] Token IDs stop at `221` — no overflow

---

## 11. Copy-paste brief for the image AI (give this verbatim)

```text
You are generating NFT trait LAYERS for "Ash & Gilt", a photoreal kintsugi reliquary
collection. Do NOT generate finished NFTs. Generate modular transparent plates that will be
composited later.

Style lock: match provided portrait-01..06 and hero-crest.
Palette: gold #C7972E, oxblood #5C1A1B, verdigris #4A7C6F, gunmetal #2E2A26, ivory #EFE7D2.
Canvas: 2048x2048 PNG. Overlays must have clean alpha. Backgrounds opaque.
Framing: centered chest-up reliquary portrait, identical head scale across all bases and rings.

Generate the trait lists exactly as specified in the Ash & Gilt Layer Roadmap
(Background 10, Base Mask 18, Adornment 6, Mark 6, Halo Ring 8, Atmosphere 9).
Max collection supply is 222. Use the filenames and metadata values exactly.

For each overlay: object isolated, no full scene, materials on-brand, aligned for stacking
above the base mask. For bases: no cowl/ring/mark; include subtle collar stub; encode grade
as visible gold coverage in the crack (Ashborn = none, Solid Gold = flawless). Avoid
cartoon/anime/neon/clockwork/crowns. Photoreal cinematic prestige only.
```

---

## 12. Roles & handoff

| Role | Owns |
|---|---|
| Project lead (you) | Lore, grades, **222 max supply**, LaunchMyNFT upload, final approve |
| Image AI friend | Generate + clean 55–70 layers per this doc |
| Engineer / script | Compositor, rarity, metadata, zip export (hard cap 222) |
| QA | Pilot 50 → full **222** visual spot checks |

### Handoff package to friend

1. This markdown file
2. `hero-crest.png` + `portrait-01.png` … `portrait-06.png`
3. Alignment slate approval after Phase A
4. Shared folder for uploads (`approved/`, `rejects/`)

### Handoff package from friend

1. `ash_and_gilt_layers/` with all approved PNGs
2. `MANIFEST.csv`
3. Notes on any naming deviations
4. 6–12 composite proof mocks (optional but ideal)

---

## 13. Success definition

The project is done when:

1. **≥55 approved layers** (target ~57; hard cap 70) exist in the folder structure above
2. A compositor can produce **exactly 222 unique** outputs (`0`–`221`)
3. Zip matches LaunchMyNFT example shape (`images/*.jpeg` + `metadata/*.json`)
4. Visual language clearly reads as **Ash & Gilt**, not generic kintsugi PFPs
5. Grade hierarchy is visible without reading metadata
6. Grade counts match the 222 distribution table (±0)

---

## 14. Optional stretch (after MVP)

- Add 2–3 "Founding Break" legendary multi-trait locked sets (echoes `mark-first-break`)
- 1/1 Solid Gold specials with unique halo rings not in the public pool
- Animated MP4 variants later (out of scope for launch-input JPEG pack)
- Trait rarity page for Magic Eden / Tensor

---

## 15. Quick cost reminder for the friend

| Item | Estimate |
|---|---|
| ~60 final plates on FLUX Dev (~$0.025) | ~$1.50 |
| Retries / Kontext style locks | ~$1.50–4 |
| Cutouts (Recraft rembg) | ~$1–2 |
| **Total AI** | **~$4–9** |
| Compositing **222** locally | $0 |

---

*Document version: 2.1 — Ash & Gilt layer roadmap for LaunchMyNFT delivery (**222 max supply**), superseding the earlier Cog & Crown draft.*
*Companion architecture inspiration: layered generative packs (Alfie-style), upgraded for photoreal kintsugi reliquary portraits.*
