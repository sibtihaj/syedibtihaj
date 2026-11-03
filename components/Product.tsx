import Link from "next/link";
import type { Product } from "@/types/products";
import { ActionLink } from "./ActionLink";
import { ProjectGallery } from "./ProjectGallery";

function getExternalCta(href: string | undefined): { url: string; label: string } | null {
  const trimmed = href?.trim();
  if (!trimmed || trimmed === "#") return null;
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
  return {
    url: trimmed,
    label: parsed.hostname === "github.com" ? "View on GitHub" : "Open the live app",
  };
}

export const SingleProduct = ({ product }: { product: Product }) => {
  const externalCta = getExternalCta(product.href);
  const hasScreenshots = product.images.length > 0;

  return (
    <article>
      <nav aria-label="Breadcrumb" className="rise text-sm text-ink-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/projects" className="ink-link">
              Projects
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-ink">
            {product.title}
          </li>
        </ol>
      </nav>

      <header className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <h1
            className="rise max-w-3xl text-[2rem] leading-[1.1] sm:text-[2.4rem] lg:text-[2.75rem]"
            style={{ ["--rise-delay" as string]: "80ms" }}
          >
            {product.title}
          </h1>
          <p
            className="rise mt-6 max-w-measure text-[1.0625rem] leading-relaxed text-ink-body md:text-lg"
            style={{ ["--rise-delay" as string]: "160ms" }}
          >
            {product.description}
          </p>
        </div>
        {externalCta ? (
          <div className="rise" style={{ ["--rise-delay" as string]: "220ms" }}>
            <ActionLink href={externalCta.url}>
              {externalCta.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </ActionLink>
          </div>
        ) : null}
      </header>

      {product.stack?.length ? (
        <dl className="rise mt-8 border-y border-rule py-4" style={{ ["--rise-delay" as string]: "260ms" }}>
          <dt className="field-label">Built with</dt>
          <dd className="mt-1 text-[0.95rem] text-ink">{product.stack.join(" · ")}</dd>
        </dl>
      ) : null}

      {product.Banner ? (
        <>
          <div
            className="rise mt-10 overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-[0_30px_60px_-36px_rgba(13,27,62,0.5)]"
            style={{ ["--rise-delay" as string]: "320ms" }}
          >
            <product.Banner />
          </div>
          {hasScreenshots ? (
            <section aria-labelledby="screenshots" className="mt-16">
              <h2 id="screenshots" className="text-[1.5rem]">
                {externalCta ? "The live app" : "Screenshots"}
              </h2>
              <p className="mb-6 mt-2 text-ink-muted">Screenshots from the running build.</p>
              <ProjectGallery images={product.images} title={product.title} />
            </section>
          ) : null}
        </>
      ) : hasScreenshots ? (
        <div className="rise mt-10" style={{ ["--rise-delay" as string]: "320ms" }}>
          <ProjectGallery images={product.images} title={product.title} />
        </div>
      ) : null}

      <div className="case-study prose max-w-none mt-16 md:mt-20">{product.content}</div>
    </article>
  );
};
