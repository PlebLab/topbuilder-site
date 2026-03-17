import { mkdir, writeFile, rm, copyFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const ORIGIN = "https://www.topbuilder.dev/";
const OUT_DIR = path.resolve("public/topbuilder-exact");
const ASSET_DIR = path.join(OUT_DIR, "assets");

const ALLOWED_HOSTS = new Set([
  "www.topbuilder.dev",
  "topbuilder.dev",
  "framerusercontent.com",
  "fonts.gstatic.com",
  "www.googletagmanager.com",
  "events.framer.com",
]);

const TEXT_EXTENSIONS = new Set([".html", ".js", ".mjs", ".css", ".json", ".svg", ".txt"]);

function hashName(input) {
  return crypto.createHash("sha256").update(input).digest("hex").slice(0, 24);
}

function normalizeUrl(raw, base) {
  let value = raw.trim();
  if (!value) return null;
  if (value.startsWith("//")) value = `https:${value}`;
  if (value.startsWith("data:") || value.startsWith("blob:") || value.startsWith("mailto:") || value.startsWith("tel:")) return null;

  try {
    const u = new URL(value, base);
    if (!ALLOWED_HOSTS.has(u.hostname)) return null;
    u.hash = "";
    return u.toString();
  } catch {
    return null;
  }
}

function getExtensionFromUrl(url, contentType = "") {
  const pathname = new URL(url).pathname;
  let ext = path.extname(pathname).toLowerCase();
  if (ext) return ext;

  if (contentType.includes("text/html")) return ".html";
  if (contentType.includes("javascript")) return ".js";
  if (contentType.includes("text/css")) return ".css";
  if (contentType.includes("application/json")) return ".json";
  if (contentType.includes("image/svg")) return ".svg";
  if (contentType.includes("image/png")) return ".png";
  if (contentType.includes("image/jpeg")) return ".jpg";
  if (contentType.includes("image/webp")) return ".webp";
  if (contentType.includes("font/woff2")) return ".woff2";
  if (contentType.includes("video/")) return ".mp4";
  return ".bin";
}

function isLikelyText(ext, contentType) {
  if (TEXT_EXTENSIONS.has(ext)) return true;
  return contentType.startsWith("text/") || contentType.includes("javascript") || contentType.includes("json") || contentType.includes("svg");
}

function collectUrlsFromText(text, baseUrl) {
  const out = new Set();

  const patterns = [
    /https?:\/\/[^\s"'()<>\\]+/g,
    /https?:\\\/\\\/[^\s"'()<>]+/g,
    /(?:src|href)=['"]([^'"]+)['"]/gi,
    /url\(([^)]+)\)/gi,
    /import\s+[^'"\n]*['"]([^'"\n]+)['"]/gi,
    /import\(['"]([^'"]+)['"]\)/gi,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const raw = (match[1] || match[0]).replaceAll("\\/", "/").replace(/^['"]|['"]$/g, "");
      const resolved = normalizeUrl(raw, baseUrl);
      if (resolved) out.add(resolved);
    }
  }

  return [...out];
}

function sanitizeFramerHtml(html) {
  let out = html;

  // Remove Framer appear-animation data/scripts that can leave sections hidden.
  out = out.replace(/<script[^>]*type=["']framer\/appear["'][^>]*>[\s\S]*?<\/script>/gi, "");
  out = out.replace(/<script[^>]*data-framer-appear-animation[^>]*>[\s\S]*?<\/script>/gi, "");

  // Remove data marker attributes used by appear animations.
  out = out.replace(/\sdata-framer-appear-id=(["'])[^"']*\1/gi, "");

  // If inline styles include hidden-by-default opacity, force visible.
  out = out.replace(/opacity\s*:\s*0(?:\.\d+)?\s*;?/gi, "opacity:1;");

  return out;
}

async function fetchResource(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const contentType = (res.headers.get("content-type") || "").toLowerCase();
  return { buffer, contentType };
}

async function run() {
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(ASSET_DIR, { recursive: true });

  const queue = [ORIGIN];
  const visited = new Set();
  const mapping = new Map();
  const textByUrl = new Map();
  const aliases = new Map();

  while (queue.length > 0) {
    const url = queue.shift();
    if (!url || visited.has(url)) continue;
    visited.add(url);

    try {
      const { buffer, contentType } = await fetchResource(url);
      const ext = getExtensionFromUrl(url, contentType);
      const localName = `${hashName(url)}${ext}`;
      const localPath = `/topbuilder-exact/assets/${localName}`;
      const outPath = path.join(ASSET_DIR, localName);

      mapping.set(url, localPath);
      await writeFile(outPath, buffer);

      // Preserve original basenames for assets imported via relative paths (e.g. Framer chunks).
      if (!new URL(url).search) {
        const originalBase = path.basename(new URL(url).pathname);
        if (originalBase && originalBase.includes(".") && originalBase !== localName) {
          aliases.set(originalBase, localName);
        }
      }

      if (isLikelyText(ext, contentType)) {
        const text = buffer.toString("utf8");
        textByUrl.set(url, text);
        const discovered = collectUrlsFromText(text, url);
        for (const discoveredUrl of discovered) {
          if (!visited.has(discoveredUrl)) queue.push(discoveredUrl);
        }
      }

      process.stdout.write(`Fetched ${visited.size}: ${url}\n`);
    } catch (err) {
      process.stdout.write(`Skip: ${url} (${err.message})\n`);
    }
  }

  // Rewrite every text asset with local URLs.
  for (const [url, text] of textByUrl.entries()) {
    let rewritten = text;
    for (const [remote, local] of mapping.entries()) {
      rewritten = rewritten.split(remote).join(local);
      rewritten = rewritten.split(remote.replaceAll("/", "\\/")).join(local.replaceAll("/", "\\/"));
    }

    if (rewritten.includes("data-framer-appear-id") || rewritten.includes('type="framer/appear"')) {
      rewritten = sanitizeFramerHtml(rewritten);
    }

    const localAssetPath = mapping.get(url);
    if (!localAssetPath) continue;
    const fullLocalPath = path.join(OUT_DIR, localAssetPath.replace("/topbuilder-exact/", ""));
    await writeFile(fullLocalPath, rewritten, "utf8");
  }

  // Add file aliases so relative imports in mirrored JS can still resolve.
  for (const [aliasName, targetName] of aliases.entries()) {
    const aliasPath = path.join(ASSET_DIR, aliasName);
    const targetPath = path.join(ASSET_DIR, targetName);
    if (aliasPath !== targetPath) {
      try {
        await copyFile(targetPath, aliasPath);
      } catch {
        // Ignore alias collisions and continue.
      }
    }
  }

  const rootLocal = mapping.get(ORIGIN);
  if (!rootLocal) throw new Error("Root page was not fetched.");
  const rootAssetPath = path.join(OUT_DIR, rootLocal.replace("/topbuilder-exact/", ""));
  const rootHtml = await (await import("node:fs/promises")).readFile(rootAssetPath, "utf8");
  await writeFile(path.join(OUT_DIR, "index.html"), rootHtml, "utf8");

  await writeFile(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(
      {
        scrapedAt: new Date().toISOString(),
        origin: ORIGIN,
        fetchedCount: visited.size,
        mappedCount: mapping.size,
      },
      null,
      2,
    ),
    "utf8",
  );

  process.stdout.write(`\nMirror ready: ${path.join(OUT_DIR, "index.html")}\n`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
