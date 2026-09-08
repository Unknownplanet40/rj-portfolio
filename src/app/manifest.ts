// src/app/manifest.ts
import type { MetadataRoute } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ryan James V. Capadocia — Portfolio",
    short_name: "RJ Portfolio",
    description:
      "Personal portfolio of Ryan James V. Capadocia — IT Support Engineer, Software Developer, and Problem Solver.",
    start_url: `${basePath}/`,
    id: `${basePath}/`,
    display: "standalone",
    background_color: "#0a0c10",
    theme_color: "#2563eb",
    orientation: "portrait-primary",
    categories: ["portfolio", "technology", "development"],
    icons: [
      {
        src: `${basePath}/icons/icon-192x192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/icons/icon-512x512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/icons/icon-maskable-512x512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
