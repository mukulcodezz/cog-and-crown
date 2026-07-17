import MintClient from "./MintClient";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({ title: "Mint", description: "Pour your seam. 222 masks mended in gold, 0.8 SOL, live on Solana.", path: "/mint", image: "/images/og-mint.jpg" });

export default function MintPage() {
  return <MintClient />;
}
