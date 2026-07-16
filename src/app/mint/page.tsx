import type { Metadata } from "next";
import MintClient from "./MintClient";

export const metadata: Metadata = {
  title: "Mint",
  description:
    "Bind your title to the Crown. 4,096 peerages, 1.9 SOL, live on Solana mainnet.",
};

export default function MintPage() {
  return <MintClient />;
}
