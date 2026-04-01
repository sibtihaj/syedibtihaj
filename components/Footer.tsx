"use client";
import React from "react";

export const Footer = () => {
  return (
    <div className="mt-20 px-8 py-12 border-t border-zinc-100 bg-white/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm font-normal text-zinc-900 uppercase tracking-widest">
            Syed Ibtihaj
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-medium mt-1">
            Design & Code by Syed Ibtihaj
          </p>
          <p className="text-[10px] text-zinc-400 leading-relaxed mt-3 max-w-sm text-center md:text-left">
            Actively maintaining this site and pushing new work to GitHub as it ships.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="h-1 w-1 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest font-normal text-zinc-400">
            Open for exploration.
          </span>
          <div className="h-1 w-1 rounded-full bg-sky-500 animate-pulse" />
        </div>
        
        <p className="text-xs font-mono text-zinc-400">
          © {new Date().getFullYear()} — Built with Next.js 16
        </p>
      </div>
    </div>
  );
};
