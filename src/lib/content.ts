export const BRAND = {
  name: "Ash & Gilt",
  wordmark: "ASH & GILT",
  token: "$GILT",
  chain: "Solana",
  supply: 222,
  minted: 152,
  price: 0.8,
  status: "The Mending Is Open",
  tagline: "Nothing whole is holy.",
} as const;

export type GradeKey =
  | "ashborn"
  | "hairline"
  | "seam"
  | "lattice"
  | "gilt-wrought"
  | "solid-gold";

// gild = fraction of the mask healed in gold (drives the brass-sheen overlay).
// share = rough % of the collection at this grade (rarity, senior = scarcer).
export const GRADES: {
  key: GradeKey;
  name: string;
  desc: string;
  gild: number;
  share: string;
}[] = [
  { key: "ashborn", name: "ASHBORN", desc: "Newly broken. Bare porcelain, not one seam poured yet.", gild: 0, share: "38%" },
  { key: "hairline", name: "HAIRLINE", desc: "The first gold traces a crack. The mending has begun.", gild: 0.15, share: "27%" },
  { key: "seam", name: "SEAM", desc: "A single bold seam of gold crosses the face.", gild: 0.35, share: "18%" },
  { key: "lattice", name: "LATTICE", desc: "A whole lattice of veins — more gold than fault now.", gild: 0.6, share: "11%" },
  { key: "gilt-wrought", name: "GILT-WROUGHT", desc: "Almost wholly gold, only shards of white remain.", gild: 0.85, share: "5%" },
  { key: "solid-gold", name: "SOLID GOLD", desc: "The Unbroken. A flawless gold face — the mending complete.", gild: 1, share: "1%" },
];

export const gradeByKey = (key: GradeKey) => GRADES.find((g) => g.key === key)!;

// The 6 generated reliquary portraits, one per grade, junior -> senior.
export const RELIQUARIES: { id: string; src: string; grade: GradeKey }[] = [
  { id: "portrait-01", src: "/images/portrait-01.webp", grade: "ashborn" },
  { id: "portrait-02", src: "/images/portrait-02.webp", grade: "hairline" },
  { id: "portrait-03", src: "/images/portrait-03.webp", grade: "seam" },
  { id: "portrait-04", src: "/images/portrait-04.webp", grade: "lattice" },
  { id: "portrait-05", src: "/images/portrait-05.webp", grade: "gilt-wrought" },
  { id: "portrait-06", src: "/images/portrait-06.webp", grade: "solid-gold" },
];

export const reliquaryByGrade = (grade: GradeKey) =>
  RELIQUARIES.find((r) => r.grade === grade)!;

export const HERO_IMAGE = "/images/hero-crest.webp";
export const BANNER_HOME = "/images/banner-home.webp";
export const BANNER_ROADMAP = "/images/banner-roadmap.webp";
export const BANNER_MINT = "/images/banner-mint.webp";
export const MINT_PREVIEW_IMAGE = RELIQUARIES[4].src; // gilt-wrought

export const HOME_SHOWCASE = [
  { tokenId: "#0021", title: "The First Break", reliquary: RELIQUARIES[0] },
  { tokenId: "#0640", title: "One Seam Poured", reliquary: RELIQUARIES[2] },
  { tokenId: "#1777", title: "Wrought in Gold", reliquary: RELIQUARIES[4] },
  { tokenId: "#0222", title: "The Unbroken", reliquary: RELIQUARIES[5] },
];

const TRAIT1_POOL = ["BRASS HALO", "OXBLOOD SASH", "VERDIGRIS CLASP", "ASH COWL", "GOLD TEARS", "SEAL OF MENDING"];
const TRAIT2_POOL = ["FIRST BREAK", "GILDED", "TWICE-MENDED", "RELIC-BORN", "HOLLOW", "UNSEAMED"];

export const GALLERY_ITEMS = Array.from({ length: 12 }, (_, i) => {
  const grade = GRADES[i % GRADES.length];
  const reliquary = reliquaryByGrade(grade.key);
  return {
    id: "#" + String(64 + i * 613).padStart(4, "0"),
    grade,
    reliquary,
    trait1: TRAIT1_POOL[i % TRAIT1_POOL.length],
    trait2: TRAIT2_POOL[(i + 2) % TRAIT2_POOL.length],
  };
});

export const MINT_FAQS = [
  { q: "WHAT IS A RELIQUARY?", a: "One of 222 generative masks. Each is a face broken once and mended in gold — no two seams poured the same way." },
  { q: "WHAT CHAIN?", a: "Solana. Mend directly here, or through Magic Eden / Tensor once the vault opens on secondary." },
  { q: "IS THERE AN ALLOWLIST?", a: "The First Break allowlist has closed. Public mending is open now, while gold remains." },
  { q: "WHAT DO I HOLD?", a: "A Reliquary, full commercial rights to your mask, and a seat in the Kintsugi Protocol staking vault." },
  { q: "WHAT IS $GILT?", a: "The gold you pour. Staked Reliquaries earn $GILT by tenure; deeper mending, richer seams." },
  { q: "WHEN DOES IT REVEAL?", a: "At mend. No blind box — the gold is poured the instant you claim. What you break is what you hold." },
];

export const WALLETS = ["PHANTOM", "BACKPACK", "SOLFLARE"];

export type SeamStatus = "sealed" | "mending" | "fractured" | "ungilt";

export const STATUS_META: Record<SeamStatus, { label: string; color: string }> = {
  sealed: { label: "SEALED", color: "#C7972E" },
  mending: { label: "MENDING", color: "#4A7C6F" },
  fractured: { label: "FRACTURED", color: "#5C1A1B" },
  ungilt: { label: "UNGILT", color: "rgba(239,231,212,0.5)" },
};

export type Track = { track: string; text: string };

export type Seam = {
  id: string;
  num: string;
  codename: string;
  timeframe: string;
  status: SeamStatus;
  pct: number;
  why: string;
  tracks: Track[];
};

export const SEAMS: Seam[] = [
  {
    id: "the-break",
    num: "I",
    codename: "Seam I — “The Break”",
    timeframe: "Poured",
    status: "sealed",
    pct: 100,
    why: "Every reliquary starts as a broken thing. This is the fracture — before a single drop of gold was poured.",
    tracks: [
      { track: "ART", text: "Kintsugi art direction locked; 6 grades of mending defined." },
      { track: "TECH", text: "Mint contract written and independently audited." },
      { track: "COMMUNITY", text: "The Order opened; founding 1,000 broken in." },
      { track: "IRL", text: "First hand-poured gold-seam mask cast for the vault." },
      { track: "TOKEN", text: "$GILT tokenomics drafted and shared with the Order." },
    ],
  },
  {
    id: "first-gold",
    num: "II",
    codename: "Seam II — “First Gold”",
    timeframe: "Poured",
    status: "sealed",
    pct: 100,
    why: "The first gold hits the crack. Genesis mend sells out and the masks are seen in daylight.",
    tracks: [
      { track: "ART", text: "Full 222-reliquary reveal across all six grades." },
      { track: "TECH", text: "Mainnet mend live; sold out in 11 minutes." },
      { track: "COMMUNITY", text: "The Order crosses 222 across Discord and X." },
      { track: "IRL", text: "First relic capsule (brass seals, gold-leaf kits) shipped." },
      { track: "TOKEN", text: "$GILT claim portal opened for genesis menders." },
    ],
  },
  {
    id: "kintsugi-protocol",
    num: "III",
    codename: "Seam III — “The Kintsugi Protocol”",
    timeframe: "Pouring now",
    status: "mending",
    pct: 55,
    why: "The staking vault. Lock a reliquary and it keeps mending — pouring $GILT by the length of its seam.",
    tracks: [
      { track: "ART", text: "Rare “gold-tears” trait rolling out to staked holders now." },
      { track: "TECH", text: "Kintsugi Protocol ($GILT yield by tenure) in open beta." },
      { track: "COMMUNITY", text: "Weekly “pouring” calls; Order-voted scripture chapters." },
      { track: "IRL", text: "Hand-gilded relic pop-up confirmed this cycle." },
      { track: "TOKEN", text: "$GILT listed on a secondary DEX; treasury deploying." },
    ],
  },
  {
    id: "reliquary-vault",
    num: "IV",
    codename: "Seam IV — “The Reliquary Vault”",
    timeframe: "Next",
    status: "fractured",
    pct: 0,
    why: "Two broken masks can be poured into one rarer whole. Fusion, plus a second mend wave.",
    tracks: [
      { track: "ART", text: "Fusion — two reliquaries fused into a single higher grade." },
      { track: "TECH", text: "On-chain “gild score” tracking cumulative staking + fusion." },
      { track: "COMMUNITY", text: "The Order elects wardens to steward the scripture." },
      { track: "IRL", text: "Cast-gold relic objects for the highest gild scores." },
      { track: "TOKEN", text: "$GILT governance vote on treasury allocation." },
    ],
  },
  {
    id: "the-gilding",
    num: "V",
    codename: "Seam V — “The Gilding”",
    timeframe: "Ungilt",
    status: "ungilt",
    pct: 0,
    why: "No one has watched the fifth pour. The final grade is unlisted by design — revealed only at the gilding.",
    tracks: [
      { track: "ART", text: "Final SOLID GOLD tier — hidden until the gilding lands." },
      { track: "TECH", text: "Fully on-chain generative “pour event” — outcome unknown." },
      { track: "COMMUNITY", text: "The Unbroken Circle forms from the deepest-staked masks." },
      { track: "IRL", text: "A single gathering, location disclosed 24 hours prior." },
      { track: "TOKEN", text: "Remaining treasury poured to whoever still holds a seam." },
    ],
  },
  {
    id: "the-unbroken",
    num: "VI",
    codename: "Seam VI — “The Unbroken”",
    timeframe: "Ungilt",
    status: "ungilt",
    pct: 0,
    why: "What a mask becomes once it no longer remembers the break. The page the maker never wrote.",
    tracks: [
      { track: "ART", text: "No brief exists for this grade yet — by design." },
      { track: "TECH", text: "Contract upgrade path reserved, not yet drafted." },
      { track: "COMMUNITY", text: "Succession vote on whether the Unbroken opens at all." },
      { track: "IRL", text: "TBD by the Unbroken Circle." },
      { track: "TOKEN", text: "Final $GILT emission schedule, pending Seam V." },
    ],
  },
];

export const ROADMAP_METRICS = [
  { label: "MENDERS", value: "6,204" },
  { label: "GOLD POURED", value: "43%" },
  { label: "FLOOR", value: "1.1 SOL" },
  { label: "TREASURY DEPLOYED", value: "51%" },
];

export const RECEIPTS = [
  { text: "Mint contract audited (Sec3)", date: "2025.10.22" },
  { text: "Genesis mend sold out in 11 minutes", date: "2025.12.06" },
  { text: "Listed on Magic Eden & Tensor", date: "2026.01.14" },
  { text: "The Order crosses 222", date: "2026.02.27" },
  { text: "Kintsugi Protocol ($GILT) beta live", date: "2026.05.19" },
];

export const SCRIPTURE = [
  {
    tag: "THE BREAK — I",
    title: "Nothing Whole Is Holy",
    body: "The Order keeps no unbroken thing. What arrives whole is struck once, deliberately, so that it can be mended — for only a healed thing is worth the gold. No founder is named in the oldest ledgers. Only a date, a shattered mask, and the first thin seam of gold that has not dulled since.",
  },
  {
    tag: "THE GOLD — II",
    title: "We Do Not Hide the Fault",
    body: "Other houses fill their cracks with lacquer the colour of the clay, to pretend nothing ever broke. We pour gold. The seam is the point. To mend in gold is to say: here is where I failed, and here is what I became worth because of it.",
  },
  {
    tag: "THE ORDER — III",
    title: "Six Grades, One Pour",
    body: "A mask does not choose its grade; the break decides it. Ashborn carries no gold, only the promise of it. The Unbroken carries nothing but. Between them run four seams of becoming, and every mender walks them in the only direction gold flows — downward, into the fault, filling it.",
  },
  {
    tag: "THE RELIQUARY — IV",
    title: "A Face Struck Once",
    body: "A reliquary is not a portrait of a person. It is the exact map of a single break, poured in gold and never poured again. To hold one is to hold a fault line no other soul will ever be handed — and the proof that it was worth mending.",
  },
];

export const ALLIES = [
  {
    tag: "MINT INFRASTRUCTURE",
    name: "Solana",
    desc: "The chain the Order is cast on. Fast and cheap enough to pour a seam without watching the fee.",
    href: "https://solana.com/",
    action: "Visit Solana",
  },
  {
    tag: "LAUNCHPAD",
    name: "LaunchMyNFT",
    desc: "Ran the genesis mend — fair-launch tooling, allowlist gating, reveal-at-mend mechanics.",
    href: "https://launchmynft.io/",
    action: "Visit LaunchMyNFT",
  },
  {
    tag: "WALLET",
    name: "Phantom",
    desc: "The primary vessel menders carry when they connect to the pour.",
    href: "https://www.phantom.com/",
    action: "Visit Phantom",
  },
  {
    tag: "MARKETPLACE",
    name: "Magic Eden",
    desc: "Secondary listings and the Order's verified storefront on the surface.",
    href: "https://magiceden.io/",
    action: "Visit Magic Eden",
  },
  {
    tag: "MARKETPLACE",
    name: "Tensor",
    desc: "Trait-level liquidity and sweep tooling for collectors who read the seams.",
    href: "https://www.tensor.trade/",
    action: "Visit Tensor",
  },
];
