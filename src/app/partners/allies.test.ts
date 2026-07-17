import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { ALLIES } from "../../lib/content.ts";

const pageSource = readFileSync(new URL("./page.tsx", import.meta.url), "utf8");
const navSource = readFileSync(new URL("../../components/Nav.tsx", import.meta.url), "utf8");

test("allies expose five unique official HTTPS destinations", () => {
  assert.equal(ALLIES.length, 5);
  assert.equal(new Set(ALLIES.map((ally) => ally.href)).size, 5);
  for (const ally of ALLIES) {
    assert.match(ally.href, /^https:\/\//);
    assert.ok(ally.action.length > 0);
  }
});

test("the partners route is presented consistently as Allies", () => {
  assert.match(pageSource, /title: "Allies"/);
  assert.match(pageSource, /path: "\/partners"/);
  assert.match(navSource, /href: "\/partners", label: "Allies"/);
});

test("ally cards use safe, accessible external links", () => {
  assert.match(pageSource, /target="_blank"/);
  assert.match(pageSource, /rel="noreferrer"/);
  assert.match(pageSource, /aria-label=/);
});
