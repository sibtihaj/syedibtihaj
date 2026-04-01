"use client";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { WorkHistory } from "@/components/WorkHistory";
import { ResumeSkills } from "@/components/ResumeSkills";
import { motion } from "framer-motion";

const RESUME_PATH = "/Syed-Resume-New.pdf";

export default function ResumePage() {
  return (
    <Container className="relative overflow-hidden">
      <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-12 lg:pt-24 max-w-4xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-emerald-500/50" />
          <span className="text-emerald-500 font-mono text-sm tracking-widest uppercase">
            Curriculum Vitae
          </span>
        </div>
        
        <Heading className="text-4xl md:text-6xl lg:text-7xl mb-12 font-black leading-[1.1]">
          Career <span className="text-zinc-500 font-light">History</span> <br />
          & <span className="text-emerald-500">Expertise.</span>
        </Heading>

        <Paragraph className="max-w-3xl text-lg md:text-xl text-zinc-300 leading-relaxed mb-8">
          Technical Support Engineer with <Highlight className="bg-emerald-500/20 text-emerald-300">6+ years</Highlight> architecting and troubleshooting complex infrastructure integrations across Terraform Enterprise, Kubernetes, and AWS platforms.
        </Paragraph>
        
        <div className="flex items-center gap-6 mt-10 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 backdrop-blur-sm">
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/10"
          >
            Open Full PDF 
            <span className="text-xl">↗</span>
          </a>
          <a 
            href={RESUME_PATH} 
            download 
            className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-emerald-500 transition-colors"
          >
            Download CV
          </a>
        </div>

        <ResumeSkills />
        
        <div className="mt-32 border-t border-zinc-900 pt-20">
          <WorkHistory />
        </div>
      </motion.section>
    </Container>
  );
}
