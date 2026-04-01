import { getAllBlogs } from "../../../lib/getAllBlogs";
import { BlogPageClient } from "./BlogPageClient";
import type { BlogMeta } from "@/types/blog";

export default async function BlogPage() {
  const blogsRaw = await getAllBlogs();
  const blogs: BlogMeta[] = blogsRaw.map((entry) => {
    const { slug, title, description, date, image, tags, category } = entry;
    return {
      slug,
      title,
      description,
      date,
      image,
      tags,
      category: typeof category === "string" ? category : undefined,
    };
  });

  return <BlogPageClient blogs={blogs} />;
}
