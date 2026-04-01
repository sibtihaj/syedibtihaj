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
        className="relative pt-12 lg:pt-24"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-emerald-500/50" />
          <span className="text-emerald-500 font-mono text-sm tracking-widest uppercase">
            Thinking & Writing
          </span>
        </div>

        <Heading className="text-4xl md:text-6xl lg:text-7xl mb-12 font-black leading-[1.1]">
          I Write About <span className="text-emerald-500">Technology</span> <br />
          And <span className="text-zinc-500 font-light">Craftsmanship.</span>
        </Heading>

        <Paragraph className="pb-10 text-lg md:text-xl text-zinc-400">
          Ever since <Highlight>I was a kid</Highlight>, I&apos;ve been fascinated
          by how things work under the hood.
        </Paragraph>

        <Blogs blogs={blogs} />
      </motion.section>
    </Container>
  );
}
