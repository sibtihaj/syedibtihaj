import "server-only";

import glob from "fast-glob";
import * as path from "path";
import type { BlogMeta } from "@/types/blog";

async function importBlog(blogFileNames: string) {
  const { meta, default: component } = await import(
    /* webpackMode: "eager" */
    `../app/blog/${blogFileNames}`
  );
  return {
    slug: blogFileNames.replace(/(\/content)?\.mdx$/, ""),
    ...meta,
    component,
  };
}

export async function getAllBlogs() {
  let blogFileNames = await glob(["*.mdx", "*/content.mdx"], {
    cwd: path.join(process.cwd(), "app/blog"),
  });

  let blogs = await Promise.all(blogFileNames.map(importBlog));

  return blogs.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

/** Serializable article metadata (no MDX component), newest first. */
export async function getAllBlogMeta(): Promise<BlogMeta[]> {
  const blogs = await getAllBlogs();
  return blogs.map(({ slug, title, description, date, image, tags, category }) => ({
    slug,
    title,
    description,
    date,
    image,
    tags,
    category: typeof category === "string" ? category : undefined,
  }));
}
