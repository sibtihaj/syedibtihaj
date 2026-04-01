"use client";
import React from "react";
import { Paragraph } from "./Paragraph";

export const Footer = () => {
  return (
    <footer className="mt-32 pb-20 px-8 flex flex-col items-center justify-center gap-6 text-center border-t border-zinc-900 pt-20">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-zinc-800" />
        <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.5em] font-bold">
          Design & Code by Syed Ibtihaj
        </span>
        <span className="h-px w-8 bg-zinc-800" />
      </div>
      
      <Paragraph className="text-[10px] text-zinc-600 font-medium uppercase tracking-widest leading-none">
        {new Date().getFullYear()} — <span className="text-zinc-400">Built with Next.js, Framer Motion & Bricolage Grotesque</span>
      </Paragraph>
      
      <div className="flex gap-8 mt-4">
        <div className="h-1 w-1 rounded-full bg-emerald-500/30 animate-pulse" />
        <div className="h-1 w-1 rounded-full bg-sky-500/30 animate-pulse delay-100" />
        <div className="h-1 w-1 rounded-full bg-purple-500/30 animate-pulse delay-200" />
      </div>
    </footer>
  );
};
