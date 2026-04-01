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
          <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent font-mono text-sm tracking-widest uppercase">
            Thinking & Writing
          </span>
        </div>

        <Heading className="text-4xl md:text-6xl lg:text-7xl mb-12 font-normal leading-[1.1]">
          I Write About <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Technology</span> <br />
          And <span className="text-zinc-400 font-light">Craftsmanship.</span>
        </Heading>

        <Paragraph className="pb-10 text-lg md:text-xl text-zinc-500">
          Ever since <Highlight className="bg-gradient-to-r from-blue-500/10 to-sky-500/10 text-blue-700">I was a kid</Highlight>, I&apos;ve been fascinated
          by how things work under the hood.
        </Paragraph>

        <Paragraph className="pb-10 text-sm text-zinc-500 leading-relaxed max-w-2xl">
          Going forward I&apos;m keeping this writing section and my GitHub in sync with what I actually ship—same habit as the rest of the portfolio: update often, not just at launch.
        </Paragraph>

        <Blogs blogs={blogs} />
      </motion.section>
    </Container>
  );
}
