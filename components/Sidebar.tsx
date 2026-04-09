"use client";
import { navlinks } from "@/constants/navlinks";
import { Navlink } from "@/types/navlink";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Heading } from "./Heading";
import { socials } from "@/constants/socials";
import { Badge } from "./Badge";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { isMobile } from "@/lib/utils";

export const Sidebar = () => {
  const [open, setOpen] = useState(isMobile() ? false : true);

  return (
    <>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="px-6 z-[100] py-10 max-w-[16rem] lg:w-fit fixed lg:relative h-screen left-0 flex flex-col justify-between"
          >
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <SidebarHeader />
              <Navigation setOpen={setOpen} />
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => isMobile() && setOpen(false)}
              className="mt-10"
            >
              <Badge href="/resume" text="Read Resume" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button
        className="fixed lg:hidden top-4 right-4 h-10 w-10 bg-[#FAF9F6] border border-stone-200 rounded-xl flex items-center justify-center z-[110] text-stone-500 hover:text-stone-900 shadow-lg transition-colors"
        onClick={() => setOpen(!open)}
      >
        {open ? <IconX size={20} /> : <IconMenu2 size={20} />}
      </button>
    </>
  );
};

const SidebarHeader = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-center mb-10">
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-700 via-teal-600 to-lime-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-500" />
        <Image
          src="/images/headshot.jpeg"
          alt="Syed Ibtihaj"
          width={128}
          height={128}
          priority
          className="relative h-32 w-32 object-cover object-top rounded-full ring-2 ring-[#FAF9F6] shadow-xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <div className="flex flex-col">
        <p className="font-normal text-lg text-stone-900 tracking-tight font-heading">Syed Ibtihaj</p>
        <p className="text-[10px] font-medium text-emerald-800 uppercase tracking-[0.2em] mt-1">Senior Product Support Engineer</p>
      </div>
    </div>
  );
};

export const Navigation = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex flex-col space-y-1 relative z-[100]">
      {navlinks.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => isMobile() && setOpen(false)}
          className={twMerge(
            "group flex items-center space-x-3 py-2.5 px-3 rounded-xl text-sm transition-all duration-300",
            isActive(link.href) 
              ? "text-emerald-800 font-medium" 
              : "text-stone-500 hover:text-stone-900"
          )}
        >
          <link.icon
            className={twMerge(
              "h-4 w-4 transition-all duration-300",
              isActive(link.href) ? "text-emerald-700 opacity-100" : "text-stone-400 group-hover:text-stone-600 opacity-60 group-hover:opacity-100"
            )}
          />
          <span>{link.label}</span>
        </Link>
      ))}

      <div className="pt-10 pb-4 px-3 uppercase tracking-widest text-[10px] font-normal text-zinc-400">
        Socials
      </div>
      
      {socials.map((link: Navlink) => (
        <Link
          key={link.label}
          href={link.href}
          target="_blank"
          className="group flex items-center space-x-3 py-2 px-3 rounded-xl text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-all duration-300"
        >
          <link.icon className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  );
};
