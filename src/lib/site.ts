import type { Metadata } from "next";

export const SITE_NAME = "Ash & Gilt";
export const SITE_DESCRIPTION =
  "222 masks broken once and mended in gold. A kintsugi order on Solana.";

export function getSiteOrigin(value = process.env.NEXT_PUBLIC_SITE_URL): URL | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || url.hostname.endsWith('.example')) return null;
    return new URL(url.origin);
  } catch {
    return null;
  }
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  image: `/images/${string}`;
  origin?: URL | null;
};

export function createPageMetadata({
  title,
  description,
  path,
  image,
  origin = getSiteOrigin(),
}: PageMetadataInput): Metadata {
  const url = origin ? new URL(path, origin) : null;
  return {
    title,
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: {
      title: `${title} · ${SITE_NAME}`,
      description,
      type: "website",
      ...(url ? { url } : {}),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE_NAME}`,
      description,
      images: [image],
    },
  };
}
