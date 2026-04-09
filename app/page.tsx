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
          <Heading className="text-2xl md:text-3xl lg:text-4xl mb-8 leading-[1.15]">
            Hello. I&apos;m <span className="text-brand-gradient italic">Syed.</span>
          </Heading>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Paragraph className="max-w-2xl text-lg md:text-xl text-stone-700 mb-6 leading-relaxed">
            I&apos;m Syed, a Senior Product Support Engineer at HashiCorp (now IBM), deep in Terraform Enterprise with
            enterprises across AWS, Azure, and GCP. My
            week is the space between what a team meant to deploy and what still runs after upgrades, credentials,
            data dependencies, and real on call pressure. I am deliberately steering toward{" "}
            <Highlight className="bg-stone-200/50 text-stone-800 px-2 py-0.5 rounded-md">
              Solutions Architecture
            </Highlight>
            , grounded in university studies in cybersecurity, a career path that has consistently looked like DevOps
            and site reliability engineering in enterprise settings, and the AI oriented product work I have shipped
            through Webifex Labs. The bar I am aiming for is clearer tradeoffs with customers, designs that survive
            production, and roadmaps that stay honest about risk.
          </Paragraph>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Paragraph className="max-w-2xl text-base text-stone-600 mb-6 leading-relaxed">
            I am also a full stack builder. Through Webifex Labs I have shipped many production web apps over{" "}
            <span className="text-stone-800 font-medium">six plus years</span> in the cloud. On this site that shows up
            as{" "}
            <Link
              href="/projects/ai-incident-assistant"
              className="text-emerald-700 underline-offset-4 hover:underline font-medium"
            >
              AI Incident Assistant
            </Link>{" "}
            (authenticated incident playground, MCP backed tools, Supabase sessions, gateway routed models) and{" "}
            <Link
              href="/projects/ib-scheduling"
              className="text-emerald-700 underline-offset-4 hover:underline font-medium"
            >
              IB Scheduling
            </Link>{" "}
            (Go API on Railway, Supabase Auth and Postgres, OIDC verified JWTs, Prometheus and Grafana). The{" "}
            <Link href="/blog" className="text-emerald-700 underline-offset-4 hover:underline font-medium">
              blog
            </Link>{" "}
            holds a small set of Terraform Enterprise support articles I also published on the public HashiCorp and IBM
            knowledge bases, so the writing matches the work.
          </Paragraph>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Paragraph className="max-w-2xl text-sm text-stone-500 mb-12 leading-relaxed">
            I am being more deliberate about visibility: selected code lives on{" "}
            <Link
              href="https://github.com/sibtihaj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 underline-offset-4 hover:underline font-medium"
            >
              GitHub
            </Link>
            , and I treat this portfolio as a living site I refresh as the story and the builds move forward.
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
            className="text-lg md:text-xl lg:text-2xl font-normal"
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
