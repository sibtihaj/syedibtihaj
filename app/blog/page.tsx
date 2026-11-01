import type { Metadata } from "next";
import { ArticleIndex } from "@/components/ArticleIndex";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { getAllBlogMeta } from "@/lib/getAllBlogs";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Terraform Enterprise support articles by Syed Ibtihaj, also published on HashiCorp Support and IBM Support.",
};

export default async function BlogPage() {
  const articles = await getAllBlogMeta();

  return (
    <Container>
      <PageIntro
        label="Articles"
        title={
          <>
            Support articles I have published <span className="ink-text italic">publicly</span>.
          </>
        }
      >
        <p>
          I have written many more articles that were only published for customers inside support and internal
          knowledge bases. This page is limited to pieces that also appear on the public HashiCorp and IBM support
          sites, and they draw on real Terraform Enterprise scenarios from my work at HashiCorp (now IBM).
        </p>
        <p className="text-base text-ink-muted">
          HashiCorp Support content moved to IBM Support on April 1, 2026, so each article links to both.
        </p>
      </PageIntro>

      <ArticleIndex articles={articles} headingLevel="h2" />
    </Container>
  );
}
