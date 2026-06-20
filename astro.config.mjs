import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://horrordex.xyz",
  output: "static",
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp"
    },
    remotePatterns: [{ protocol: "https" }]
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport"
  },
  build: {
    format: "directory"
  }
});
