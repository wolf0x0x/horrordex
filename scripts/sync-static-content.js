import fs from "node:fs";
import path from "node:path";

const manifestPath = path.join(process.cwd(), "src/data/content-pipeline.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const force = process.argv.includes("--force");

function quoteYaml(value) {
  return JSON.stringify(value);
}

function toYaml(value, indent = 0) {
  const pad = " ".repeat(indent);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return value.map((item) => {
      if (item && typeof item === "object") {
        const nestedPad = " ".repeat(indent + 2);
        const lines = toYaml(item, indent + 2)
          .trimEnd()
          .split("\n")
          .map((line) => line.startsWith(nestedPad) ? line.slice(nestedPad.length) : line);
        return [`${pad}- ${lines[0]}`, ...lines.slice(1).map((line) => `${pad}  ${line}`)].join("\n");
      }
      return `${pad}- ${quoteYaml(item)}`;
    }).join("\n");
  }

  if (value && typeof value === "object") {
    return Object.entries(value).map(([key, item]) => {
      if (Array.isArray(item) || (item && typeof item === "object")) {
        return `${pad}${key}:\n${toYaml(item, indent + 2)}`;
      }
      return `${pad}${key}: ${typeof item === "boolean" ? item : quoteYaml(item)}`;
    }).join("\n");
  }

  return typeof value === "boolean" ? String(value) : quoteYaml(value);
}

function writeEntry(collection, entry) {
  const filePath = path.join(process.cwd(), "src/content", collection, `${entry.slug}.md`);
  const frontmatter = toYaml(entry.frontmatter);
  const body = `---\n${frontmatter}\n---\n\n${entry.body.trim()}\n`;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, body);
  console.log(`Synced content ${collection}/${entry.slug}.md`);
}

async function downloadAsset(asset) {
  const filePath = path.join(process.cwd(), asset.path);
  if (!force && fs.existsSync(filePath)) {
    console.log(`Asset exists ${asset.path}`);
    return;
  }

  const response = await fetch(asset.url, {
    headers: { "User-Agent": "horrordex-static-content-sync/1.0" }
  });
  if (!response.ok) {
    throw new Error(`Asset download failed ${response.status} ${asset.url}`);
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const bytes = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(filePath, bytes);
  console.log(`Downloaded asset ${asset.path}`);
}

for (const entry of manifest.entities ?? []) {
  writeEntry("entities", entry);
}

for (const entry of manifest.guides ?? []) {
  writeEntry("guides", entry);
}

for (const asset of manifest.assets ?? []) {
  try {
    await downloadAsset(asset);
  } catch (err) {
    if (fs.existsSync(path.join(process.cwd(), asset.path))) {
      console.warn(`${err.message}; keeping existing ${asset.path}`);
    } else {
      throw err;
    }
  }
}

console.log("Static content and asset synchronization complete.");
