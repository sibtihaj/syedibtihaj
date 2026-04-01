"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Paragraph } from "./Paragraph";
import { Heading } from "./Heading";
import { motion, AnimatePresence } from "framer-motion";
import type { BlogMeta } from "@/types/blog";

export const Blogs = ({ blogs }: { blogs: BlogMeta[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col space-y-4 max-w-4xl pt-10">
      {blogs.map((blog, index) => (
        <motion.div
          key={blog.slug}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative group border-b border-zinc-900 last:border-0"
        >
          <Link
            href={`/blog/${blog.slug}`}
            className="flex flex-col md:flex-row md:items-center justify-between py-12 px-4 rounded-2xl hover:bg-zinc-900/50 transition-all duration-300 relative z-10"
          >
            <div className="flex flex-col flex-1 gap-4">
              <div className="flex items-center gap-4">
                <span className="text-emerald-500 font-mono text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-emerald-500/10">
                  {blog.category || "Design"}
                </span>
                <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest">
                  {blog.date}
                </span>
              </div>
              
              <Heading
                as="h3"
                className="text-xl md:text-3xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors"
              >
                {blog.title}
              </Heading>
              
              <Paragraph className="text-zinc-500 group-hover:text-zinc-400 transition-colors max-w-2xl">
                {blog.description}
              </Paragraph>
            </div>
            
            <div className="hidden md:flex flex-col items-end gap-2 text-zinc-500 group-hover:text-zinc-200 transition-all duration-500">
              <div className="h-10 w-10 flex items-center justify-center rounded-full border border-zinc-800 group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all duration-500">
                <span className="text-xl">→</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                Read Post
              </span>
            </div>
          </Link>
          
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-emerald-500/[0.02] rounded-2xl pointer-events-none"
              />
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};
