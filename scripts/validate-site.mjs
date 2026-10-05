import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const EXPECTED_ROUTES = [
  "/", "/spd/", "/spd/how-it-works/", "/spd/scenes/",
  "/spd/compatibility/", "/spd/editions/", "/spd/free/", "/spd/pro/",
  "/spd/service/", "/spd/corporate/", "/spd/laboratory/", "/hardware/",
  "/store/", "/support/", "/account/", "/company/", "/company/updates/"
];

export const SCENE_ASSETS = [
  "galorent-minimal.webp", "phosphor-performance.webp", "reactor.webp", "apex.webp", "mainframe.webp",
  "foundry.webp", "datastream.webp", "orbital.webp", "lab-instrument.webp", "command.webp", "neural.webp"
];

export function routeToFile(route) {
  return route === "/" ? "index.html" : `${route.replace(/^\//, "")}index.html`;
}

function values(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => match[1]);
}

function stripMarkup(value) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

async function exists(file) {
  try { await access(file); return true; } catch { return false; }
}

export async function readImageDimensions(filename) {
  const data = await readFile(filename);
  if (data.length >= 24 && data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
  }
  if (data.length >= 30 && data.toString("ascii", 0, 4) === "RIFF" && data.toString("ascii", 8, 12) === "WEBP") {
    const type = data.toString("ascii", 12, 16);
    if (type === "VP8X") return { width: 1 + data.readUIntLE(24, 3), height: 1 + data.readUIntLE(27, 3) };
    if (type === "VP8 " && data.length >= 30) return { width: data.readUInt16LE(26) & 0x3fff, height: data.readUInt16LE(28) & 0x3fff };
    if (type === "VP8L" && data.length >= 25 && data[20] === 0x2f) {
      return { width: 1 + data[21] + ((data[22] & 0x3f) << 8), height: 1 + (data[22] >> 6) + (data[23] << 2) + ((data[24] & 0x0f) << 10) };
    }
  }
  if (data.length >= 4 && data[0] === 0xff && data[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < data.length) {
      if (data[offset] !== 0xff) { offset += 1; continue; }
      const marker = data[offset + 1];
      const size = data.readUInt16BE(offset + 2);
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
        return { width: data.readUInt16BE(offset + 7), height: data.readUInt16BE(offset + 5) };
      }
      if (size < 2) break;
      offset += size + 2;
    }
  }
  throw new Error(`unsupported or corrupt image: ${filename}`);
}

function localTarget(value) {
  if (!value || /^(?:[a-z]+:|\/\/|data:|mailto:|tel:)/i.test(value)) return null;
  return value.split(/[?#]/, 1)[0];
}

export async function validateSite(root, options = {}) {
  const expectedRoutes = options.expectedRoutes ?? EXPECTED_ROUTES;
  const errors = [];
  const warnings = [];
  const provenanceFile = path.join(root, "assets", "images", "ASSET_PROVENANCE.md");
  if (await exists(provenanceFile)) {
    const provenance = await readFile(provenanceFile, "utf8");
    for (const scene of SCENE_ASSETS) {
      const count = provenance.split(`scenes/${scene}`).length - 1;
      if (count !== 1) errors.push(`Scene provenance must name scenes/${scene} exactly once; found ${count}`);
      const filename = path.join(root, "assets", "images", "scenes", scene);
      if (!(await exists(filename))) { errors.push(`missing Scene asset ${scene}`); continue; }
      try {
        const dimensions = await readImageDimensions(filename);
        if (!(dimensions.width > 0) || !(dimensions.height > 0)) errors.push(`Scene asset ${scene} has invalid dimensions`);
      } catch (error) { errors.push(error.message); }
    }
  }
  const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
  const sitemapRoutes = values(sitemap, /<loc>https:\/\/galorent\.com([^<]*)<\/loc>/gi).map((route) => route || "/");
  if (JSON.stringify(sitemapRoutes) !== JSON.stringify(expectedRoutes)) {
    errors.push(`sitemap routes differ: expected ${expectedRoutes.join(", ")}; received ${sitemapRoutes.join(", ")}`);
  }

  for (const required of ["CNAME", ".nojekyll", "robots.txt", "sitemap.xml"]) {
    if (!(await exists(path.join(root, required)))) errors.push(`missing deployment file ${required}`);
  }
  if ((await readFile(path.join(root, "CNAME"), "utf8")).trim() !== "galorent.com") {
    errors.push("CNAME must equal galorent.com");
  }

  const pages = new Map();
  for (const route of expectedRoutes) {
    const filename = path.join(root, routeToFile(route));
    if (!(await exists(filename))) { errors.push(`${route}: missing ${routeToFile(route)}`); continue; }
    pages.set(route, await readFile(filename, "utf8"));
  }

  const titles = new Map();
  const descriptions = new Map();
  let linkCount = 0;
  let assetCount = 0;
  let imageCount = 0;
  for (const [route, html] of pages) {
    const title = stripMarkup(values(html, /<title[^>]*>([\s\S]*?)<\/title>/gi)[0] ?? "");
    const description = (html.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i)?.[1]
      ?? html.match(/<meta\s+[^>]*content=["']([^"']+)["'][^>]*name=["']description["'][^>]*>/i)?.[1] ?? "").trim();
    const canonical = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1]
      ?? html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i)?.[1];
    if (!title) errors.push(`${route}: missing non-empty title`);
    if (!description) errors.push(`${route}: missing non-empty description`);
    if (title && titles.has(title)) errors.push(`${route}: duplicate title also used by ${titles.get(title)}`); else if (title) titles.set(title, route);
    if (description && descriptions.has(description)) errors.push(`${route}: duplicate description also used by ${descriptions.get(description)}`); else if (description) descriptions.set(description, route);
    if (canonical !== `https://galorent.com${route}`) errors.push(`${route}: canonical must be https://galorent.com${route}`);
    const headings = values(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi);
    if (headings.length !== 1) errors.push(`${route}: expected one h1, found ${headings.length}`);
    const ids = values(html, /\sid=["']([^"']+)["']/gi);
    const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    if (duplicateIds.length) errors.push(`${route}: duplicate ids ${duplicateIds.join(", ")}`);

    for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
      imageCount += 1;
      const src = tag.match(/\ssrc=["']([^"']+)["']/i)?.[1] ?? "";
      const alt = tag.match(/\salt=["']([^"']*)["']/i)?.[1]?.trim() ?? "";
      const width = Number(tag.match(/\swidth=["']([0-9]+)["']/i)?.[1]);
      const height = Number(tag.match(/\sheight=["']([0-9]+)["']/i)?.[1]);
      if (src.startsWith("data:image")) errors.push(`${route}: embedded data:image source is not permitted`);
      if (!alt) errors.push(`${route}: image requires non-empty alt text`);
      if (!(width > 0) || !(height > 0)) errors.push(`${route}: image requires positive width and height`);
    }

    for (const href of values(html, /\shref=["']([^"']+)["']/gi)) {
      linkCount += 1;
      if (href.startsWith("#")) {
        const id = decodeURIComponent(href.slice(1));
        if (id && !ids.includes(id)) errors.push(`${route}: missing fragment #${id}`);
        continue;
      }
      if (!href.startsWith("/")) continue;
      const parsed = new URL(href, "https://galorent.com");
      const targetRoute = parsed.pathname.endsWith("/") ? parsed.pathname : null;
      if (targetRoute && !expectedRoutes.includes(targetRoute)) errors.push(`${route}: missing internal route ${targetRoute}`);
      if (parsed.hash && targetRoute && pages.has(targetRoute)) {
        const targetIds = values(pages.get(targetRoute), /\sid=["']([^"']+)["']/gi);
        const id = decodeURIComponent(parsed.hash.slice(1));
        if (id && !targetIds.includes(id)) errors.push(`${route}: missing fragment ${parsed.hash} in ${targetRoute}`);
      }
    }

    for (const ref of [...values(html, /\ssrc=["']([^"']+)["']/gi), ...values(html, /<link\s+[^>]*href=["']([^"']+)["'][^>]*>/gi)]) {
      const target = localTarget(ref);
      if (!target) continue;
      assetCount += 1;
      const relative = target.startsWith("/") ? target.slice(1) : path.posix.normalize(path.posix.join(route, target)).replace(/^\//, "");
      if (!(await exists(path.join(root, relative)))) errors.push(`${route}: missing local asset ${ref}`);
    }
  }

  return { ok: errors.length === 0, errors, warnings, counts: { routes: pages.size, metadata: titles.size, links: linkCount, assets: assetCount, images: imageCount } };
}

async function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const result = await validateSite(root);
  if (!result.ok) {
    console.error(`FAIL — ${result.errors.length} site validation error(s)`);
    for (const error of result.errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log(`PASS — ${result.counts.routes} routes, ${result.counts.metadata} metadata sets, ${result.counts.links} links, ${result.counts.assets} local asset references`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
