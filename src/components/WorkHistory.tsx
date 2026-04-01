"use client";

import React from "react";
import { timeline } from "@/constants/timeline";
import { HEADING_FONT } from "@/config/typography";
import { Heading } from "./Heading";
import { motion } from "framer-motion";

const headingFontClass =
  HEADING_FONT === "manrope" ? "font-manrope" : "font-plein";

type Category = {
  label: string;
  textClass: string;
  ringClass: string;
};

const getCategory = (company: string): Category => {
  if (company.includes("HashiCorp")) {
    return {
      label: "Infrastructure",
      textClass: "text-blue-700",
      ringClass: "ring-blue-500/15",
    };
  }
  if (company.includes("Amazon")) {
    return {
      label: "Cloud support",
      textClass: "text-sky-700",
      ringClass: "ring-sky-500/15",
    };
  }
  if (company.includes("Webifex")) {
    return {
      label: "Studio",
      textClass: "text-indigo-700",
      ringClass: "ring-indigo-500/15",
    };
  }
  return {
    label: "Operations",
    textClass: "text-zinc-600",
    ringClass: "ring-zinc-400/15",
  };
};

type TimelineItem = (typeof timeline)[number];

function TimelineEntry({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) {
  const category = getCategory(item.company);
  const isPresent = item.date.includes("Present");
  const idx = String(index + 1).padStart(2, "0");
  const inset = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative ${inset ? "lg:ml-10 xl:ml-16" : ""}`}
    >
      <span
        className={`pointer-events-none absolute -left-1 md:left-0 top-0 ${headingFontClass} text-[clamp(3.5rem,14vw,9rem)] font-normal leading-none text-zinc-100/90 transition-colors duration-500 group-hover:text-blue-50/80 select-none z-0`}
        aria-hidden
      >
        {idx}
      </span>

      <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,11rem)_1fr] lg:gap-10">
        <div className="flex lg:flex-col lg:items-start gap-4 lg:pt-2">
          <div className="flex lg:flex-col items-center lg:items-stretch gap-3 lg:gap-4 w-full lg:w-auto">
            <div className="hidden lg:block h-2 w-2 rotate-45 border border-zinc-300 bg-white shadow-sm group-hover:border-blue-400 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-sky-400 transition-all duration-500 shrink-0" />
            <div className="h-px flex-1 lg:hidden bg-zinc-200 group-hover:bg-blue-200/60 transition-colors" />
            <div className="flex flex-col gap-2 lg:border-l lg:border-zinc-200 lg:pl-5 lg:ml-1 group-hover:border-blue-200/80 transition-colors">
              <div className="flex items-center gap-2 flex-wrap">
                {isPresent && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                  </span>
                )}
                <time
                  dateTime={item.date}
                  className="font-mono text-[11px] md:text-xs text-zinc-500 tracking-wide group-hover:text-zinc-700 transition-colors"
                >
                  {item.date}
                </time>
              </div>
              <span
                className={`w-fit rounded-full px-2.5 py-1 text-[9px] font-ubuntu uppercase tracking-[0.2em] ring-1 ${category.textClass} ${category.ringClass} bg-white/80 backdrop-blur-sm`}
              >
                {category.label}
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/12 via-transparent to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/75 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_12px_40px_-24px_rgba(15,23,42,0.12)] transition-shadow duration-500 group-hover:shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_20px_50px_-20px_rgba(59,130,246,0.12)]">
            <div
              className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-zinc-100/50 to-transparent pointer-events-none"
              aria-hidden
            />
            <div className="relative p-6 md:p-8 lg:p-9">
              <header className="mb-5 md:mb-6">
                <h4
                  className={`${headingFontClass} text-xl md:text-2xl font-normal text-zinc-900 tracking-tight group-hover:text-blue-950 transition-colors`}
                >
                  {item.company}
                </h4>
              </header>

              <p className="text-[10px] md:text-[11px] font-ubuntu uppercase tracking-[0.22em] text-blue-600/90 mb-4">
                {item.title}
              </p>

              <p className="text-sm md:text-[15px] text-zinc-600 leading-relaxed mb-6 md:mb-8 max-w-prose border-l-2 border-zinc-100 pl-4 group-hover:border-blue-200/70 transition-colors">
                {item.description}
              </p>

              <ul className="grid gap-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3.5">
                {item.responsibilities.map((resp, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-zinc-600 leading-snug"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 bg-zinc-300 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-sky-400 transition-all duration-300"
                      aria-hidden
                    />
                    <span className="min-w-0">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export const WorkHistory = () => {
  const total = timeline.length;

  return (
    <section className="relative mt-16 md:mt-24 pb-28 md:pb-36">
      <div
        className="pointer-events-none absolute -inset-x-8 -top-8 bottom-0 opacity-[0.45]"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,transparent_40%,rgba(59,130,246,0.04)_50%,transparent_60%)]" />
        <div className="absolute left-[12%] top-0 h-full w-px bg-gradient-to-b from-transparent via-zinc-200/80 to-transparent" />
        <div className="absolute right-[8%] top-1/4 h-1/2 w-px bg-gradient-to-b from-transparent via-sky-200/40 to-transparent hidden lg:block" />
      </div>

      <div className="relative mb-14 md:mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-400 mb-4">
            Professional record
          </p>
          <Heading
            as="h3"
            className="text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.05] tracking-tight"
          >
            <span className="text-zinc-900">Career</span>{" "}
            <span className="text-zinc-300 font-light italic">trajectory</span>
          </Heading>
          <p className="mt-5 text-sm text-zinc-500 leading-relaxed max-w-md font-ubuntu">
            {total} engagements spanning platform support, cloud escalation, and
            independent product delivery — condensed for scanability, expanded on
            demand.
          </p>
        </div>

        <div className="flex items-baseline gap-3 lg:flex-col lg:items-end lg:text-right">
          <span
            className={`${headingFontClass} text-6xl md:text-7xl lg:text-8xl font-normal tabular-nums text-zinc-100 select-none leading-none`}
            aria-hidden
          >
            {String(total).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400">
            entries indexed
          </span>
        </div>
      </div>

      <div className="relative space-y-8 md:space-y-10 lg:space-y-12">
        {timeline.map((item, index) => (
          <TimelineEntry key={`${item.company}-${item.date}-${index}`} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};
