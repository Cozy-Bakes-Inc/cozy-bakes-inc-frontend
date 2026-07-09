import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/menu",
    "/categories",
    "/story",
    "/contact",
    "/farmers-market",
    "/testimonials",
    "/privacy-policy",
    "/terms-of-service",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
