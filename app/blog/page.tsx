import { getAllBlogMeta } from "@/lib/getAllBlogs";
import { BlogPageClient } from "./BlogPageClient";

export default async function BlogPage() {
  const blogs = await getAllBlogMeta();
  return <BlogPageClient blogs={blogs} />;
}
