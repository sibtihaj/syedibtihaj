import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/formatDate";
import { Prose } from "@/components/Prose";
import { Container } from "./Container";

export function BlogLayout({
  children,
  meta,
}: {
  children?: ReactNode;
  meta: {
    date: string;
    title: string;
    description?: string;
    image?: string;
    category?: string;
    tags?: string[];
  };
}) {
  return (
    <Container>
      <article className="mx-auto max-w-3xl">
        <Link href="/blog" className="ink-link rise inline-flex min-h-[44px] items-center text-sm">
          <span aria-hidden className="mr-2">
            &larr;
          </span>
          All articles
        </Link>

        <header className="mt-6 border-b border-rule pb-10">
          <p className="field-label rise" style={{ ["--rise-delay" as string]: "60ms" }}>
            {meta.category ?? "Article"}
          </p>
          <h1
            className="rise mt-4 text-[1.85rem] leading-[1.15] sm:text-[2.2rem] lg:text-[2.5rem]"
            style={{ ["--rise-delay" as string]: "120ms" }}
          >
            {meta.title}
          </h1>
          {meta.description ? (
            <p
              className="rise mt-5 text-[1.0625rem] leading-relaxed text-ink-body md:text-lg"
              style={{ ["--rise-delay" as string]: "180ms" }}
            >
              {meta.description}
            </p>
          ) : null}
          <p className="rise mt-6 text-sm text-ink-muted" style={{ ["--rise-delay" as string]: "220ms" }}>
            Published <time dateTime={meta.date}>{formatDate(meta.date)}</time> by Syed Ibtihaj
          </p>
        </header>

        <Prose className="mt-10">{children ?? null}</Prose>

        <footer className="mt-16 flex flex-col gap-5 border-t border-rule pt-10 sm:flex-row sm:items-center">
          <Image
            src="/images/headshot.jpeg"
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-ink/10"
          />
          <div className="text-[0.95rem] leading-relaxed text-ink-body">
            <p className="font-heading text-lg text-ink">Syed Ibtihaj</p>
            <p>
              Senior Product Support Engineer at CodeRabbit. I wrote this while supporting Terraform Enterprise at
              HashiCorp (IBM), for HashiCorp Support; it also lives on IBM Support.{" "}
              <Link href="/blog" className="ink-link">
                More articles
              </Link>
            </p>
          </div>
        </footer>
      </article>
    </Container>
  );
}
