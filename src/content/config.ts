import { z, defineCollection } from "astro:content";

const entityCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    entityId: z.string(),
    gameSource: z.string(),
    hazardLevel: z.string(),
    summary: z.string(),
    image: z.string(),
    liveTemplate: z.boolean().default(true),
    featured: z.boolean().default(false),
    visualEffect: z.string().optional(),
    telemetryUniverseId: z.string().optional(),
    weakness: z.string().optional(),
    route: z.string().optional(),
    relatedGuideIds: z.array(z.string()).default([]),
    assetCredits: z.array(z.object({
      title: z.string(),
      creator: z.string(),
      license: z.string(),
      source: z.string()
    })).default([])
  })
});

const guideCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    guideId: z.string(),
    topic: z.string(),
    hazardLevel: z.string(),
    summary: z.string(),
    image: z.string(),
    updated: z.string(),
    featured: z.boolean().default(false),
    telemetryUniverseId: z.string().optional(),
    relatedEntityIds: z.array(z.string()).default([]),
    assetCredits: z.array(z.object({
      title: z.string(),
      creator: z.string(),
      license: z.string(),
      source: z.string()
    })).default([])
  })
});

export const collections = {
  entities: entityCollection,
  guides: guideCollection
};
