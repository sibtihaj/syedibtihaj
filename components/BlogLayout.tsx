"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatDate } from "@/lib/formatDate";
import { Prose } from "@/components/Prose";
import { Container } from "./Container";
import { Heading } from "./Heading";
import Link from "next/link";
import { Paragraph } from "./Paragraph";

function ArrowLeftIcon(props: any) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
    </svg>
  );
}

export function BlogLayout({
  children,
  meta,
}: any) {
  return (
    <Container>
      <article className="max-w-4xl mx-auto">
        <header className="flex flex-col mb-16">
          <Link
            href="/blog"
            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-zinc-200 shadow-sm transition hover:border-blue-300 hover:text-blue-600"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-blue-600 font-mono text-[10px] uppercase tracking-widest font-normal px-3 py-1 rounded-full bg-blue-50 ring-1 ring-blue-100">
              {meta.category || "Perspective"}
            </span>
            <span className="h-px w-8 bg-zinc-100" />
            <time
              dateTime={meta.date}
              className="text-xs uppercase tracking-widest font-normal text-zinc-400"
            >
              {formatDate(meta.date)}
            </time>
          </div>

          <Heading className="text-2xl md:text-3xl lg:text-4xl font-normal leading-tight mb-12">
            {meta.title}
          </Heading>

          <div className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-100 shadow-2xl shadow-zinc-200/50">
            <Image
              src={meta.image}
              alt={meta.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        <Prose className="mt-8">
          {children}
        </Prose>

        <footer className="mt-20 pt-20 border-t border-zinc-100">
          <div className="flex flex-col items-center text-center max-w-lg mx-auto">
            <div className="h-12 w-12 rounded-full overflow-hidden mb-4 ring-2 blue-500/20 shadow-lg">
              <Image src="/images/headshot.jpeg" alt="Syed" width={48} height={48} />
            </div>
            <p className="text-xs font-normal uppercase tracking-[0.2em] text-zinc-900 mb-2">Syed Ibtihaj</p>
            <Paragraph className="text-sm text-zinc-500">
              Building the future of software, one pixel at a time. Follow my journey on LinkedIn or reach out for collaborations.
            </Paragraph>
          </div>
        </footer>
      </article>
    </Container>
  );
}
