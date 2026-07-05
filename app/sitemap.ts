import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://onairdatanto.it";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/link`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
