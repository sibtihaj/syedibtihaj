"use client";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { WorkHistory } from "@/components/WorkHistory";
import { ResumeSkills } from "@/components/ResumeSkills";
import { motion } from "framer-motion";
import { IconDownload, IconExternalLink, IconFileText, IconArrowRight } from "@tabler/icons-react";

export default function ResumePage() {
  return (
    <Container className="relative pb-32">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-12 lg:pt-20"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
                <IconFileText size={24} strokeWidth={1.5} />
              </div>
              <p className="text-xs font-normal uppercase tracking-[0.4em] text-zinc-400">
                Professional Dossier
              </p>
            </div>
            
            <Heading className="text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.9] tracking-tighter">
              Support <span className="text-brand-gradient">Engineering</span> <br />
              <span className="font-light italic opacity-80">at Scale.</span>
            </Heading>
          </div>

          <div className="flex flex-col gap-4 min-w-[280px]">
            <motion.a
              whileHover={{ x: 5 }}
              href="/Syed-Resume-New.pdf"
              target="_blank"
              className="flex items-center justify-between group bg-zinc-900 text-white pl-8 pr-4 py-4 rounded-[2rem] font-normal text-xs uppercase tracking-[0.2em] transition-all hover:bg-zinc-800 shadow-2xl shadow-zinc-200"
            >
              Open Full PDF
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-sky-400 transition-colors">
                <IconExternalLink size={18} className="text-white" />
              </div>
            </motion.a>
            <motion.a
              whileHover={{ x: 5 }}
              href="/Syed-Resume-New.pdf"
              download
              className="flex items-center justify-between group bg-white text-zinc-900 pl-8 pr-4 py-4 rounded-[2rem] border border-zinc-200 font-normal text-xs uppercase tracking-[0.2em] transition-all hover:border-blue-500/50 shadow-lg shadow-zinc-100"
            >
              Download CV
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-zinc-50 group-hover:bg-blue-600 transition-all">
                <IconDownload size={18} className="text-blue-500 group-hover:text-white transition-colors" />
              </div>
            </motion.a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-40">
          <div className="lg:col-span-8">
            <Paragraph className="text-xl md:text-2xl text-zinc-700 font-light leading-relaxed max-w-3xl mb-10">
              I am a <Highlight className="text-blue-700 italic">Technical Services & Product Support Engineer</Highlight> with 7 years of experience helping teams run reliable platforms and resolve complex production issues.
            </Paragraph>
            <div className="h-px w-32 bg-gradient-to-r from-blue-500/30 to-transparent mb-10" />
            <Paragraph className="text-zinc-500 text-lg leading-relaxed max-w-2xl font-ubuntu">
              Alongside my core support role, I bring hands-on software engineering experience and build full-stack products in my own time. I focus on practical, performance-aware solutions that improve customer outcomes and scale with real-world demand.
            </Paragraph>
          </div>
          
          <div className="lg:col-span-4 lg:pl-12 border-l border-zinc-100 hidden lg:block">
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-normal uppercase tracking-widest text-zinc-400 mb-2">Location</p>
                <p className="text-sm text-zinc-600">Melbourne, VIC, AUS · Remote-capable (any region)</p>
              </div>
              <div>
                <p className="text-[10px] font-normal uppercase tracking-widest text-zinc-400 mb-2">Availability</p>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <p className="text-sm text-zinc-600">Open for exploration.</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-normal uppercase tracking-widest text-zinc-400 mb-2">Contact</p>
                <motion.a 
                  href="mailto:syed@example.com" 
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2 group"
                >
                  Get in touch
                  <IconArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
              <div>
                <p className="text-[10px] font-normal uppercase tracking-widest text-zinc-400 mb-2">GitHub &amp; portfolio</p>
                <p className="text-sm text-zinc-600 leading-relaxed mb-3">
                  I&apos;ve recently committed to publishing projects on GitHub and keeping this dossier aligned with my public work—both are now on a regular maintenance cadence.
                </p>
                <motion.a
                  href="https://github.com/sibtihaj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2 group"
                >
                  github.com/sibtihaj
                  <IconExternalLink size={14} className="opacity-70 group-hover:translate-x-0.5 transition-transform" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        <ResumeSkills />
        <WorkHistory />
      </motion.section>
    </Container>
  );
}
