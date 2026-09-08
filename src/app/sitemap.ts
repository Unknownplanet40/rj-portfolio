import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://unknownplanet40.github.io/rj-portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
