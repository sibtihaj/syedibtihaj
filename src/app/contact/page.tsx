"use client";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Contact } from "@/components/Contact";
import { motion } from "framer-motion";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";

export default function ContactPage() {
  return (
    <Container className="relative overflow-hidden">
      <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-12 lg:pt-24"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-blue-500/30" />
          <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent font-mono text-sm tracking-widest uppercase">
            Let&apos;s Connect
          </span>
        </div>
        
        <Heading className="text-4xl md:text-6xl lg:text-7xl mb-12 font-normal leading-[1.1]">
          Have a <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Project</span> In Mind? <br />
          Let&apos;s <span className="text-zinc-400 font-light">Collaborate.</span>
        </Heading>

        <Paragraph className="pb-10 text-lg md:text-xl text-zinc-500 max-w-2xl">
          Reach out to me over <Highlight className="bg-gradient-to-r from-blue-500/10 to-sky-500/10 text-blue-700">email</Highlight> or fill out the
          contact form below. I&apos;m currently available for freelance projects and full-time opportunities.
        </Paragraph>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 mb-32">
          <div className="p-1 rounded-3xl bg-gradient-to-br from-zinc-100 to-white shadow-xl shadow-zinc-200/50">
            <div className="p-8 md:p-12 rounded-[22px] bg-white">
              <Contact />
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-12 pl-0 md:pl-12">
            <div>
              <Heading as="h3" className="text-xl md:text-2xl font-normal mb-4">Direct Communication</Heading>
              <Paragraph className="text-zinc-500">
                Sometimes a direct approach is best. Feel free to reach out directly through any of these channels.
              </Paragraph>
            </div>

            <div className="space-y-6">
              {[
                { label: "Email", value: "syedibtihaj@example.com", icon: IconMail, href: "mailto:syedibtihaj@example.com" },
                { label: "LinkedIn", value: "syedibtihaj", icon: IconBrandLinkedin, href: "https://linkedin.com/in/syedibtihaj" },
                { label: "GitHub", value: "syedibtihaj", icon: IconBrandGithub, href: "https://github.com/syedibtihaj" }
              ].map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center group"
                >
                  <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-zinc-50 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-sky-500 text-zinc-400 group-hover:text-white transition-all duration-500 ring-1 ring-zinc-200 group-hover:ring-transparent">
                    <item.icon size={20} />
                  </div>
                  <div className="ml-5">
                    <p className="text-xs uppercase tracking-widest font-normal text-zinc-400 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-sky-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">{item.label}</p>
                    <p className="text-base font-normal text-zinc-900">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </Container>
  );
}
