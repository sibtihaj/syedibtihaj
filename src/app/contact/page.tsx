"use client";
import { Contact } from "@/components/Contact";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <Container className="relative overflow-hidden min-h-screen">
      <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-12 lg:pt-24 max-w-4xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-emerald-500/50" />
          <span className="text-emerald-500 font-mono text-sm tracking-widest uppercase">
            Let&apos;s Connect
          </span>
        </div>
        
        <Heading className="text-4xl md:text-6xl lg:text-7xl mb-12 font-black leading-[1.1]">
          Have a Project <br />
          In <span className="text-emerald-500">Mind?</span>
        </Heading>

        <Paragraph className="mb-16 text-lg md:text-xl text-zinc-400">
          Reach out to me over email or fill up this contact form. I will get back
          to you ASAP - I promise.{" "}
        </Paragraph>
        
        <div className="relative group">
          <div className="absolute -inset-px bg-gradient-to-tr from-emerald-500/20 to-sky-500/10 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative p-8 md:p-12 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-xl transition-all duration-500 group-hover:border-zinc-700">
            <Contact />
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-zinc-900 pt-12">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 mb-4">Direct Email</h4>
            <a href="mailto:syedibtihajulhaque@live.com" className="text-xl font-medium text-zinc-200 hover:text-emerald-500 transition-colors">
              syedibtihajulhaque@live.com
            </a>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 mb-4">Socials</h4>
            <div className="flex gap-6">
              <a href="#" className="text-zinc-400 hover:text-zinc-100 transition-colors underline underline-offset-8">LinkedIn</a>
              <a href="#" className="text-zinc-400 hover:text-zinc-100 transition-colors underline underline-offset-8">GitHub</a>
              <a href="#" className="text-zinc-400 hover:text-zinc-100 transition-colors underline underline-offset-8">Twitter</a>
            </div>
          </div>
        </div>
      </motion.section>
    </Container>
  );
}
