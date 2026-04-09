"use client";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Projects() {
  return (
    <Container className="relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[500px] w-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-6 lg:pt-14"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-blue-500/30" />
          <span className="text-emerald-700 font-mono text-[10px] tracking-[0.3em] uppercase font-medium">
            Curated Work
          </span>
        </div>
        
        <Heading className="text-4xl md:text-6xl lg:text-7xl mb-12 font-normal leading-[1.1]">
          Selected <span className="text-brand-gradient italic">Case Studies</span> <br />
          & Projects.
        </Heading>

        <Paragraph className="max-w-2xl text-zinc-500 mb-12 text-base leading-relaxed">
          I&apos;ve started publishing more builds on{" "}
          <Link
            href="https://github.com/sibtihaj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline"
          >
            GitHub
          </Link>{" "}
          and using this page as the narrative layer—expect this section (and the repos behind it) to stay current as I keep the portfolio maintained.
        </Paragraph>

        <Products />
      </motion.section>
    </Container>
  );
}
