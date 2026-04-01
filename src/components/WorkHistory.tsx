"use client";
import { timeline } from "@/constants/timeline";
import React from "react";
import { Paragraph } from "./Paragraph";
import { Heading } from "./Heading";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { motion } from "framer-motion";

export const WorkHistory = () => {
  return (
    <div className="relative border-l border-zinc-900 ml-4 md:ml-6 lg:ml-8 pl-12 space-y-32">
      {timeline.map((item, index) => (
        <motion.div
          key={`timeline-${index}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="relative"
        >
          {/* Timeline Marker */}
          <div className="absolute -left-[3.75rem] top-0 h-10 w-10 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-zinc-950 shadow-2xl shadow-emerald-500/20" />
          </div>

          <div className="flex flex-col gap-1 mb-8">
            <span className="text-emerald-500 font-mono text-xs uppercase tracking-widest font-bold">
              {item.date}
            </span>
            <Heading
              as="h3"
              className="text-2xl md:text-3xl font-black text-zinc-100 mb-2"
            >
              {item.company}
            </Heading>
            <p className="text-lg font-medium text-emerald-400">
              {item.title}
            </p>
          </div>

          <Paragraph className="text-zinc-400 mb-10 text-lg leading-relaxed max-w-3xl">
            {item.description}
          </Paragraph>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {item.responsibilities.map((responsibility, idx) => (
              <Step key={responsibility} index={idx}>
                {responsibility}
              </Step>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const Step = ({ children, index }: { children: React.ReactNode; index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="flex space-x-4 items-start p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800 transition-colors hover:border-zinc-700"
    >
      <div className="mt-1 p-1 rounded-full bg-emerald-500/10 text-emerald-500 shrink-0">
        <IconCircleCheckFilled className="h-4 w-4" />
      </div>
      <Paragraph className="text-sm md:text-sm text-zinc-400 leading-relaxed">
        {children}
      </Paragraph>
    </motion.div>
  );
};
