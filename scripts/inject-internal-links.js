#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pipelinePath = path.join(root, "src", "data", "content-pipeline.json");
const guidesDir = path.join(root, "src", "content", "guides");

if (!fs.existsSync(pipelinePath)) {
  console.error("content-pipeline.json not found");
  process.exit(1);
}

const pipeline = JSON.parse(fs.readFileSync(pipelinePath, "utf8"));

const linkables = [];
for (const guide of pipeline.guides || []) {
  linkables.push({
    slug: guide.slug,
    href: `/guides/${guide.slug}/`,
    terms: [guide.frontmatter.title, guide.slug.replace(/-/g, " ")].filter(Boolean)
  });
}
for (const entity of pipeline.entities || []) {
  linkables.push({
    slug: entity.slug,
    href: `/entities/${entity.slug}/`,
    terms: [entity.frontmatter.title, entity.slug.replace(/-/g, " ")].filter(Boolean)
  });
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function injectLinks(filePath, currentSlug) {
  let content = fs.readFileSync(filePath, "utf8");
  const frontmatterMatch = content.match(/^(---\n[\s\S]*?\n---\n)/);
  const frontmatter = frontmatterMatch ? frontmatterMatch[1] : "";
  let body = frontmatterMatch ? content.slice(frontmatterMatch[1].length) : content;

  const currentLinkables = linkables.filter((item) => item.slug !== currentSlug);
  // Sort by longest term first to avoid partial replacements
  const terms = currentLinkables
    .flatMap((item) => item.terms.map((term) => ({ term, href: item.href })))
    .sort((a, b) => b.term.length - a.term.length);

  for (const { term, href } of terms) {
    if (!term || term.length < 4) continue;
    const pattern = new RegExp(
      `(?<!\\[)(?<!\\])\\b(${escapeRegex(term)})\\b(?!\\]\\([^)]*\\))(?!\\{)`,
      "gi"
    );
    body = body.replace(pattern, (match) => {
      // Skip if already inside a markdown link or HTML tag
      return `[${match}](${href})`;
    });
  }

  const newContent = frontmatter + body;
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent);
    console.log(`injected internal links: ${filePath}`);
  }
}

for (const file of fs.readdirSync(guidesDir)) {
  if (!file.endsWith(".md")) continue;
  const slug = file.replace(/\.md$/, "");
  injectLinks(path.join(guidesDir, file), slug);
}

console.log("internal link injection complete");
