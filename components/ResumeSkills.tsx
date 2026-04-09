"use client";

import React from "react";
import Image from "next/image";
import { Heading } from "./Heading";
import { motion } from "framer-motion";
import { IconCpu, IconRocket } from "@tabler/icons-react";
import { certificationBadges } from "@/constants/certificationBadges";
import { skillsBlocks } from "@/constants/resumeContent";

const sectionIcons = [IconCpu, IconRocket] as const;

export const ResumeSkills = () => {
  return (
    <section className="mt-32 md:mt-48 mb-32 overflow-x-clip">
      <div className="grid grid-cols-1 gap-16 items-start lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="sticky top-24">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-300">
                Section 01
              </span>
              <div className="h-px flex-1 bg-zinc-100" />
            </div>
            <Heading
              as="h3"
              className="mb-6 text-2xl font-normal tracking-tight md:text-3xl"
            >
              Skills <span className="font-light italic text-zinc-300">&amp;</span>{" "}
              <span className="text-zinc-300 font-light italic">credentials.</span>
            </Heading>
            <p className="font-sans text-sm leading-relaxed text-zinc-500">
              Full skill inventory and certification badges aligned with the PDF resume.
            </p>
          </div>
        </div>

        <div className="min-w-0 space-y-20 lg:col-span-9">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {skillsBlocks.map((block, idx) => {
              const Icon = sectionIcons[idx % 2];
              return (
                <motion.div
                  key={block.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.06 }}
                  className="group relative rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm transition-all duration-500 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 md:p-10"
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-3 transition-all duration-500 group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-600">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-[10px] font-normal uppercase tracking-[0.3em] text-zinc-400 transition-colors group-hover:text-blue-600">
                      {block.title}
                    </h4>
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-zinc-600">
                    {block.items}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="relative mt-24 w-full max-w-full">
            <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[120px]" />

            <div className="relative z-10 w-full max-w-full">
              <div className="mb-12 text-center lg:text-left">
                <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-blue-600/70">
                  Badge credentials
                </p>
              </div>
              <div className="flex w-full max-w-full flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                {certificationBadges.map((cert, idx) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: idx * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group/cert relative max-w-full"
                  >
                    <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-blue-500/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover/cert:opacity-100" />

                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        y: -10,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      className="relative flex h-32 w-32 items-center justify-center md:h-40 md:w-40 lg:h-48 lg:w-48"
                    >
                      <div className="absolute inset-4 rounded-full bg-blue-500/0 blur-2xl transition-colors duration-500 group-hover/cert:bg-blue-500/10" />

                      <Image
                        src={cert.src}
                        alt={cert.title}
                        width={cert.width}
                        height={cert.height}
                        unoptimized
                        className="max-h-full max-w-full object-contain brightness-[1.02] contrast-[1.02] filter drop-shadow-xl transition-all duration-500 group-hover/cert:drop-shadow-[0_20px_30px_rgba(59,130,246,0.3)]"
                      />
                    </motion.div>

                    <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-4 max-w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 translate-y-2 text-center opacity-0 transition-all duration-500 group-hover/cert:translate-y-0 group-hover/cert:opacity-100">
                      <div className="rounded-full bg-zinc-900/90 px-4 py-2 text-[10px] font-normal uppercase tracking-[0.2em] text-white shadow-2xl backdrop-blur-md [text-wrap:balance]">
                        {cert.title}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
