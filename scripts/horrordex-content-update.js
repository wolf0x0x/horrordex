import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const anchorUtc = Date.parse("2026-06-15T18:00:00Z");
const dayMs = 24 * 60 * 60 * 1000;

const cycles = [
  {
    cycle: 1,
    type: "new-content",
    title: "20 Free Horror Games Like the Backrooms",
    file: "src/content/guides/free-horror-games-like-backrooms.md",
    url: "/guides/free-horror-games-like-backrooms/"
  },
  {
    cycle: 2,
    type: "new-content",
    title: "Roblox Beginner Guide 2026",
    file: "src/content/guides/roblox-beginner-guide-2026.md",
    url: "/guides/roblox-beginner-guide-2026/"
  },
  {
    cycle: 3,
    type: "new-content",
    title: "Minecraft Survival Guide 2026",
    file: "src/content/guides/minecraft-survival-guide-2026.md",
    url: "/guides/minecraft-survival-guide-2026/"
  },
  {
    cycle: 4,
    type: "new-content",
    title: "Best Free Crazy Games to Play in 2026",
    file: "src/content/guides/crazy-games-best-free-games.md",
    url: "/guides/crazy-games-best-free-games/"
  },
  {
    cycle: 5,
    type: "deepen-content",
    title: "Expand foundation guides with FAQ, internal links, and CTA",
    file: "scripts/seed-seo-guides.js",
    url: "/"
  },
  {
    cycle: 6,
    type: "entity-expansion",
    title: "Add Smiler, Bacteria, and Partygoers entity dossiers",
    file: "src/content/entities",
    url: "/"
  },
  {
    cycle: 7,
    type: "seo-optimization",
    title: "Improve schema, semantic URLs, and image alt text",
    file: "src/pages",
    url: "/"
  },
  {
    cycle: 8,
    type: "content-expansion",
    title: "Top 10 Roblox Horror Games",
    file: "src/content/guides",
    url: "/categories/roblox/"
  },
  {
    cycle: 9,
    type: "review-content",
    title: "Escape the Backrooms Review",
    file: "src/content/guides",
    url: "/categories/the-backrooms/"
  },
  {
    cycle: 10,
    type: "technical-optimization",
    title: "Add static search and navigation improvements",
    file: "src/pages/index.astro",
    url: "/"
  }
];

function currentCycle(now = new Date()) {
  const elapsedDays = Math.max(0, Math.floor((now.getTime() - anchorUtc) / dayMs));
  const cycleIndex = Math.floor(elapsedDays / 3) % cycles.length;
  return cycles[cycleIndex];
}

function existsTarget(target) {
  return fs.existsSync(path.join(root, target.file));
}

function countPattern(filePath, pattern) {
  const absolute = path.join(root, filePath);
  if (!fs.existsSync(absolute)) return 0;
  const content = fs.readFileSync(absolute, "utf8");
  return [...content.matchAll(pattern)].length;
}

function audit() {
  const missing = cycles.slice(0, 4).filter((cycle) => !existsTarget(cycle));
  const quality = {
    freeHorrorItems: countPattern("src/content/guides/free-horror-games-like-backrooms.md", /^\s+- name: /gm),
    crazyGamesItems: countPattern("src/content/guides/crazy-games-best-free-games.md", /^\s+- name: /gm),
    robloxFaqs: countPattern("src/content/guides/roblox-beginner-guide-2026.md", /^\s+- question: /gm),
    minecraftFaqs: countPattern("src/content/guides/minecraft-survival-guide-2026.md", /^\s+- question: /gm)
  };

  return { missing, quality };
}

const cycle = currentCycle();
const report = audit();

console.log(`horrordex-update-v1 cycle=${cycle.cycle}`);
console.log(`type=${cycle.type}`);
console.log(`title=${cycle.title}`);
console.log(`target=${cycle.file}`);
console.log(`url=https://horrordex.xyz${cycle.url}`);
console.log(`missingCoreArticles=${report.missing.length}`);
console.log(`freeHorrorItems=${report.quality.freeHorrorItems}`);
console.log(`crazyGamesItems=${report.quality.crazyGamesItems}`);
console.log(`robloxFaqs=${report.quality.robloxFaqs}`);
console.log(`minecraftFaqs=${report.quality.minecraftFaqs}`);

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, [
    `cycle=${cycle.cycle}`,
    `type=${cycle.type}`,
    `title=${cycle.title}`,
    `url=https://horrordex.xyz${cycle.url}`
  ].join("\n") + "\n");
}

if (report.missing.length) {
  console.error("Missing required core articles:");
  for (const item of report.missing) {
    console.error(`- Cycle ${item.cycle}: ${item.title} (${item.file})`);
  }
  process.exitCode = 1;
}
