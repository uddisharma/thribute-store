import { BaseDomain } from "@/constants";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/order"],
    },
    sitemap: `${BaseDomain}/sitemap.xml`,
  };
}
