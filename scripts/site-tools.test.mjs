import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { readImageDimensions, validateSite } from "./validate-site.mjs";
import { resolveRequestPath } from "./serve-site.mjs";

test("validator reports a broken internal fragment", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "galorent-validator-"));
  await mkdir(path.join(root, "assets"));
  await writeFile(path.join(root, "CNAME"), "galorent.com\n");
  await writeFile(path.join(root, ".nojekyll"), "");
  await writeFile(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\n");
  await writeFile(path.join(root, "assets", "site.css"), "body{}\n");
  await writeFile(path.join(root, "assets", "site.js"), "\n");
  await writeFile(path.join(root, "sitemap.xml"), "<loc>https://galorent.com/</loc>");
  await writeFile(path.join(root, "index.html"), `<!doctype html><html><head><title>Home</title><meta name="description" content="A description"><link rel="canonical" href="https://galorent.com/"><link rel="stylesheet" href="/assets/site.css"></head><body><h1>Home</h1><a href="#missing">Jump</a><script src="/assets/site.js"></script></body></html>`);

  const result = await validateSite(root, { expectedRoutes: ["/"] });

  assert.equal(result.ok, false);
  assert.match(result.errors.join("\n"), /missing fragment #missing/);
});

test("request resolver maps routes and rejects traversal", () => {
  assert.equal(resolveRequestPath("/spd/"), "spd/index.html");
  assert.equal(resolveRequestPath("/assets/site.css"), "assets/site.css");
  assert.equal(resolveRequestPath("/../secret.txt"), null);
  assert.equal(resolveRequestPath("/%2e%2e/secret.txt"), null);
});

test("image dimension reader rejects corrupt image assets", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "galorent-image-"));
  const filename = path.join(root, "broken.webp");
  await writeFile(filename, "not an image");
  await assert.rejects(readImageDimensions(filename), /unsupported or corrupt image/);
});
