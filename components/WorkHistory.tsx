"use client";

import React from "react";
import { timeline } from "@/constants/timeline";
import { Heading } from "./Heading";
import { motion } from "framer-motion";

type Category = {
  label: string;
  dotColor: string;
  tagClass: string;
};

const getCategory = (company: string): Category => {
  if (company.includes("HashiCorp")) {
    return {
      label: "Infra & Ops",
      dotColor: "bg-blue-500",
      tagClass: "text-blue-600 bg-blue-50/50 border-blue-100",
    };
  }
  if (company.includes("Amazon")) {
    return {
      label: "Cloud Solutions",
      dotColor: "bg-sky-500",
      tagClass: "text-sky-600 bg-sky-50/50 border-sky-100",
    };
  }
  if (company.includes("Webifex")) {
    return {
      label: "Founding Engineering",
      dotColor: "bg-indigo-500",
      tagClass: "text-indigo-600 bg-indigo-50/50 border-indigo-100",
    };
  }
  return {
    label: "Operations",
    dotColor: "bg-zinc-400",
    tagClass: "text-zinc-500 bg-zinc-50/50 border-zinc-100",
  };
};

export const WorkHistory = () => {
  return (
    <section className="relative mt-32 md:mt-48 pb-20">
      <header className="mb-20 md:mb-32">
        <div className="flex items-baseline gap-4 mb-6">
          <span className="font-mono text-[10px] text-zinc-300 uppercase tracking-[0.5em]">Section 02</span>
          <div className="h-px w-12 bg-zinc-100" />
        </div>
        <Heading as="h3" className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight mb-8">
          Career <span className="text-zinc-300 font-light italic">Milestones.</span>
        </Heading>
        <div className="max-w-xl">
          <p className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed font-sans italic">
            A chronological record of engineering leadership, platform stability, and technical excellence.
          </p>
        </div>
      </header>

      <div className="relative space-y-12">
        {/* Central Vertical Line */}
        <div className="absolute left-1 lg:left-[calc(160px+1.25rem)] top-0 bottom-0 w-[1px] bg-zinc-100 hidden lg:block" />

        {timeline.map((item, index) => {
          const category = getCategory(item.company);

          return (
            <motion.div
              key={`${item.company}-${index}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative lg:grid lg:grid-cols-[160px_1fr] lg:gap-10"
            >
              {/* Date / Meta (Desktop) */}
              <div className="hidden lg:flex flex-col items-end pt-2 text-right">
                <time className="font-mono text-xs text-zinc-400 group-hover:text-blue-500 transition-colors">
                  {item.date}
                </time>
                <span className={`inline-flex px-2 py-0.5 rounded border text-[9px] font-sans uppercase tracking-[0.2em] mt-3 ${category.tagClass}`}>
                  {category.label}
                </span>
              </div>

              {/* Main Column */}
              <div className="relative lg:pl-10">
                {/* Connector Dot */}
                <div className="absolute -left-[4.5px] top-[14px] h-2 w-2 rounded-full border border-white bg-zinc-200 group-hover:bg-blue-500 group-hover:scale-125 transition-all duration-300 hidden lg:block z-10" />

                {/* Mobile Header */}
                <div className="flex lg:hidden flex-wrap items-center gap-3 mb-4">
                  <time className="font-mono text-xs text-zinc-400">
                    {item.date}
                  </time>
                  <span className={`inline-flex px-2 py-0.5 rounded border text-[9px] font-sans uppercase tracking-[0.15em] ${category.tagClass}`}>
                    {category.label}
                  </span>
                </div>

                <div className="relative p-8 md:p-10 rounded-3xl bg-white border border-zinc-100 group-hover:border-blue-100 group-hover:shadow-xl group-hover:shadow-blue-500/5 transition-all duration-500">
                  <div className="mb-6">
                    <h4 className="font-heading text-xl md:text-2xl font-normal text-zinc-900 mb-2 group-hover:text-emerald-900 transition-colors">
                      {item.company}
                    </h4>
                    <p className="text-[11px] md:text-xs font-sans uppercase tracking-[0.25em] text-blue-600 font-medium">
                      {item.title}
                    </p>
                  </div>

                  <p className="text-sm md:text-base text-zinc-500 leading-relaxed mb-8 max-w-[60ch] font-sans">
                    {item.description}
                  </p>

                  <ul className="grid grid-cols-1 gap-y-4">
                    {item.responsibilities.map((resp, i) => (
                      <li key={i} className="flex gap-4 text-sm text-zinc-500 group-hover:text-zinc-600 transition-colors leading-snug">
                        <span className="mt-[7px] h-[2px] w-2 bg-zinc-200 shrink-0 group-hover:bg-blue-300 transition-colors" />
                        <span className="min-w-0">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
