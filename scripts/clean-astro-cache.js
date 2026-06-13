import fs from "node:fs";
import path from "node:path";

const cacheDir = path.join(process.cwd(), ".astro");

fs.rmSync(cacheDir, { force: true, recursive: true });
console.log("Cleared Astro content cache.");
