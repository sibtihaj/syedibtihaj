"use client";
import Image from "next/image";
import React from "react";
import { Heading } from "./Heading";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

export const TechStack = () => {
  const stack = [
    { title: "Next.js", src: "/images/logos/next.png", className: "h-8 w-12" },
    { title: "AWS", src: "/images/logos/aws.webp", className: "h-8 w-8" },
    { title: "Figma", src: "/images/logos/figma.png", className: "h-8 w-6" },
    { title: "Framer Motion", src: "/images/logos/framer.webp", className: "h-8 w-8" },
    { title: "Node", src: "/images/logos/node.png", className: "h-8 w-10" },
    { title: "Tailwind", src: "/images/logos/tailwind.png", className: "h-8 w-20" },
    { title: "Vercel", src: "/images/logos/vercel.png", className: "h-8 w-20" },
  ];

  return (
    <div className="pt-20">
      <Heading
        as="h2"
        className="text-2xl md:text-3xl lg:text-4xl font-black mb-12"
      >
        Tools <span className="text-zinc-500 font-light">& Tech Stack</span>
      </Heading>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {stack.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="group relative flex flex-col items-center justify-center p-8 rounded-2xl bg-zinc-900 border border-zinc-800 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/5 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative mb-4 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
              <Image
                src={item.src}
                width={80}
                height={80}
                alt={item.title}
                className={twMerge("object-contain", item.className)}
              />
            </div>
            <p className="relative text-xs font-bold uppercase tracking-widest text-zinc-600 group-hover:text-zinc-200 transition-colors duration-300">
              {item.title}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
