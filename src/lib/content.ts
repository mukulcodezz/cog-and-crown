export const BRAND = {
  name: "Cog & Crown",
  supply: 4096,
  minted: 3187,
  price: 1.9,
  status: "Court in Session",
} as const;

export type RankKey =
  | "baron"
  | "viscount"
  | "earl"
  | "marquess"
  | "duke"
  | "prince-regent";

export const COURT_RANKS: { key: RankKey; name: string; desc: string; tint: number }[] = [
  { key: "baron", name: "BARON", desc: "Newly invested; brass still bright, unweathered.", tint: 0 },
  { key: "viscount", name: "VISCOUNT", desc: "Has held a seat through one full Reign.", tint: 0.08 },
  { key: "earl", name: "EARL", desc: "Oversees a Track (Art/Tech/Community/IRL/Token) on the council.", tint: 0.16 },
  { key: "marquess", name: "MARQUESS", desc: "Warden of a hall; rarely seen outside session.", tint: 0.24 },
  { key: "duke", name: "DUKE", desc: "One of six, each bound to an Hour of the Mechanism.", tint: 0.3 },
  { key: "prince-regent", name: "PRINCE-REGENT", desc: "Holds no vote, only the key that winds the whole court.", tint: 0.38 },
];

export const rankByKey = (key: RankKey) => COURT_RANKS.find((r) => r.key === key)!;

// The 8 generated portraits, spanning junior -> senior rank grading.
// Reused across Home showcase, Gallery grid, and the Mint preview slot.
export const PORTRAITS: { id: string; src: string; rank: RankKey }[] = [
  { id: "portrait-01", src: "/images/portrait-01.png", rank: "baron" },
  { id: "portrait-02", src: "/images/portrait-02.png", rank: "viscount" },
  { id: "portrait-03", src: "/images/portrait-03.png", rank: "earl" },
  { id: "portrait-04", src: "/images/portrait-04.png", rank: "marquess" },
  { id: "portrait-05", src: "/images/portrait-05.png", rank: "duke" },
  { id: "portrait-06", src: "/images/portrait-06.png", rank: "prince-regent" },
  { id: "portrait-07", src: "/images/portrait-07.png", rank: "baron" },
  { id: "portrait-08", src: "/images/portrait-08.png", rank: "viscount" },
];

export const HERO_IMAGE = "/images/hero-crest.png";
export const MINT_PREVIEW_IMAGE = PORTRAITS[4].src; // duke portrait, reused

export const HOME_SHOWCASE = [
  { tokenId: "#0007", title: "The Clockwright's Heir", portrait: PORTRAITS[0] },
  { tokenId: "#0154", title: "Warden of the Ninth Gear", portrait: PORTRAITS[2] },
  { tokenId: "#0512", title: "Herald of the Brass Court", portrait: PORTRAITS[4] },
  { tokenId: "#1090", title: "Keeper of the Verdigris Seal", portrait: PORTRAITS[5] },
];

const TRAIT1_POOL = ["BRASS SEAL", "OXBLOOD SASH", "GEAR-EYE", "IVORY GLOVE", "VERDIGRIS PIN", "RIVETED CROWN"];
const TRAIT2_POOL = ["RARE", "FOUNDING WOUND", "GILDED", "COURT-BORN", "FIRST REIGN", "CLOCKWORK-TOUCHED"];

export const GALLERY_ITEMS = Array.from({ length: 12 }, (_, i) => {
  const rank = COURT_RANKS[i % COURT_RANKS.length];
  // First pass (i<6) uses the rank's primary portrait; second pass reuses the
  // secondary portrait sharing that rank tier where one exists (baron/viscount),
  // otherwise repeats the same portrait — matches the 10-image budget cap.
  const portrait =
    i < 6
      ? PORTRAITS.find((p) => p.rank === rank.key)!
      : PORTRAITS.slice().reverse().find((p) => p.rank === rank.key) ?? PORTRAITS.find((p) => p.rank === rank.key)!;
  return {
    id: "#" + String(1000 + i * 137).padStart(4, "0"),
    rank,
    portrait,
    trait1: TRAIT1_POOL[i % TRAIT1_POOL.length],
    trait2: TRAIT2_POOL[(i + 2) % TRAIT2_POOL.length],
  };
});

export const MINT_FAQS = [
  { q: "WHEN DOES THE COURT CLOSE?", a: "When all 4,096 seats are bound, or the Crown calls session — whichever comes first." },
  { q: "WHAT CHAIN?", a: "Solana. Mint directly or via Magic Eden / Tensor listings once live." },
  { q: "IS THERE A WHITELIST?", a: "The founding roll closed during the First Reign. Public investiture is open now." },
  { q: "WHAT DO I GET?", a: "A generative peerage, commercial rights, and a seat in the Great Mechanism staking protocol." },
  { q: "ARE THERE ROYALTIES?", a: "5% secondary royalty funds the treasury and future Hours — enforced where marketplaces honor it." },
  { q: "WHEN IS REVEAL?", a: "Peerages reveal at mint — no blind box, no delayed unveiling. What you bind is what you hold." },
];

export const WALLETS = ["PHANTOM", "MAGIC EDEN", "TENSOR"];

export type HourStatus = "sounded" | "descending" | "next" | "uncharted";
// key names kept generic (sounded/descending/next/uncharted) to mirror the
// original 4-state model; labels below render the Cog & Crown wording.

export const STATUS_META: Record<HourStatus, { label: string; color: string }> = {
  sounded: { label: "WOUND", color: "#C7972E" },
  descending: { label: "TICKING", color: "#4A7C6F" },
  next: { label: "NEXT HOUR", color: "#5C1A1B" },
  uncharted: { label: "UNCHARTED", color: "rgba(239,231,212,0.5)" },
};

export type Track = { track: string; text: string };

export type Hour = {
  id: string;
  num: string;
  codename: string;
  timeframe: string;
  status: HourStatus;
  pct: number;
  why: string;
  tracks: Track[];
};

export const HOURS: Hour[] = [
  {
    id: "first-wind",
    num: "01",
    codename: "Hour I — “First Wind”",
    timeframe: "Reign I",
    status: "sounded",
    pct: 100,
    why: "Where the court first gathered — the last hour with no gears turning yet.",
    tracks: [
      { track: "ART", text: "Genesis peerage art direction locked, 6 court-rank archetypes defined." },
      { track: "TECH", text: "Smart contract written and independently audited." },
      { track: "COMMUNITY", text: "Discord court opened, founding 1,000 admitted." },
      { track: "IRL", text: "First cast-brass seal revealed at a private gathering." },
      { track: "TOKEN", text: "$CROWN tokenomics drafted and shared with the court." },
    ],
  },
  {
    id: "the-turning",
    num: "02",
    codename: "Hour II — “The Turning”",
    timeframe: "Reign II",
    status: "sounded",
    pct: 100,
    why: "The first gear catches. Genesis mint sells out and the court starts being seen in public.",
    tracks: [
      { track: "ART", text: "Full 4,096-peerage reveal completed across all court ranks." },
      { track: "TECH", text: "Mainnet mint contract live; sold out in 9 minutes." },
      { track: "COMMUNITY", text: "Court crosses 4,096 members across Discord and X." },
      { track: "IRL", text: "First merch capsule (brass pins, wax-seal stamps) shipped." },
      { track: "TOKEN", text: "$CROWN claim portal opened for genesis holders." },
    ],
  },
  {
    id: "mainspring",
    num: "03",
    codename: "Hour III — “Mainspring”",
    timeframe: "Reign III",
    status: "descending",
    pct: 62,
    why: "The mainspring is wound but not released — this is the staking protocol that lets peerages keep earning after mint.",
    tracks: [
      { track: "ART", text: "Rare “founding wound” trait reveal rolling out to holders now." },
      { track: "TECH", text: "Great Mechanism staking ($CROWN yield by seat tenure) in closed beta." },
      { track: "COMMUNITY", text: "Weekly “council session” AMAs; court-voted lore chapters." },
      { track: "IRL", text: "Brass-merch pop-up confirmed for this cycle." },
      { track: "TOKEN", text: "$CROWN listed on a secondary DEX; treasury deployment begun." },
    ],
  },
  {
    id: "the-escapement",
    num: "04",
    codename: "Hour IV — “The Escapement”",
    timeframe: "Reign IV",
    status: "next",
    pct: 0,
    why: "The mechanism that lets one gear release without the whole court unwinding. Cross-collection peerage fusion and a second mint wave.",
    tracks: [
      { track: "ART", text: "Fusion mechanic — two peerages can be sworn together into a rarer third." },
      { track: "TECH", text: "On-chain “wind score” tracking cumulative staking + fusion history." },
      { track: "COMMUNITY", text: "Court council elected to steward lore canon." },
      { track: "IRL", text: "Cast-brass peerage objects for top wind scores." },
      { track: "TOKEN", text: "$CROWN governance vote on treasury allocation." },
    ],
  },
  {
    id: "the-chime",
    num: "05",
    codename: "Hour V — “The Chime”",
    timeframe: "Reign V",
    status: "uncharted",
    pct: 0,
    why: "No one has heard the fifth chime yet. The roadmap ends because the mechanism's maker never wrote a sixth page.",
    tracks: [
      { track: "ART", text: "Final peerage tier — unlisted by design, revealed only at the chime." },
      { track: "TECH", text: "Fully on-chain generative “wake event” — outcome unknown, even to us." },
      { track: "COMMUNITY", text: "Prince-Regent's Circle formed from the deepest-staked peerages." },
      { track: "IRL", text: "A single physical gathering, location disclosed 24 hours prior." },
      { track: "TOKEN", text: "Remaining treasury distributed to whoever still holds a seat." },
    ],
  },
  {
    id: "midnight-court",
    num: "06",
    codename: "Hour VI — “Midnight Court”",
    timeframe: "Reign VI",
    status: "uncharted",
    pct: 0,
    why: "The hour the clock face doesn't show. What the mechanism becomes once it stops needing a court to wind it.",
    tracks: [
      { track: "ART", text: "No brief exists for this tier yet — by design." },
      { track: "TECH", text: "Contract upgrade path reserved, not yet drafted." },
      { track: "COMMUNITY", text: "Succession vote on whether Midnight Court opens at all." },
      { track: "IRL", text: "TBD by the Prince-Regent's Circle." },
      { track: "TOKEN", text: "Final $CROWN emission schedule, pending Hour V outcome." },
    ],
  },
];

export const ROADMAP_METRICS = [
  { label: "HOLDERS", value: "3,142" },
  { label: "HOURS WOUND", value: "8 of 24" },
  { label: "FLOOR", value: "1.4 SOL" },
  { label: "TREASURY DEPLOYED", value: "58%" },
];

export const RECEIPTS = [
  { text: "Smart contract audited (Sec3)", date: "2025.10.18" },
  { text: "Genesis mint sold out in 9 minutes", date: "2025.12.02" },
  { text: "Listed on Magic Eden & Tensor", date: "2026.01.09" },
  { text: "Discord court crosses 4,096", date: "2026.02.20" },
  { text: "Great Mechanism staking ($CROWN) beta live", date: "2026.05.14" },
];

export const LORE_CHAPTERS = [
  {
    tag: "ORIGIN — I",
    title: "The First Wind",
    body: "Before there was a crown there was a mechanism, and before the mechanism there was the winding — a court that turned itself into being before it had a ruler to answer to. No founder is named in the earliest ledgers. Only a date, a wound spring, and a single gear that has not stopped since.",
  },
  {
    tag: "THE MECHANISM — II",
    title: "No Hand Turns It But Ours",
    body: "We call it an empire because empires need a face, but the mechanism has never had one. It has gears, and hours, and a court that winds it in shifts so it never fully stops. To ask who rules the mechanism is to misunderstand it — the mechanism is the rule.",
  },
  {
    tag: "THE COURT — III",
    title: "Six Reigns, One Face",
    body: "The clock has twelve numbers but the court answers to six — six Hours, six Reigns, six Dukes each bound to a gear they did not choose and cannot abandon. When an Hour turns, so does the court beneath it. Nothing in the Mechanism moves alone.",
  },
  {
    tag: "THE PEERAGE — IV",
    title: "A Title Cast, Not Given",
    body: "A peerage is not a portrait of a courtier. It is the title itself, struck once in brass and never restruck — the exact configuration of gear and seal a soul carried at investiture. To hold a peerage is to hold a title no one else will ever be handed again.",
  },
];

export const PARTNERS = [
  { tag: "MINT INFRASTRUCTURE", name: "Solana", desc: "The chain the court is cast on. Fast, cheap, and precise enough for a mechanism this small to keep time on." },
  { tag: "LAUNCHPAD", name: "LaunchMyNFT", desc: "Handled the genesis mint — fair-launch tooling, allowlist gating, and reveal mechanics." },
  { tag: "WALLET", name: "Phantom", desc: "The primary vessel for court members connecting to the investiture." },
  { tag: "MARKETPLACE", name: "Magic Eden", desc: "Secondary listings and the collection's verified storefront on the surface." },
  { tag: "MARKETPLACE", name: "Tensor", desc: "Trait-level liquidity and sweep tooling for the deeper-cycle collectors." },
];
