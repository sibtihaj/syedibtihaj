"use client";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import { motion } from "framer-motion";
import Link from "next/link";

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
      <div className="absolute -top-24 -left-24 h-[500px] w-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -right-24 h-[400px] w-[400px] bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.section 
        variants={stagger}
        initial="initial"
        animate="animate"
        className="relative pt-6 lg:pt-14"
      >
        <motion.div variants={fadeInUp}>
          <Heading className="text-4xl md:text-6xl lg:text-7xl mb-8 leading-[1.1]">
            Hello. I&apos;m <span className="text-brand-gradient italic">Syed.</span>
          </Heading>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Paragraph className="max-w-xl text-lg md:text-xl text-stone-700 mb-6 leading-relaxed">
            I&apos;m a full-stack developer that loves{" "}
            <Highlight className="bg-emerald-500/10 text-emerald-800 px-2 py-0.5 rounded-md">building products</Highlight> and web apps that can impact
            millions of lives.
          </Paragraph>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Paragraph className="max-w-xl text-base text-stone-500 mb-6">
            I&apos;m a senior software engineer with{" "}
            <Highlight className="bg-stone-200/50 text-stone-800 px-2 py-0.5 rounded-md">7 years of experience</Highlight> building scalable web apps
            that are performance optimized and visually striking.
          </Paragraph>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Paragraph className="max-w-xl text-sm text-stone-500 mb-12 leading-relaxed">
            Lately I&apos;ve been more deliberate about visibility: I&apos;m putting selected work on{" "}
            <Link
              href="https://github.com/sibtihaj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 underline-offset-4 hover:underline font-medium"
            >
              GitHub
            </Link>{" "}
            and treating this portfolio as a living site I plan to refresh and maintain regularly.
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
            Selected <span className="text-stone-400 font-light italic">Works</span>
          </Heading>
          <div className="h-px flex-1 bg-stone-200 mx-8 hidden md:block" />
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
