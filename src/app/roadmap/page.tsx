import type { Metadata } from "next";
import RoadmapClient from "./RoadmapClient";

export const metadata: Metadata = {
  title: "Roadmap — The Great Mechanism",
  description:
    "Six Hours of the Great Mechanism: live status, receipts, and what's shipping now for Cog & Crown.",
};

export default function RoadmapPage() {
  return <RoadmapClient />;
}
