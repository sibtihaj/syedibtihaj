"use client";
import React from "react";
import { timeline } from "@/constants/timeline";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { motion } from "framer-motion";

export const WorkHistory = () => {
  return (
    <div className="relative mt-20 pb-40">
      <Heading
        as="h3"
        className="text-2xl md:text-3xl lg:text-4xl font-normal mb-16"
      >
        Work <span className="text-zinc-400 font-light">Timeline</span>
      </Heading>

      <div className="absolute left-[11px] top-32 bottom-0 w-px bg-gradient-to-b from-blue-500 via-zinc-200 to-transparent hidden md:block opacity-50" />

      <div className="space-y-20 relative">
        {timeline.map((item, index) => (
          <motion.div
            key={`${item.company}-${item.date}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex flex-col md:flex-row gap-8 md:gap-20 last:[&_.timeline-connector]:hidden"
          >
            <div className="hidden md:flex flex-col items-center flex-shrink-0 w-6">
              <div className="h-6 w-6 rounded-full bg-white border-4 border-blue-500 shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] z-10" />
              <div className="timeline-connector h-full min-h-[2rem] w-px bg-zinc-100" />
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h4 className="text-xl md:text-2xl font-normal text-zinc-900 transition-colors hover:text-blue-700">
                    {item.company}
                  </h4>
                  <p className="text-blue-600 font-normal uppercase tracking-widest text-xs mt-1">
                    {item.title}
                  </p>
                </div>
                <span className="text-xs md:text-sm font-mono font-normal text-zinc-400 bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-100 w-fit">
                  {item.date}
                </span>
              </div>

              <div className="p-1 rounded-3xl bg-zinc-50 shadow-sm border border-zinc-100 mt-6">
                <div className="p-8 rounded-[22px] bg-white">
                  <Paragraph className="mb-6 text-zinc-600">
                    {item.description}
                  </Paragraph>
                  <ul className="space-y-4">
                    {item.responsibilities.map((resp, i) => (
                      <li
                        key={i}
                        className="flex items-start text-sm text-zinc-500 group"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-blue-500/50 to-sky-500/50 mt-2 mr-4 flex-shrink-0 transition-all group-hover:scale-125 group-hover:from-blue-500 group-hover:to-sky-500" />
                        <span className="group-hover:text-zinc-800 transition-colors">
                          {resp}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
