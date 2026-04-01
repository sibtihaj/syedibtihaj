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
      className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white text-[10px] font-normal uppercase tracking-[0.2em] transition-all duration-300 hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-200 active:scale-95"
    >
      <span>{text}</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:translate-x-1 text-sky-400"
      >
        <motion.path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M10.75 8.75L14.25 12L10.75 15.25"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
      </svg>
    </Link>
  );
};
