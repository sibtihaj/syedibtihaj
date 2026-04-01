"use client";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Products } from "@/components/Products";
import { motion } from "framer-motion";

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
          <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent font-mono text-sm tracking-widest uppercase">
            Curated Work
          </span>
        </div>
        
        <Heading className="text-4xl md:text-6xl lg:text-7xl mb-12 font-normal leading-[1.1]">
          Selected <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Case Studies</span> <br />
          & Projects.
        </Heading>

        <Products />
      </motion.section>
    </Container>
  );
}
