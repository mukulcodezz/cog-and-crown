import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  if (!origin) return [];
  return ["/", "/mint", "/roadmap", "/gallery", "/lore", "/partners"].map((path) => ({
    url: new URL(path, origin).href,
  }));
}
