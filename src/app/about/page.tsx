"use client";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { Metadata } from "next";
import Image from "next/image";
import { motion } from "framer-motion";
import About from "@/components/About";

export default function AboutPage() {
  return (
    <Container className="relative overflow-hidden">
      <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-12 lg:pt-24"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-emerald-500/50" />
          <span className="text-emerald-500 font-mono text-sm tracking-widest uppercase">
            A Story of Bytes and叙述
          </span>
        </div>
        
        <Heading className="text-4xl md:text-6xl lg:text-7xl mb-12 font-black leading-[1.1]">
          Crafting <span className="text-zinc-500 font-light">Narratives</span> <br />
          Through <span className="text-emerald-500">Code.</span>
        </Heading>
        
        <About />
      </motion.section>
    </Container>
  );
}
