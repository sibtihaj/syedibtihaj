"use client";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Blogs } from "@/components/Blogs";
import { motion } from "framer-motion";
import type { BlogMeta } from "@/types/blog";

type BlogPageClientProps = {
  blogs: BlogMeta[];
};

export function BlogPageClient({ blogs }: BlogPageClientProps) {
  return (
    <Container className="relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[500px] w-[500px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-6 lg:pt-14"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-blue-500/30" />
          <span className="text-emerald-700 font-mono text-[10px] tracking-[0.3em] uppercase font-medium">
            Support Engineering Notes
          </span>
        </div>

        <Heading className="text-4xl md:text-6xl lg:text-7xl mb-12 font-normal leading-[1.1]">
          Published <span className="text-brand-gradient italic">Support Articles</span> <br />
          From <span className="text-stone-400 font-light italic">Production Incidents.</span>
        </Heading>

        <Paragraph className="pb-10 text-lg md:text-xl text-zinc-500">
          These posts are based on real Terraform Enterprise support scenarios from my work at{" "}
          <Highlight className="bg-gradient-to-r from-blue-500/10 to-sky-500/10 text-blue-700">HashiCorp (now IBM)</Highlight>.
        </Paragraph>

        <Paragraph className="pb-10 text-sm text-zinc-500 leading-relaxed max-w-2xl">
          At the moment, this section contains only the three official support articles I authored. HashiCorp Support content migrated to IBM Support on April 1, 2026, and each post includes both source links below.
        </Paragraph>

        <Blogs blogs={blogs} />
      </motion.section>
    </Container>
  );
}
