// app/robots.ts
import { MetadataRoute } from "next";

const baseUrl = "https://www.aimedi.tech";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
