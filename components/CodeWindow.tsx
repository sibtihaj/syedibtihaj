"use client";

import React, { Children, useState, useRef, useSyncExternalStore } from "react";
import clsx from "clsx";
import { HEADING_FONT } from "@/config/typography";

const proseHeadingFont =
  HEADING_FONT === "manrope"
    ? "prose-headings:font-manrope"
    : "prose-headings:font-plein";

const emptySubscribe = () => () => {};

export const CodeWindow = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [buttonText, setButtonText] = useState("Copy");
  const childRef = useRef<any>(null);

  const handleClick = () => {
    if (childRef.current) {
      const textToCopy = childRef.current.innerText;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setButtonText("Copied!");
          setTimeout(() => {
            setButtonText("Copy");
          }, 1000);
        })
        .catch((err) => {
          console.error("Error copying text to clipboard:", err);
        });
    }
  };

  return (
    isClient && (
      <div
        className={clsx(
          "bg-white border border-zinc-200 rounded-2xl w-auto overflow-hidden flex flex-col my-10 prose prose-sm shadow-xl shadow-zinc-200/50",
          "prose-zinc max-w-none text-zinc-600",
          "prose-headings:scroll-mt-28 prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]",
          proseHeadingFont,
          "prose-lead:text-zinc-500",
          "prose-a:font-semibold text-blue-600",
          "prose-pre:rounded-xl prose-pre:bg-zinc-50 prose-pre:shadow-none prose-pre:border prose-pre:border-zinc-100",
        )}
      >
        <div className="flex justify-between items-center bg-zinc-50/80 backdrop-blur-sm py-3 px-6 border-b border-zinc-100">
          <p className="text-blue-700 text-[10px] font-normal uppercase tracking-[0.2em] bg-blue-50 px-3 py-1 rounded-full ring-1 ring-blue-100 !my-0 shadow-sm">
            {title}
          </p>

          <button
            onClick={handleClick}
            className="group cursor-pointer relative rounded-full p-px text-[10px] font-normal leading-6 text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-widest"
          >
            <div className="relative z-10 rounded-full bg-white border border-zinc-200 py-1 px-4 group-hover:border-blue-500/30 transition-all">
              {buttonText}
            </div>
          </button>
        </div>

        <div className="p-6 overflow-x-auto text-sm leading-relaxed" ref={childRef}>
          {children}
        </div>
      </div>
    )
  );
};
