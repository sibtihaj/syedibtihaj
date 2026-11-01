import Link from "next/link";
import { formatDate } from "@/lib/formatDate";
import type { BlogMeta } from "@/types/blog";

/**
 * Index of published support articles: date, title and summary in a ruled list,
 * the way a knowledge base lists its entries.
 */
export const ArticleIndex = ({
  articles,
  headingLevel = "h3",
}: {
  articles: BlogMeta[];
  headingLevel?: "h2" | "h3";
}) => {
  const Title = headingLevel;

  if (articles.length === 0) {
    return <p className="text-ink-muted">No articles are published here yet.</p>;
  }

  return (
    <ol className="-mt-4 border-b border-rule">
      {articles.map((article) => (
        <li key={article.slug} className="border-t border-rule first:border-t-0">
          <Link
            href={`/blog/${article.slug}`}
            className="group grid gap-2 py-7 md:grid-cols-[9.5rem_minmax(0,1fr)] md:gap-10"
          >
            <time dateTime={article.date} className="pt-1 text-sm tabular-nums text-ink-muted">
              {formatDate(article.date)}
            </time>
            <div>
              <Title className="text-[1.3rem] leading-snug transition-colors duration-200 group-hover:text-cobalt md:text-[1.4rem]">
                {article.title}
              </Title>
              <p className="mt-2 max-w-measure leading-relaxed text-ink-body">{article.description}</p>
              {article.category ? (
                <p className="mt-3 text-sm text-ink-muted">{article.category}</p>
              ) : null}
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
};
