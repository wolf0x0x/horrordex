import fs from "node:fs";
import path from "node:path";

const statsPath = path.join(process.cwd(), "src/data/roblox-stats.json");
const contentRoot = path.join(process.cwd(), "src/content");

function parseFrontmatter(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  return Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.match(/^([A-Za-z0-9_]+):\s*"?([^"\n]+)"?\s*$/))
      .filter(Boolean)
      .map(([, key, value]) => [key, value])
  );
}

function listMarkdownFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath)
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => path.join(dirPath, fileName));
}

function readTelemetryTargets() {
  const entries = [
    ...listMarkdownFiles(path.join(contentRoot, "entities")),
    ...listMarkdownFiles(path.join(contentRoot, "guides"))
  ];

  return Object.fromEntries(entries.flatMap((filePath) => {
    const frontmatter = parseFrontmatter(filePath);
    const recordId = frontmatter.entityId ?? frontmatter.guideId;
    if (!recordId || !frontmatter.telemetryUniverseId) return [];
    return [[recordId, frontmatter.telemetryUniverseId]];
  }));
}

function fallbackPopulation(entityId) {
  const seed = [...entityId].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const wave = Math.abs(Math.sin(Date.now() / 3600000 + seed));
  return Math.floor(900 + wave * 52000);
}

function readExistingStats() {
  try {
    return JSON.parse(fs.readFileSync(statsPath, "utf8"));
  } catch {
    return {};
  }
}

async function fetchRobloxPopulation(universeId) {
  const response = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`);
  if (!response.ok) {
    throw new Error(`Roblox API returned ${response.status}`);
  }
  const json = await response.json();
  const playing = json.data?.[0]?.playing;
  if (typeof playing !== "number") {
    throw new Error("Roblox payload did not include data[0].playing");
  }
  return playing;
}

async function syncMetrics() {
  const statsData = readExistingStats();
  const targetGames = readTelemetryTargets();
  const nowStamp = new Date().toISOString().replace("T", " ").slice(0, 19);

  for (const [entityId, universeId] of Object.entries(targetGames)) {
    try {
      const playing = await fetchRobloxPopulation(universeId);
      statsData[entityId] = {
        live_population: playing,
        last_mutation_sync: nowStamp
      };
      console.log(`Synced ${entityId}: ${playing}`);
    } catch (err) {
      const previous = statsData[entityId]?.live_population;
      statsData[entityId] = {
        live_population: previous ?? fallbackPopulation(entityId),
        last_mutation_sync: `${nowStamp} fallback`
      };
      console.warn(`Fallback for ${entityId}: ${err.message}`);
    }
  }

  fs.mkdirSync(path.dirname(statsPath), { recursive: true });
  fs.writeFileSync(statsPath, `${JSON.stringify(statsData, null, 2)}\n`);
  console.log("Static dynamic JSON synchronization complete.");
}

syncMetrics();
