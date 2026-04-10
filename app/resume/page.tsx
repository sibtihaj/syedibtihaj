"use client";

import React from "react";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { ResumeSkills } from "@/components/ResumeSkills";
import { WorkHistory } from "@/components/WorkHistory";
import {
  careerSummary,
  certificationsDetailed,
  education,
  referencesNote,
  resumeHeader,
} from "@/constants/resumeContent";
import { motion } from "framer-motion";
import {
  IconDownload,
  IconExternalLink,
  IconFileText,
  IconArrowRight,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import Link from "next/link";

export default function ResumePage() {
  return (
    <Container className="relative pb-32">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-12 lg:pt-20"
      >
        {/* Header - Minimal & Refined */}
        <div className="mb-24 flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-stone-300" />
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-stone-400">
                Professional Dossier
              </span>
            </div>

            <div>
              <Heading className="text-xl font-normal leading-tight tracking-tight text-stone-500 md:text-2xl lg:text-3xl">
                Solutions <span className="text-stone-900">Architecture</span>
                <br />
                <span className="font-light italic opacity-60">
                  Grounded in platform engineering.
                </span>
              </Heading>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <ContactItem
                icon={IconMail}
                href={`mailto:${resumeHeader.email}`}
                label={resumeHeader.email}
              />
              <ContactItem
                icon={IconPhone}
                label={resumeHeader.phone}
              />
              <ContactItem
                icon={IconMapPin}
                label={resumeHeader.location}
              />
              <ContactItem
                icon={IconBrandLinkedin}
                href={resumeHeader.linkedInHref}
                label="LinkedIn"
              />
            </div>
          </div>

          <div className="flex flex-row gap-4 lg:flex-col">
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="/ibtihaj-resume.pdf"
              target="_blank"
              className="group flex items-center gap-3 rounded-2xl bg-zinc-900 px-6 py-3 text-xs font-normal uppercase tracking-[0.2em] text-white transition-all hover:bg-zinc-800 shadow-xl shadow-zinc-200"
            >
              <IconExternalLink size={16} className="text-sky-400" />
              View PDF
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="/ibtihaj-resume.pdf"
              download
              className="group flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-6 py-3 text-xs font-normal uppercase tracking-[0.2em] text-zinc-600 transition-all hover:border-blue-500/30 hover:text-zinc-900 shadow-sm"
            >
              <IconDownload size={16} className="text-blue-500" />
              Download
            </motion.a>
          </div>
        </div>

        {/* Summary & Education Grid */}
        <div className="mb-32 grid grid-cols-1 gap-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-8 flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-300">
                Summary
              </span>
              <div className="h-px flex-1 bg-zinc-100" />
            </div>
            <p className="font-sans text-lg font-light leading-relaxed text-zinc-600 md:text-xl">
              {careerSummary}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="mb-8 flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-300">
                Education
              </span>
              <div className="h-px flex-1 bg-zinc-100" />
            </div>
            <div className="space-y-8">
              {education.map((item) => (
                <div key={item.institution} className="group">
                  <p className="font-heading text-lg font-normal text-zinc-900 transition-colors group-hover:text-blue-600">
                    {item.institution}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">{item.credential}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                    {item.period}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills & Badges Section */}
        <ResumeSkills />

        {/* Experience Section */}
        <WorkHistory />

        {/* Certifications Prose Section */}
        <div className="mt-32 mb-32">
          <div className="mb-12 flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-300">
              Certifications &amp; Training
            </span>
            <div className="h-px flex-1 bg-zinc-100" />
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {certificationsDetailed.map((cert) => (
              <div key={cert.title} className="group relative rounded-3xl border border-zinc-100 bg-white p-8 transition-all duration-500 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5">
                <h4 className="font-heading text-base font-normal text-zinc-900 group-hover:text-blue-600 transition-colors">
                  {cert.title}
                </h4>
                <p className="mt-4 font-sans text-sm leading-relaxed text-zinc-500">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-48 border-t border-zinc-100 pt-16">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-400">
                References
              </p>
              <p className="mt-2 font-sans text-sm text-zinc-500">{referencesNote}</p>
            </div>
            <Link 
              href="/contact"
              className="group flex items-center gap-3 rounded-full bg-emerald-50 px-8 py-4 text-xs font-normal uppercase tracking-[0.2em] text-emerald-800 transition-all hover:bg-emerald-100"
            >
              Start a conversation
              <IconArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </footer>
      </motion.section>
    </Container>
  );
}

function ContactItem({ icon: Icon, label, href }: { icon: any; label: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-2 group cursor-default">
      <Icon size={14} className="text-stone-400 group-hover:text-emerald-700 transition-colors" />
      <span className="text-sm text-stone-500 group-hover:text-stone-900 transition-colors">{label}</span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} target={href.startsWith('http') ? "_blank" : undefined} rel={href.startsWith('http') ? "noopener noreferrer" : undefined}>
        {content}
      </Link>
    );
  }

  return content;
}
