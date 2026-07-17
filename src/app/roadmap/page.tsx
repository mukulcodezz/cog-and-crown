import RoadmapClient from "./RoadmapClient";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({ title: "The Mending", description: "Six seams, poured in order. Walk the 3D procession — live status, receipts, and what's pouring now.", path: "/roadmap", image: "/images/og-roadmap.jpg" });

export default function RoadmapPage() {
  return <RoadmapClient />;
}
