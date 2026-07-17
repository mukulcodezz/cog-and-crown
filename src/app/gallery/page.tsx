import ReliquaryClient from "./ReliquaryClient";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({ title: "The Reliquary", description: "222 masks, six grades — browse the Order's reliquary wall.", path: "/gallery", image: "/images/og-home.jpg" });

export default function GalleryPage() {
  return <ReliquaryClient />;
}
