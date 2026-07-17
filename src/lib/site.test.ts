import assert from "node:assert/strict";
import test from "node:test";
import { createPageMetadata, getSiteOrigin } from "./site.ts";

test("getSiteOrigin accepts configured http origins", () => {
  assert.equal(getSiteOrigin("https://ash-and-gilt.test/path").href, "https://ash-and-gilt.test/");
});

test("getSiteOrigin rejects missing, invalid, and reserved example origins", () => {
  assert.equal(getSiteOrigin(), null);
  assert.equal(getSiteOrigin("not a url"), null);
  assert.equal(getSiteOrigin("ftp://ash-and-gilt.test"), null);
  assert.equal(getSiteOrigin("https://ashandgilt.example"), null);
});

test("createPageMetadata emits relative social images without inventing an origin", () => {
  const metadata = createPageMetadata({
    title: "Gallery",
    description: "Representative grade studies.",
    path: "/gallery",
    image: "/images/og-home.jpg",
    origin: null,
  });

  assert.equal(metadata.alternates, undefined);
  assert.deepEqual(metadata.openGraph?.images, ["/images/og-home.jpg"]);
});

test("createPageMetadata emits self-referencing URLs with a configured origin", () => {
  const origin = new URL("https://ash-and-gilt.test");
  const metadata = createPageMetadata({
    title: "Allies",
    description: "Public references for a fictional concept.",
    path: "/partners",
    image: "/images/og-home.jpg",
    origin,
  });

  assert.equal(metadata.alternates?.canonical?.toString(), "https://ash-and-gilt.test/partners");
  assert.equal(metadata.openGraph?.url?.toString(), "https://ash-and-gilt.test/partners");
});
