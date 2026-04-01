"use client";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { WorkHistory } from "@/components/WorkHistory";
import { ResumeSkills } from "@/components/ResumeSkills";
import { motion } from "framer-motion";
import { IconDownload, IconExternalLink } from "@tabler/icons-react";

export default function ResumePage() {
  return (
    <Container className="relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[500px] w-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-12 lg:pt-24"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-blue-500/30" />
          <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent font-mono text-sm tracking-widest uppercase">
            Curriculum Vitae
          </span>
        </div>
        
        <Heading className="text-4xl md:text-6xl lg:text-7xl mb-12 font-normal leading-[1.1]">
          The <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Professional</span> <br />
          Experience.
        </Heading>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <Paragraph className="text-lg md:text-xl text-zinc-700 mb-4">
              I&apos;m a <Highlight className="bg-gradient-to-r from-blue-500/10 to-sky-500/10 text-blue-700">Senior Software Engineer</Highlight> with
              expertise in building complex, distributed systems and high-performance web applications.
            </Paragraph>
            <Paragraph className="text-zinc-500">
              Passionate about creating scalable architecture, mentoring teams, and delivering pixel-perfect user experiences that drive business value.
            </Paragraph>
          </div>

          <div className="flex flex-wrap gap-4 h-fit">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/Syed-Resume-New.pdf"
              target="_blank"
              className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-3.5 rounded-2xl font-normal text-sm uppercase tracking-widest transition-all hover:bg-zinc-800 shadow-xl shadow-zinc-200 group"
            >
              Open Full PDF <IconExternalLink size={18} className="text-sky-400 group-hover:text-sky-300 transition-colors" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02, backgroundColor: "#f4f4f5" }}
              whileTap={{ scale: 0.98 }}
              href="/Syed-Resume-New.pdf"
              download
              className="flex items-center gap-2 bg-white text-zinc-900 border border-zinc-200 px-6 py-3.5 rounded-2xl font-normal text-sm uppercase tracking-widest transition-all hover:border-blue-500/50 shadow-lg shadow-zinc-100 group"
            >
              Download CV <IconDownload size={18} className="text-blue-500 group-hover:text-blue-600 transition-colors" />
            </motion.a>
          </div>
        </div>

        <ResumeSkills />
        <WorkHistory />
      </motion.section>
    </Container>
  );
}
