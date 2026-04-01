"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export const Badge = ({
  text,
  href,
}: {
  text: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:border-emerald-500/50 hover:text-white hover:shadow-xl hover:shadow-emerald-500/5 active:scale-95"
    >
      <span>{text}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        <motion.path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10.75 8.75L14.25 12L10.75 15.25"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
      </svg>
      <div className="absolute inset-0 rounded-xl bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
};
