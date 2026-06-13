import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourcePath = path.join(root, "public/favicon.svg");
const outputs = [
  ["public/favicon-32x32.png", 32],
  ["public/apple-touch-icon.png", 180],
  ["public/icon-192x192.png", 192],
  ["public/icon-512x512.png", 512]
];

const source = fs.readFileSync(sourcePath);

for (const [filePath, size] of outputs) {
  const absolutePath = path.join(root, filePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  await sharp(source)
    .resize(size, size)
    .png()
    .toFile(absolutePath);
  console.log(`Generated ${filePath}`);
}
