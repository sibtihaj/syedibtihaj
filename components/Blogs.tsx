"use client";
import React from "react";
import Link from "next/link";
import { Paragraph } from "./Paragraph";
import { Heading } from "./Heading";
import { motion } from "framer-motion";
import type { BlogMeta } from "@/types/blog";

/** Inset shadow on card hover/focus/active: forest green (#2D5A43) tint, pale sage-adjacent fill */
const cardInsetInteractive =
  "hover:shadow-[inset_0_2px_28px_rgba(45,90,67,0.09),inset_0_0_0_1px_rgba(45,90,67,0.1)] hover:border-emerald-800/20 hover:bg-[#f4f7f4] " +
  "focus-visible:outline-none focus-visible:shadow-[inset_0_2px_28px_rgba(45,90,67,0.09),inset_0_0_0_1px_rgba(45,90,67,0.1)] focus-visible:border-emerald-800/20 focus-visible:bg-[#f4f7f4] " +
  "active:shadow-[inset_0_3px_36px_rgba(45,90,67,0.13),inset_0_0_0_1px_rgba(45,90,67,0.14)]";

export const Blogs = ({ blogs }: { blogs: BlogMeta[] }) => {
  return (
    <div className="grid grid-cols-1 gap-6 pt-10 md:grid-cols-2 md:gap-8 lg:gap-10">
      {blogs.map((blog, index) => (
        <motion.div
          key={blog.slug}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: index * 0.06 }}
          className="relative flex min-h-0 h-full"
        >
          <Link
            href={`/blog/${blog.slug}`}
            className={`group relative z-10 flex min-h-full w-full flex-col rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all duration-300 ease-out ${cardInsetInteractive} active:scale-[0.995] md:p-8`}
          >
            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-emerald-700 shadow-sm ring-1 ring-emerald-100 bg-emerald-50 px-2.5 py-1 rounded-full transition-colors group-hover:bg-emerald-100/80 group-hover:ring-emerald-200">
                {blog.category || "Design"}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-stone-400">
                {blog.date}
              </span>
            </div>

            <Heading
              as="h3"
              className="mb-3 text-lg font-normal leading-snug text-stone-900 transition-colors group-hover:text-emerald-900 md:text-xl lg:text-[1.35rem] lg:leading-tight"
            >
              {blog.title}
            </Heading>

            <Paragraph className="min-h-0 flex-1 text-sm leading-relaxed text-stone-500 transition-colors group-hover:text-stone-600 md:text-[0.9375rem]">
              {blog.description}
            </Paragraph>

            <div className="mt-6 flex items-center justify-end border-t border-zinc-100/80 pt-5 transition-colors group-hover:border-emerald-800/10">
              <div className="flex items-center gap-3 text-stone-400 transition-colors duration-300 group-hover:text-emerald-800">
                <span className="text-[10px] font-normal uppercase tracking-[0.2em] opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Read post
                </span>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 transition-all duration-300 group-hover:border-emerald-700 group-hover:bg-emerald-800 group-hover:text-white group-hover:shadow-sm">
                  <span className="text-lg" aria-hidden>
                    →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
