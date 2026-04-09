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
            Product support writing
          </span>
        </div>

        <Heading className="text-2xl md:text-3xl lg:text-4xl mb-4 font-normal leading-[1.15]">
          Product support articles I have published{" "}
          <span className="text-brand-gradient italic">publicly</span>.
        </Heading>

        <Paragraph className="pb-8 text-sm md:text-base text-stone-600 leading-relaxed max-w-2xl">
          I have authored many more articles that were published only for customers inside support and internal knowledge bases. This page is limited to pieces that also appear on the public HashiCorp and IBM support sites.
        </Paragraph>

        <Paragraph className="pb-10 text-lg md:text-xl text-zinc-500">
          These posts draw on real Terraform Enterprise scenarios from my work at{" "}
          <Highlight>HashiCorp (now IBM)</Highlight>.
        </Paragraph>

        <Paragraph className="pb-10 text-sm text-zinc-500 leading-relaxed max-w-2xl">
          Below are the three official support articles mirrored here for my portfolio. HashiCorp Support content migrated to IBM Support on April 1, 2026; each post includes both source links at the bottom.
        </Paragraph>

        <Blogs blogs={blogs} />
      </motion.section>
    </Container>
  );
}
