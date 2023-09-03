import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import sanity from "@sanity/astro";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  ""
);

export default defineConfig({
  // Hybrid + Adapter is required for embedded Sanity Studio
  output: "hybrid",
  adapter: vercel({
    functionPerRoute: false, // @todo: change to right provider
  }), 
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      studioBasePath: "/admin",
      useCdn: false, // `false` if you want to ensure fresh data
      apiVersion: "2023-09-03", // Set to date of setup to use the latest API version
    }),
    react(), // Required for Sanity Studio
  ],
});
