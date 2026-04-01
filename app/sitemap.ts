import type { MetadataRoute } from "next";

import { getAllBlogs } from "@/lib/getAllBlogs";
import { getSiteUrl } from "@/lib/site";
import { products } from "@/constants/products";

function toEntry(
  path: string,
  options: {
    changeFrequency: NonNullable<MetadataRoute.Sitemap[0]["changeFrequency"]>;
    priority: number;
    lastModified?: Date;
  }
): MetadataRoute.Sitemap[number] {
  const base = getSiteUrl();
  const url = path === "/" ? base : `${base}${path}`;

  return {
    url,
    lastModified: options.lastModified ?? new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    toEntry("/", { changeFrequency: "weekly", priority: 1 }),
    toEntry("/about", { changeFrequency: "monthly", priority: 0.8 }),
    toEntry("/projects", { changeFrequency: "weekly", priority: 0.85 }),
    toEntry("/blog", { changeFrequency: "weekly", priority: 0.85 }),
    toEntry("/contact", { changeFrequency: "yearly", priority: 0.6 }),
    toEntry("/resume", { changeFrequency: "monthly", priority: 0.9 }),
  ];

  const blogs = await getAllBlogs();
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((post) => {
    const parsed = new Date(post.date);
    const lastModified = Number.isNaN(parsed.getTime()) ? undefined : parsed;

    return toEntry(`/blog/${post.slug}`, {
      changeFrequency: "monthly",
      priority: 0.65,
      lastModified,
    });
  });

  const projectRoutes: MetadataRoute.Sitemap = products.map((p) =>
    toEntry(`/projects/${p.slug}`, {
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
