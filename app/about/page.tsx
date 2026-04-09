"use client";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { motion } from "framer-motion";
import About from "@/components/About";

export default function AboutPage() {
  return (
    <Container className="relative overflow-hidden">
      <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-6 lg:pt-14"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-blue-500/30" />
          <span className="text-emerald-700 font-mono text-[10px] tracking-[0.3em] uppercase font-medium">
            Support Engineer. Product Builder.
          </span>
        </div>

        <Heading className="text-4xl md:text-6xl lg:text-7xl mb-12 font-normal leading-[1.1]">
          Deep in the Cloud <span className="text-stone-400 font-light italic">by Day,</span> <br />
          Shipping Products <span className="text-brand-gradient italic">by Night.</span>
        </Heading>
        
        <About />
      </motion.section>
    </Container>
  );
}
