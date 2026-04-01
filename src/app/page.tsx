"use client";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import { motion } from "framer-motion";

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <Container className="relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -left-24 h-[500px] w-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -right-24 h-[400px] w-[400px] bg-sky-500/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.section 
        variants={stagger}
        initial="initial"
        animate="animate"
        className="relative pt-12 lg:pt-24"
      >
        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-blue-500/30" />
          <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent font-mono text-sm tracking-widest uppercase">
            Available for new opportunities
          </span>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Heading className="text-4xl md:text-6xl lg:text-7xl mb-8 leading-[1.1]">
            Hello there! I&apos;m <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Syed</span>
          </Heading>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Paragraph className="max-w-xl text-lg md:text-xl text-zinc-700 mb-6 leading-relaxed">
            I&apos;m a full-stack developer that loves{" "}
            <Highlight className="bg-gradient-to-r from-blue-500/10 to-sky-500/10 text-blue-700">building products</Highlight> and web apps that can impact
            millions of lives.
          </Paragraph>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Paragraph className="max-w-xl text-base text-zinc-500 mb-12">
            I&apos;m a senior software engineer with{" "}
            <Highlight className="bg-zinc-100 text-zinc-800">7 years of experience</Highlight> building scalable web apps
            that are performance optimized and good looking.
          </Paragraph>
        </motion.div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div className="flex items-end justify-between mb-12">
          <Heading
            as="h2"
            className="text-2xl md:text-3xl lg:text-4xl font-normal"
          >
            Selected <span className="text-zinc-400 font-light">Works</span>
          </Heading>
          <div className="h-px flex-1 bg-zinc-100 mx-8 hidden md:block" />
        </div>
        
        <Products />
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-32"
      >
        <TechStack />
      </motion.section>
    </Container>
  );
}
