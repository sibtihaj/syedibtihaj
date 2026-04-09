"use client";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { Contact } from "@/components/Contact";
import { motion } from "framer-motion";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";

const EMAIL_PRIMARY = "syedibtihaj12@gmail.com";
const EMAIL_SECONDARY = "syedibtihajulhaque@live.com";
const PHONE_DISPLAY = "0470 465 820";
const PHONE_TEL = "+61470465820";

type SocialRowProps = {
  label: string;
  icon: typeof IconMail;
  href: string;
  value: string;
  external?: boolean;
  delay: number;
};

function SocialRow({
  label,
  icon: Icon,
  href,
  value,
  external,
  delay,
}: SocialRowProps) {
  return (
    <motion.a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex items-center group"
    >
      <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-2xl bg-zinc-50 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-sky-500 text-zinc-400 group-hover:text-white transition-all duration-500 ring-1 ring-zinc-200 group-hover:ring-transparent">
        <Icon size={20} aria-hidden />
      </div>
      <div className="ml-5 min-w-0">
        <p className="text-xs uppercase tracking-widest font-normal text-zinc-400 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-sky-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">
          {label}
        </p>
        <p className="text-base font-normal text-zinc-900 break-words">{value}</p>
      </div>
    </motion.a>
  );
}

export default function ContactPage() {
  return (
    <Container className="relative overflow-hidden">
      <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-6 lg:pt-14"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-blue-500/30" />
          <span className="text-emerald-700 font-mono text-[10px] tracking-[0.3em] uppercase font-medium">
            Contact
          </span>
        </div>

        <Heading className="text-4xl md:text-5xl lg:text-6xl mb-8 font-normal leading-[1.15]">
          An <span className="text-brand-gradient italic">opportunity</span> or a{" "}
          <span className="text-stone-400 font-light italic">project</span> in mind?
        </Heading>

        <Paragraph className="pb-10 text-lg md:text-xl text-zinc-600 max-w-2xl leading-relaxed">
          If you have an opportunity or a project in mind, please reach out using the contact details on this page or the contact form below—I&apos;ll respond as soon as I can.
        </Paragraph>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mt-8 mb-32 items-start">
          <div className="order-2 lg:order-1 p-1 rounded-3xl bg-gradient-to-br from-zinc-100 to-white shadow-xl shadow-zinc-200/50">
            <div className="p-8 md:p-10 rounded-[22px] bg-white">
              <div className="mb-8">
                <Heading as="h2" className="text-lg md:text-xl font-normal text-zinc-900 mb-1">
                  Send a message
                </Heading>
                <p className="text-sm text-zinc-500">
                  Share a short note and I&apos;ll reply by email.
                </p>
              </div>
              <Contact />
            </div>
          </div>

          <div className="order-1 lg:order-2 flex flex-col justify-start space-y-10 pl-0 lg:pl-4">
            <div>
              <Heading as="h2" className="text-lg md:text-xl font-normal mb-3 text-zinc-900">
                Contact details
              </Heading>
              <Paragraph className="text-zinc-500 text-base leading-relaxed">
                Use whichever channel suits you—email, phone, or the form.
              </Paragraph>
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-5"
              >
                <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-2xl bg-zinc-50 text-zinc-400 ring-1 ring-zinc-200">
                  <IconMail size={20} aria-hidden />
                </div>
                <div className="min-w-0 space-y-2">
                  <p className="text-xs uppercase tracking-widest font-normal text-zinc-400">Email</p>
                  <p className="text-base font-normal text-zinc-900 leading-relaxed">
                    <a
                      href={`mailto:${EMAIL_PRIMARY}`}
                      className="text-blue-700 hover:text-blue-600 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded-sm"
                    >
                      {EMAIL_PRIMARY}
                    </a>
                    <span className="text-zinc-400"> or </span>
                    <a
                      href={`mailto:${EMAIL_SECONDARY}`}
                      className="text-blue-700 hover:text-blue-600 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded-sm"
                    >
                      {EMAIL_SECONDARY}
                    </a>
                  </p>
                </div>
              </motion.div>

              <SocialRow
                label="Phone"
                icon={IconPhone}
                href={`tel:${PHONE_TEL}`}
                value={PHONE_DISPLAY}
                delay={0.05}
              />

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-5"
              >
                <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-2xl bg-zinc-50 text-zinc-400 ring-1 ring-zinc-200">
                  <IconMapPin size={20} aria-hidden />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-normal text-zinc-400">Location</p>
                  <p className="text-base font-normal text-zinc-900">Melbourne, VIC</p>
                </div>
              </motion.div>

              <div className="pt-4 border-t border-zinc-100 space-y-6">
                <SocialRow
                  label="LinkedIn"
                  icon={IconBrandLinkedin}
                  href="https://www.linkedin.com/in/ib-02"
                  value="linkedin.com/in/ib-02"
                  external
                  delay={0.15}
                />
                <SocialRow
                  label="GitHub"
                  icon={IconBrandGithub}
                  href="https://github.com/sibtihaj"
                  value="sibtihaj"
                  external
                  delay={0.2}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </Container>
  );
}
