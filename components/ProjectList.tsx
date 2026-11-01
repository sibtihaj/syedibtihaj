import Image from "next/image";
import Link from "next/link";
import { products } from "@/constants/products";
import { cn } from "@/lib/utils";

function liveUrl(href: string | undefined) {
  if (!href || !/^https?:\/\//.test(href)) return null;
  return href;
}

/**
 * Editorial list of projects: screenshot and notes side by side, alternating
 * sides on wide screens so the two builds read as separate pieces of work.
 */
export const ProjectList = ({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) => {
  const Title = headingLevel;

  return (
    <div className="divide-y divide-rule">
      {products.map((product, idx) => {
        const detailHref = product.slug ? `/projects/${product.slug}` : product.href;
        const live = liveUrl(product.href);
        const flipped = idx % 2 === 1;

        return (
          <article
            key={product.slug ?? product.title}
            className="grid items-center gap-8 py-12 first:pt-2 last:pb-0 md:grid-cols-12 md:gap-10"
          >
            <Link
              href={detailHref}
              tabIndex={-1}
              aria-hidden
              className={cn("group block md:col-span-7", flipped && "md:order-2")}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-ink/10 bg-paper shadow-[0_24px_50px_-30px_rgba(13,27,62,0.45)]">
                {product.Banner ? (
                  <product.Banner className="absolute inset-0 h-full transition-transform duration-700 ease-ink group-hover:scale-[1.02]" />
                ) : (
                  <Image
                    src={product.thumbnail}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 560px, (min-width: 768px) 58vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 ease-ink group-hover:scale-[1.025]"
                  />
                )}
              </div>
            </Link>

            <div className={cn("md:col-span-5", flipped && "md:order-1")}>
              {product.Banner ? null : (
                <p className="font-heading text-lg italic text-cobalt">
                  No. {String(idx + 1).padStart(2, "0")}
                </p>
              )}
              <Title className="mt-2 text-[1.5rem] leading-snug md:text-[1.65rem]">
                <Link href={detailHref} className="transition-colors hover:text-cobalt">
                  {product.title}
                </Link>
              </Title>
              <p className="mt-4 leading-relaxed text-ink-body">{product.description}</p>
              {product.stack?.length ? (
                <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                  {product.stack.join(" · ")}
                </p>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem]">
                <Link href={detailHref} className="ink-link inline-flex min-h-[44px] items-center">
                  Read the case study
                </Link>
                {live ? (
                  <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ink-link inline-flex min-h-[44px] items-center"
                  >
                    Open the live app
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
