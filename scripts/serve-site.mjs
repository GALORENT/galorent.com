import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TYPES = new Map([
  [".css", "text/css; charset=utf-8"], [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"], [".js", "text/javascript; charset=utf-8"],
  [".jpg", "image/jpeg"], [".jpeg", "image/jpeg"], [".png", "image/png"],
  [".svg", "image/svg+xml"], [".webp", "image/webp"], [".xml", "application/xml; charset=utf-8"]
]);

export function resolveRequestPath(rawUrl) {
  let decoded;
  try { decoded = decodeURIComponent(rawUrl.split(/[?#]/, 1)[0]); } catch { return null; }
  const segments = decoded.replace(/\\/g, "/").split("/");
  if (segments.includes("..") || decoded.includes("\0")) return null;
  const clean = path.posix.normalize(decoded).replace(/^\/+/, "");
  if (decoded.endsWith("/") || clean === "") return `${clean}index.html`;
  return clean;
}

export function contentTypeFor(filename) {
  return TYPES.get(path.extname(filename).toLowerCase()) ?? "application/octet-stream";
}

async function sendFile(response, filename, status = 200) {
  const info = await stat(filename);
  response.writeHead(status, { "Content-Type": contentTypeFor(filename), "Content-Length": info.size, "Cache-Control": "no-store" });
  createReadStream(filename).pipe(response);
}

export function createSiteServer(root) {
  const absoluteRoot = path.resolve(root);
  return createServer(async (request, response) => {
    const relative = resolveRequestPath(request.url ?? "/");
    if (relative !== null) {
      const filename = path.resolve(absoluteRoot, relative);
      if (filename.startsWith(`${absoluteRoot}${path.sep}`) || filename === absoluteRoot) {
        try { await access(filename); await sendFile(response, filename); return; } catch { /* custom 404 below */ }
      }
    }
    try { await sendFile(response, path.join(absoluteRoot, "404.html"), 404); }
    catch { response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }); response.end("Not found"); }
  });
}

function parsePort(argv) {
  const index = argv.indexOf("--port");
  if (index === -1) return 4173;
  const port = Number(argv[index + 1]);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("--port must be an integer from 1 to 65535");
  return port;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const port = parsePort(process.argv.slice(2));
  createSiteServer(root).listen(port, "127.0.0.1", () => console.log(`GALORENT preview: http://127.0.0.1:${port}`));
}
