"use client";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { WorkHistory } from "@/components/WorkHistory";
import { ResumeSkills } from "@/components/ResumeSkills";
import { motion, useScroll } from "framer-motion";
import { IconDownload, IconExternalLink, IconFileText, IconArrowRight } from "@tabler/icons-react";
import { useRef } from "react";

export default function ResumePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <Container className="relative overflow-visible pb-32" ref={containerRef}>
      {/* Dynamic Background Elements */}
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] bg-blue-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] -right-40 h-[600px] w-[600px] bg-sky-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      {/* Sidebar Progress Line (Visual Detail) */}
      <div className="fixed left-0 top-0 bottom-0 w-px bg-zinc-100 hidden lg:block overflow-hidden">
        <motion.div 
          style={{ scaleY: scrollYProgress }}
          className="w-full bg-gradient-to-b from-blue-500 to-sky-500 origin-top h-full"
        />
      </div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative pt-20 lg:pt-32"
      >
        {/* Header Metadata */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
                <IconFileText size={20} strokeWidth={1.5} />
              </div>
              <p className="text-xs font-normal uppercase tracking-[0.4em] text-zinc-400">
                Curriculum Vitae
              </p>
            </div>
            
            <Heading className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight">
              Support Engineering <br />
              <span className="text-brand-gradient">Meets Shipped Products.</span>
            </Heading>
          </div>

          <div className="flex flex-col gap-4 min-w-[280px]">
            <motion.a
              whileHover={{ x: 5 }}
              href="/Syed-Resume-New.pdf"
              target="_blank"
              className="flex items-center justify-between group bg-zinc-900 text-white pl-8 pr-4 py-4 rounded-2xl font-normal text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-zinc-800 shadow-2xl shadow-zinc-200"
            >
              Open Full PDF
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-sky-400 transition-colors">
                <IconExternalLink size={16} className="text-white" />
              </div>
            </motion.a>
            <motion.a
              whileHover={{ x: 5 }}
              href="/Syed-Resume-New.pdf"
              download
              className="flex items-center justify-between group bg-white text-zinc-900 pl-8 pr-4 py-4 rounded-2xl border border-zinc-200 font-normal text-[10px] uppercase tracking-[0.2em] transition-all hover:border-blue-500/50 shadow-lg shadow-zinc-100"
            >
              Download CV
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-zinc-50 group-hover:bg-blue-600 transition-all">
                <IconDownload size={16} className="text-blue-500 group-hover:text-white transition-colors" />
              </div>
            </motion.a>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-40">
          <div className="lg:col-span-8">
            <Paragraph className="text-xl md:text-2xl text-zinc-800 font-normal leading-relaxed max-w-3xl mb-10">
              Senior Support Engineer with deep expertise in <Highlight className="text-blue-700">Cloud Infrastructure</Highlight> — and a parallel track shipping real products through freelance since 2022.
            </Paragraph>
            <div className="h-px w-32 bg-gradient-to-r from-blue-500/30 to-transparent mb-10" />
            <Paragraph className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-2xl">
              I&apos;ve spent years inside AWS and HashiCorp infrastructure — resolving hard escalations, reading logs most engineers never see, and building tooling to prevent the next incident. Since 2022, I&apos;ve channelled that technical depth into Webifex Labs, delivering 20+ web products for clients with full-stack execution.
            </Paragraph>
          </div>
          
          <div className="lg:col-span-4 lg:pl-12 border-l border-zinc-100 hidden lg:block">
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-normal uppercase tracking-widest text-zinc-400 mb-2">Location</p>
                <p className="text-sm text-zinc-600">Australia (Remote-Capable)</p>
              </div>
              <div>
                <p className="text-[10px] font-normal uppercase tracking-widest text-zinc-400 mb-2">Availability</p>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <p className="text-sm text-zinc-600">Available for Freelance Projects</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-normal uppercase tracking-widest text-zinc-400 mb-2">Contact</p>
                <motion.a 
                  href="mailto:syed@example.com" 
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2 group"
                >
                  Get in Touch
                  <IconArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Core Sections */}
        <ResumeSkills />
        <WorkHistory />
      </motion.section>
    </Container>
  );
}
