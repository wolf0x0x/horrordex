import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outDir = path.join(root, "src/content/guides");
const imageDir = path.join(root, "public/assets/img/guides");

const coverThemes = {
  backrooms: ["#06080c", "#ff4d5a", "#ffc15c"],
  horror: ["#070a0f", "#ff4d5a", "#6bd7ff"],
  minecraft: ["#07120d", "#4ff0a2", "#ffc15c"],
  roblox: ["#0b0e13", "#6bd7ff", "#ff4d5a"],
  casual: ["#080b12", "#4ff0a2", "#6bd7ff"],
  sandbox: ["#0a0d12", "#ffc15c", "#4ff0a2"]
};

const commonFaqs = {
  freeHorror: [
    ["Are free Backrooms-like horror games actually scary?", "Yes. The strongest free horror games rely on audio pressure, maze anxiety, and limited information rather than expensive production values."],
    ["What should beginners play first?", "Start with short browser horror games or Roblox horror experiences before moving into longer survival titles."],
    ["Do I need a gaming PC?", "No. Many recommendations run in a browser, on Roblox, or on low-spec PCs."]
  ],
  platform: [
    ["Is this guide beginner friendly?", "Yes. It assumes no prior platform knowledge and focuses on safe first steps."],
    ["Can kids use these platforms?", "They can, but parents should configure privacy, chat, spending, and server permissions before play."],
    ["Is everything here free?", "Most entries are free-to-start or have free access paths, but optional purchases vary by platform."]
  ]
};

const articles = [
  {
    slug: "backrooms-complete-guide",
    theme: "backrooms",
    title: "Backrooms Explained: From Urban Legend to Playable Horror",
    guideId: "GUIDE_BACKROOMS_COMPLETE",
    topic: "The Backrooms",
    articleType: "deep-dive",
    hazardLevel: "Class 2: Lore",
    summary: "A complete Backrooms guide covering the creepypasta origin, liminal-space horror, game adaptations, common levels, and why the setting became a modern horror language.",
    keywords: ["what are the backrooms", "backrooms game", "backrooms origin", "liminal space horror"],
    relatedGuideIds: ["GUIDE_BACKROOMS_FREE_HORROR", "REF_LEVEL_0"],
    body: `The Backrooms started as a simple image-era nightmare: yellow rooms, buzzing lights, damp carpet, and the feeling that reality had loaded the wrong floor. Its power comes from familiarity. The space is not a castle or alien planet; it is an office hallway that should have been harmless.

For games, the Backrooms is useful because it turns navigation into anxiety. Players are not only afraid of monsters. They are afraid of repeated walls, unreliable memory, and exits that feel almost close enough to trust.

## Why It Works

- Liminal spaces feel abandoned but not empty.
- Repeating rooms make memory unreliable.
- Audio loops create pressure without showing a threat.
- The best games use restraint before revealing danger.

## From Myth to Playable Format

Backrooms games usually convert the myth into three loops: exploration, orientation, and escape. A strong version teaches the player to notice ceiling changes, wall stains, sound shifts, and lighting temperature instead of only chasing map markers.

For Horrordex, Backrooms content becomes the backbone for entity dossiers, survival routes, and recommendation pages about games with similar spatial fear.`
  },
  {
    slug: "free-horror-games-like-backrooms",
    theme: "horror",
    title: "20 Free Horror Games Like the Backrooms",
    guideId: "GUIDE_BACKROOMS_FREE_HORROR",
    topic: "Free Horror Games",
    articleType: "list",
    hazardLevel: "Class 4: High Tension",
    summary: "A ranked guide to free horror games like Backrooms, focused on liminal spaces, maze anxiety, co-op fear, and low-cost browser or platform play.",
    keywords: ["free horror games like backrooms", "games similar to backrooms", "games like backrooms free"],
    relatedGuideIds: ["GUIDE_BACKROOMS_COMPLETE", "GUIDE_BEST_HORROR_2026", "GUIDE_ROBLOX_BEGINNER_2026"],
    faqs: commonFaqs.freeHorror,
    items: [
      ["Apeirophobia", "Roblox", "Free", "Backrooms co-op", "A Roblox Backrooms experience built around level progression, entity pressure, and team panic.", "Best for players who want the Backrooms mood without installing a separate game.", "https://www.roblox.com/discover"],
      ["The Backrooms Game FREE Edition", "PC", "Free", "Liminal maze", "A compact survival loop about orientation, noise discipline, and the fear of identical corridors.", "Good first stop for understanding why empty rooms can feel hostile.", "https://store.steampowered.com/"],
      ["Escape the Backrooms-style Roblox maps", "Roblox", "Free", "Co-op escape", "Community maps vary in quality but many capture the same chase-and-route tension.", "Use this when you want fast multiplayer scares.", "https://www.roblox.com/discover"],
      ["Itch.io Liminal Horror Collection", "Browser/PC", "Free/PWYW", "Indie horror", "Short experimental games often explore hallways, offices, pools, and impossible rooms.", "Ideal for finding strange ideas before they become mainstream.", "https://itch.io/games/free/tag-horror"],
      ["SCP: Containment Breach", "PC", "Free", "Facility horror", "Not Backrooms, but it shares procedural uncertainty, corridors, and rule-based entities.", "Great for players who like learning entity behavior.", "https://www.scpcbgame.com/"],
      ["Cry of Fear", "PC", "Free", "Survival horror", "A bleak first-person horror game with limited resources, hostile streets, and oppressive sound design.", "Best for players ready for a longer free horror campaign.", "https://store.steampowered.com/"],
      ["No Players Online", "PC", "Free/PWYW", "Analog liminal horror", "A fake empty multiplayer shooter becomes strange as the player realizes the server is not as abandoned as it looks.", "Strong pick for eerie empty-space dread.", "https://papercookies.itch.io/no-players-online"],
      ["Dagon", "PC", "Free", "Narrative horror", "A short Lovecraft adaptation built around atmosphere, voice, and slow visual unease.", "Good when you want literary horror without combat.", "https://store.steampowered.com/"],
      ["The Open House", "Browser", "Free", "Found-footage browser horror", "A real-estate tour format turns everyday rooms into a surveillance nightmare.", "Great example of mundane spaces becoming unsafe.", "https://corpsepile.itch.io/the-open-house"],
      ["September 1999", "PC", "Free/PWYW", "VHS horror", "A very short looping domestic horror piece with heavy analog texture.", "Best for a five-minute scare with no learning curve.", "https://98demake.itch.io/september1999"],
      ["Late Night Mop", "PC", "Free/PWYW", "Short chore horror", "A simple cleaning job becomes a compact haunted-house route.", "Good for players who like objective-driven scares.", "https://lixian.itch.io/late-night-mop"],
      ["Assessment Examination", "PC", "Free/PWYW", "Psychological test horror", "A questionnaire format builds unease through faces, choices, and implication.", "Best when you want horror without running or combat.", "https://wenderlygames.itch.io/assessment-examination"],
      ["MapFriend", "PC", "Free/PWYW", "Interface horror", "A fake navigation tool creates dread through wrong directions and impossible places.", "A strong match for Backrooms-style spatial anxiety.", "https://papercookies.itch.io/"],
      ["The Baby In Yellow", "PC/Mobile", "Free", "Short comedy horror", "A babysitting setup escalates into surreal chaos with accessible controls.", "Good for beginners who want lighter horror.", "https://teamterrible.itch.io/the-baby-in-yellow"],
      ["Granny", "Mobile/PC", "Free/Paid", "Escape horror", "A house escape game where sound discipline and hiding routes matter.", "Best for players who like learning patrol patterns.", "https://play.google.com/store/apps/details?id=com.dvloper.granny"],
      ["Baldi's Basics Classic Remastered", "PC", "Free/Paid", "Surreal school horror", "Educational-game parody becomes a routing and resource pressure test.", "Good for players who like absurd horror systems.", "https://basically-games.itch.io/"],
      ["Dark Deception Chapter 1", "PC", "Free", "Maze chase horror", "Arcade movement and monster pressure make maze reading feel dangerous.", "A direct fit for players who like being hunted in corridors.", "https://store.steampowered.com/"],
      ["Spooky's Jump Scare Mansion", "PC", "Free/Paid", "Room-runner horror", "Cute rooms slowly mutate into sustained pursuit and survival pressure.", "Best for players who want a long hallway challenge.", "https://store.steampowered.com/"],
      ["Yume Nikki", "PC", "Free", "Surreal exploration", "Not traditional horror, but its dream spaces and silent logic shaped a lot of liminal exploration.", "Good for patient players chasing mood over jumpscares.", "https://store.steampowered.com/"],
      ["Rooms-style Roblox horror", "Roblox", "Free", "Procedural room horror", "Door-by-door progression makes each room a small decision under threat.", "Great for players moving from DOORS into harsher variants.", "https://www.roblox.com/discover"]
    ],
    body: `Backrooms-like horror is not only about yellow wallpaper. The real formula is a place that should be understandable but refuses to stay mapped. Free games are especially good at this because they focus on rules, sound, and pacing instead of spectacle.

Use this list as a starting route. Pick Roblox for quick multiplayer, Itch.io for experimental dread, and PC freeware when you want deeper survival systems.`
  },
  {
    slug: "minecraft-survival-guide-2026",
    theme: "minecraft",
    title: "Minecraft Survival Guide 2026: Complete Beginner Route",
    guideId: "GUIDE_MINECRAFT_SURVIVAL_2026",
    topic: "Minecraft",
    articleType: "platform-guide",
    hazardLevel: "Class 1: Beginner",
    summary: "A 2026 Minecraft survival guide for new and returning players, covering first-day priorities, food, shelter, mining, villages, Nether prep, and long-term goals.",
    keywords: ["minecraft survival guide 2026", "minecraft beginner guide", "minecraft beginner survival"],
    relatedGuideIds: ["GUIDE_SANDBOX_GAMES_2026", "GUIDE_CASUAL_GAMES_2026"],
    faqs: commonFaqs.platform,
    body: `Minecraft survival is easiest when you stop treating the first day as a race. The goal is not diamond gear. The goal is light, food, a bed, and a repeatable route back home.

## First Day Route

Punch trees, craft tools, collect food, make torches, and sleep before night escalates. A dirt shelter is acceptable. A lost inventory is more expensive than an ugly first base.

## Stable Progression

After food and shelter, build a mine entrance, mark it with torches, and keep one chest for emergency supplies. Villages are powerful because beds, crops, and trading reduce early randomness.

## Nether Prep

Do not enter the Nether without blocks, food, spare tools, and a clear return marker. The safest players are boring players who label paths and over-pack supplies.`
  },
  {
    slug: "crazy-games-best-free-games",
    theme: "casual",
    title: "Best Free Crazy Games to Play in 2026",
    guideId: "GUIDE_CRAZY_GAMES_BEST_FREE",
    topic: "Crazy Games",
    articleType: "list",
    hazardLevel: "Class 0: Browser Safe",
    summary: "A practical ranking of the best free games on Crazy Games for quick play, school-break sessions, casual competition, and no-download discovery.",
    keywords: ["crazy games best free games", "free online games", "browser games ranking"],
    relatedGuideIds: ["GUIDE_CASUAL_GAMES_2026", "GUIDE_BEST_HORROR_2026"],
    faqs: commonFaqs.platform,
    items: [
      ["Shell Shockers", "Browser", "Free", "Arena shooter", "Fast matches, simple controls, and instant browser access make it a reliable quick-play pick.", "Good for short competitive sessions.", "https://www.crazygames.com/"],
      ["BuildNow GG", "Browser", "Free", "Build shooter", "A lightweight building-and-aiming loop for players who like creative combat.", "Best for practicing reaction and structure placement.", "https://www.crazygames.com/"],
      ["Drift Hunters", "Browser", "Free", "Driving", "A tuning and drifting game with satisfying progression and low friction.", "Good for players who want mechanical flow without pressure.", "https://www.crazygames.com/"],
      ["Moto X3M", "Browser", "Free", "Stunt racing", "Short tracks, restarts, and physics mistakes make it easy to keep playing.", "Great for casual challenge loops.", "https://www.crazygames.com/"],
      ["Horror Tale-style browser games", "Browser", "Free", "Light horror", "Browser horror works best when sessions are short and puzzles are readable.", "A safer entry point before heavier horror games.", "https://www.crazygames.com/t/horror"],
      ["Basket Random", "Browser", "Free", "Physics sports", "Short matches and chaotic physics make it easy to replay without a long setup.", "Best for fast two-player sessions.", "https://www.crazygames.com/"],
      ["Bloxd.io", "Browser", "Free", "Voxel multiplayer", "A block-based browser world with parkour, building, and multiplayer modes.", "Good for Minecraft-style play in a tab.", "https://www.crazygames.com/"],
      ["Smash Karts", "Browser", "Free", "Kart combat", "Arena driving and power-ups create quick competitive rounds.", "Best for arcade multiplayer without downloads.", "https://www.crazygames.com/"],
      ["Word Wipe", "Browser", "Free", "Word puzzle", "A simple word-clearing loop that works well for quick breaks.", "Good for low-pressure puzzle sessions.", "https://www.crazygames.com/"],
      ["Ragdoll Archers", "Browser", "Free", "Physics action", "Loose physics and one-more-round combat make it a strong casual action pick.", "Best for quick skill-based browser play.", "https://www.crazygames.com/"]
    ],
    body: `Crazy Games is strongest when you want zero-install discovery. The best choices load quickly, explain themselves in seconds, and still have enough depth to keep a tab open longer than planned.

This ranking favors games that are easy to start, readable on a laptop, and friendly to short sessions.`
  },
  {
    slug: "roblox-beginner-guide-2026",
    theme: "roblox",
    title: "Roblox Beginner Guide 2026: Account, Safety, and First Games",
    guideId: "GUIDE_ROBLOX_BEGINNER_2026",
    topic: "Roblox",
    articleType: "platform-guide",
    hazardLevel: "Class 1: Beginner",
    summary: "A beginner-friendly Roblox 2026 guide covering account setup, safety, discovery, Robux basics, private servers, and how to find good horror experiences.",
    keywords: ["roblox beginner guide 2026", "how to play roblox", "roblox safety settings"],
    relatedGuideIds: ["GUIDE_BACKROOMS_FREE_HORROR", "GUIDE_BEST_HORROR_2026"],
    faqs: commonFaqs.platform,
    body: `Roblox is less a single game than a platform of player-made experiences. New players should learn account safety, privacy controls, and discovery habits before worrying about Robux or rare cosmetics.

## First Settings to Check

Review chat permissions, friend requests, spending limits, and private server settings. For younger players, these settings matter more than any individual game recommendation.

## Finding Good Horror Games

Search broad terms like horror, doors, backrooms, survival, and co-op, then check ratings, player count, and recent update dates. Good Roblox horror games usually teach rules clearly before increasing pressure.

## Robux Basics

Robux is optional for most discovery. Treat paid items as cosmetics or convenience, not as a requirement for enjoying the platform.`
  },
  {
    slug: "best-horror-games-2026",
    theme: "horror",
    title: "15 Best Horror Games to Play in 2026",
    guideId: "GUIDE_BEST_HORROR_2026",
    topic: "Horror Games",
    articleType: "list",
    hazardLevel: "Class 5: Night Mode",
    summary: "A 2026 horror game recommendation list spanning survival horror, co-op scares, indie dread, Roblox horror, and Backrooms-like liminal fear.",
    keywords: ["best horror games 2026", "horror game recommendations", "top horror games"],
    relatedGuideIds: ["GUIDE_BACKROOMS_FREE_HORROR", "GUIDE_BACKROOMS_COMPLETE"],
    faqs: commonFaqs.freeHorror,
    items: [
      ["DOORS", "Roblox", "Free", "Roblox horror", "Readable rooms, chase sequences, and entity rules make it one of Roblox horror's best onboarding experiences.", "Great for players who like learning patterns under pressure.", "https://www.roblox.com/discover"],
      ["Phasmophobia", "PC", "Paid", "Co-op investigation", "Voice, evidence gathering, and team panic create memorable social horror.", "Best when played with friends.", "https://store.steampowered.com/"],
      ["SCP: Secret Laboratory", "PC", "Free", "Multiplayer chaos", "Round-based SCP containment drama with unpredictable player behavior.", "Good for players who want horror plus social systems.", "https://store.steampowered.com/"],
      ["Iron Lung", "PC", "Paid", "Claustrophobic indie", "A tiny submarine and limited instruments create pure pressure.", "Best for focused short-form dread.", "https://store.steampowered.com/"],
      ["Backrooms-inspired indie games", "PC/Browser", "Free/Paid", "Liminal horror", "Small teams keep finding new ways to make normal rooms feel wrong.", "Best for players chasing atmosphere.", "https://itch.io/games/tag-horror"],
      ["Lethal Company", "PC", "Paid", "Co-op extraction horror", "Quota pressure, proximity voice, and unpredictable facilities make every run a story.", "Best for social horror with comedy and panic.", "https://store.steampowered.com/"],
      ["Content Warning", "PC", "Paid", "Co-op filming horror", "Players chase scary footage while trying to survive the thing they are filming.", "Great for groups that want chaos without a heavy rules barrier.", "https://store.steampowered.com/"],
      ["Dead by Daylight", "PC/Console", "Paid", "Asymmetric horror", "One killer versus four survivors keeps matches readable and tense.", "Best for repeatable multiplayer pressure.", "https://deadbydaylight.com/"],
      ["Resident Evil 4", "PC/Console", "Paid", "Action survival horror", "A polished blend of resource pressure, crowd control, and horror set pieces.", "Best for players who want horror with strong combat.", "https://www.residentevil.com/"],
      ["Alan Wake 2", "PC/Console", "Paid", "Narrative horror", "A stylish mystery that uses light, writing, and shifting reality as horror tools.", "Best for cinematic story-driven players.", "https://www.alanwake.com/"],
      ["Amnesia: The Bunker", "PC/Console", "Paid", "Immersive survival horror", "A semi-open bunker turns fuel, noise, and planning into survival decisions.", "Best for players who like systems-driven fear.", "https://store.steampowered.com/"],
      ["SIGNALIS", "PC/Console", "Paid", "Retro survival horror", "Classic inventory pressure and surreal science fiction create a precise, mournful dread.", "Best for fans of old-school survival horror.", "https://store.steampowered.com/"],
      ["The Mortuary Assistant", "PC/Console", "Paid", "Workplace horror", "Routine embalming tasks become a tense investigation under demonic pressure.", "Good for players who like procedural scares.", "https://store.steampowered.com/"],
      ["Outlast", "PC/Console", "Paid", "Run-and-hide horror", "A camera, dark corridors, and no meaningful combat keep the player vulnerable.", "Best for pure chase pressure.", "https://store.steampowered.com/"],
      ["Alien: Isolation", "PC/Console", "Paid", "Stealth survival horror", "A reactive alien threat makes hiding, sound, and route planning matter.", "Best for sustained tension over jumpscares.", "https://www.sega.com/"]
    ],
    body: `The best horror games in 2026 are not all expensive blockbusters. Many of the strongest scares come from readable rules, strong audio, co-op uncertainty, and places that feel almost normal.

Use this list by mood: Roblox for quick social horror, PC indie games for authored dread, and co-op investigations when you want a shared panic story.`
  },
  {
    slug: "best-sandbox-games-2026",
    theme: "sandbox",
    title: "Best Sandbox Building Games to Play in 2026",
    guideId: "GUIDE_SANDBOX_GAMES_2026",
    topic: "Sandbox Games",
    articleType: "list",
    hazardLevel: "Class 0: Creative",
    summary: "A 2026 sandbox game guide for players who enjoy building, survival crafting, modding, multiplayer worlds, and creative problem solving.",
    keywords: ["best sandbox games 2026", "sandbox game recommendations", "building games"],
    relatedGuideIds: ["GUIDE_MINECRAFT_SURVIVAL_2026", "GUIDE_CASUAL_GAMES_2026"],
    faqs: commonFaqs.platform,
    items: [
      ["Minecraft", "PC/Console/Mobile", "Paid", "Survival sandbox", "Still the reference point for crafting, survival, building, and community servers.", "Best all-around sandbox pick.", "https://www.minecraft.net/"],
      ["Roblox Studio Experiences", "Roblox", "Free", "User-created sandbox", "Roblox blends creation, social play, and custom game modes.", "Best for discovering player-made worlds.", "https://www.roblox.com/create"],
      ["Terraria", "PC/Console/Mobile", "Paid", "2D adventure sandbox", "Deep item progression and boss discovery make it more combat-driven than Minecraft.", "Best for players who like goals with building.", "https://store.steampowered.com/"],
      ["LEGO Fortnite-style survival builders", "Multi-platform", "Free/Paid", "Co-op building", "Accessible crafting and friendly visuals make survival easier to share.", "Best family-friendly builder lane.", "https://www.epicgames.com/"],
      ["Garry's Mod", "PC", "Paid", "Physics sandbox", "A mod-heavy playground for experiments, roleplay, and community modes.", "Best for players who like messy creativity.", "https://store.steampowered.com/"],
      ["Valheim", "PC/Console", "Paid", "Survival crafting", "Biome progression and co-op building make each base feel earned.", "Best for survival players who want a long campaign.", "https://www.valheimgame.com/"],
      ["No Man's Sky", "PC/Console", "Paid", "Space sandbox", "Exploration, base building, ships, and planet discovery create a huge creative loop.", "Best for open-ended sci-fi exploration.", "https://www.nomanssky.com/"],
      ["Scrap Mechanic", "PC", "Paid", "Engineering sandbox", "Vehicle building and mechanical systems reward experimentation.", "Best for players who like machines and physics.", "https://store.steampowered.com/"],
      ["Core Keeper", "PC/Console", "Paid", "Underground crafting", "Mining, farming, bosses, and base building combine into a cozy survival loop.", "Best for small-group sandbox progression.", "https://store.steampowered.com/"],
      ["Satisfactory", "PC", "Paid", "Automation sandbox", "Factory planning turns terrain into a logistics puzzle.", "Best for players who love building efficient systems.", "https://www.satisfactorygame.com/"]
    ],
    body: `Sandbox games are strongest when they let players set their own goals. Some people build castles, some automate farms, and some just want a quiet world where the next project is always visible.

The best 2026 sandbox picks balance freedom with enough structure to prevent boredom.`
  },
  {
    slug: "best-casual-games-2026",
    theme: "casual",
    title: "Best Casual Games to Relax With in 2026",
    guideId: "GUIDE_CASUAL_GAMES_2026",
    topic: "Casual Games",
    articleType: "list",
    hazardLevel: "Class 0: Relaxed",
    summary: "A 2026 casual game list for players who want low-pressure, quick-start, relaxing games across browser, mobile, sandbox, puzzle, and cozy categories.",
    keywords: ["best casual games 2026", "casual game recommendations", "relaxing games"],
    relatedGuideIds: ["GUIDE_CRAZY_GAMES_BEST_FREE", "GUIDE_SANDBOX_GAMES_2026"],
    faqs: commonFaqs.platform,
    items: [
      ["Stardew Valley", "PC/Console/Mobile", "Paid", "Cozy farming", "A calm long-term routine about farming, relationships, and small upgrades.", "Best for low-pressure progress.", "https://www.stardewvalley.net/"],
      ["Unpacking", "PC/Console", "Paid", "Cozy puzzle", "A quiet object-placement game that tells story through rooms.", "Best for short reflective sessions.", "https://store.steampowered.com/"],
      ["Browser puzzle games", "Browser", "Free", "Quick puzzle", "Daily and browser puzzles are easy to start and stop without losing momentum.", "Best for breaks between work.", "https://www.crazygames.com/t/puzzle"],
      ["Minecraft Creative Mode", "PC/Console/Mobile", "Paid", "Creative sandbox", "Creative mode removes survival pressure and turns the game into a building notebook.", "Best relaxing sandbox mode.", "https://www.minecraft.net/"],
      ["Roblox casual tycoon games", "Roblox", "Free", "Incremental casual", "Tycoon and simulator experiences give fast progression with simple goals.", "Best for casual multiplayer downtime.", "https://www.roblox.com/discover"],
      ["PowerWash Simulator", "PC/Console", "Paid", "Cleaning sim", "Clear before-and-after progress makes it deeply relaxing.", "Best for players who want tactile cleanup loops.", "https://store.steampowered.com/"],
      ["A Short Hike", "PC/Console", "Paid", "Exploration", "A compact island adventure with gentle goals and warm pacing.", "Best for a calm one-evening game.", "https://store.steampowered.com/"],
      ["Dorfromantik", "PC/Console", "Paid", "Tile puzzle", "Landscape tiles create a quiet strategy puzzle with no rush.", "Best for meditative planning.", "https://www.dorfromantik.com/"],
      ["Townscaper", "PC/Console/Mobile", "Paid", "Toy builder", "Clicking turns colors and blocks into charming coastal towns.", "Best for effortless creative play.", "https://store.steampowered.com/"],
      ["Cats Organized Neatly", "PC", "Paid", "Cozy puzzle", "A soft spatial puzzle about fitting cats into neat grids.", "Best for gentle puzzle breaks.", "https://store.steampowered.com/"]
    ],
    body: `Casual games are not shallow by default. The best ones reduce friction: quick starts, clear goals, soft failure, and progress that does not punish you for taking a break.

This list focuses on games that work when you want decompression rather than adrenaline.`
  }
];

function quoteYaml(value) {
  return JSON.stringify(value);
}

function toYaml(value, indent = 0) {
  const pad = " ".repeat(indent);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return value.map((item) => {
      if (Array.isArray(item)) return `${pad}- ${quoteYaml(item)}`;
      if (item && typeof item === "object") {
        const nested = toYaml(item, indent + 2).split("\n");
        return [`${pad}- ${nested[0].trimStart()}`, ...nested.slice(1)].join("\n");
      }
      return `${pad}- ${quoteYaml(item)}`;
    }).join("\n");
  }
  if (value && typeof value === "object") {
    return Object.entries(value).map(([key, item]) => {
      if (Array.isArray(item) && item.length === 0) {
        return `${pad}${key}: []`;
      }
      if (Array.isArray(item) || (item && typeof item === "object")) {
        return `${pad}${key}:\n${toYaml(item, indent + 2)}`;
      }
      return `${pad}${key}: ${typeof item === "boolean" ? item : quoteYaml(item)}`;
    }).join("\n");
  }
  return quoteYaml(value);
}

async function writeCover(article) {
  const colors = coverThemes[article.theme] ?? coverThemes.horror;
  const imagePath = path.join(imageDir, `${article.slug}.webp`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="800" viewBox="0 0 1400 800">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop stop-color="${colors[0]}" offset="0"/>
        <stop stop-color="#050609" offset=".58"/>
        <stop stop-color="${colors[1]}" offset="1"/>
      </linearGradient>
      <pattern id="scan" width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M0 8H16" stroke="${colors[2]}" stroke-opacity=".13"/>
      </pattern>
    </defs>
    <rect width="1400" height="800" fill="url(#g)"/>
    <rect width="1400" height="800" fill="url(#scan)"/>
    <rect x="58" y="58" width="1284" height="684" fill="none" stroke="${colors[2]}" stroke-width="3" stroke-opacity=".65"/>
    <text x="84" y="148" fill="${colors[2]}" font-family="Menlo, monospace" font-size="28" font-weight="700">HORRORDEX // ${article.topic.toUpperCase()}</text>
    <text x="84" y="376" fill="#e8edf0" font-family="Menlo, monospace" font-size="64" font-weight="700">${article.title.replace(/&/g, "&amp;").slice(0, 25)}</text>
    <text x="84" y="456" fill="#c3ccd1" font-family="Menlo, monospace" font-size="30">${article.articleType.toUpperCase()} / ${article.updated ?? "2026"}</text>
    <circle cx="1190" cy="210" r="92" fill="none" stroke="${colors[1]}" stroke-width="18" stroke-opacity=".55"/>
    <circle cx="1190" cy="210" r="20" fill="${colors[2]}" fill-opacity=".8"/>
    <path d="M1010 610H1300M1010 650H1240M1010 690H1280" stroke="${colors[2]}" stroke-width="10" stroke-opacity=".55"/>
  </svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(imagePath);
  return `/assets/img/guides/${article.slug}.webp`;
}

function normalizeArticle(article, image) {
  const frontmatter = {
    title: article.title,
    guideId: article.guideId,
    topic: article.topic,
    articleType: article.articleType,
    hazardLevel: article.hazardLevel,
    summary: article.summary,
    image,
    updated: "2026-06-13",
    featured: article.slug === "free-horror-games-like-backrooms" || article.slug === "roblox-beginner-guide-2026",
    keywords: article.keywords,
    relatedEntityIds: [],
    relatedGuideIds: article.relatedGuideIds ?? [],
    recommendedItems: (article.items ?? []).map(([name, platform, price, type, summary, whyPlay, link]) => ({ name, platform, price, type, summary, whyPlay, link })),
    faqs: (article.faqs ?? []).map(([question, answer]) => ({ question, answer })),
    assetCredits: [
      {
        title: `${article.title} generated cover`,
        creator: "Codex local static asset pipeline",
        license: "Site-owned generated image",
        source: "scripts/seed-seo-guides.js"
      }
    ]
  };
  return `---\n${toYaml(frontmatter)}\n---\n\n${article.body.trim()}\n`;
}

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

for (const article of articles) {
  const image = await writeCover(article);
  const filePath = path.join(outDir, `${article.slug}.md`);
  fs.writeFileSync(filePath, normalizeArticle(article, image));
  console.log(`Seeded guide ${article.slug}`);
}
