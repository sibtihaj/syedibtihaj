"use client";

import React from "react";
import Image from "next/image";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { motion } from "framer-motion";
import { IconCpu, IconRocket } from "@tabler/icons-react";

export const ResumeSkills = () => {
  const skillsCategories = [
    {
      title: "Infrastructure",
      icon: IconCpu,
      skills: ["AWS (EKS / ECS / Fargate)", "Terraform Enterprise", "Kubernetes", "Datadog / Grafana", "PostgreSQL / Redis"],
      accent: "from-blue-500 to-sky-500",
    },
    {
      title: "Core Stack",
      icon: IconRocket,
      skills: ["Next.js / React", "TypeScript", "Node.js", "Stripe / PayPal", "Tailwind CSS"],
      accent: "from-indigo-500 to-blue-500",
    },
  ];

  const certifications = [
    {
      title: "AWS Certified Solutions Architect",
      image: "/badges/AWS%20Certified%20Solutions%20Architect%20Badge.png",
    },
    {
      title: "Certified Kubernetes Administrator (CKA)",
      image: "/badges/CKA%20Certified%20Kubernetes%20Administrator%20Badge.png",
    },
    {
      title: "HashiCorp Certified Terraform Associate",
      image: "/badges/HashiCorp%20Certified%20Terraform%20Associate%20Badge.png",
    },
    {
      title: "Amazon EKS Training",
      image: "/badges/Amazon%20EKS%20Training%20Badge.png",
    },
  ];

  return (
    <section className="mt-32 md:mt-48 mb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left: Section Label */}
        <div className="lg:col-span-3">
          <div className="sticky top-24">
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-mono text-[10px] text-zinc-300 uppercase tracking-[0.5em]">Section 01</span>
              <div className="h-px flex-1 bg-zinc-100" />
            </div>
            <Heading as="h3" className="text-3xl md:text-4xl font-normal tracking-tight mb-6">
              Technical <span className="text-zinc-300 font-light italic">Arsenal.</span>
            </Heading>
            <p className="text-sm text-zinc-500 leading-relaxed font-sans">
              Strategic selection of core technologies utilized to architect and implement high-concurrency systems and digital products.
            </p>
          </div>
        </div>

        {/* Right: Skills Grid & Certs */}
        <div className="lg:col-span-9 space-y-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillsCategories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group relative p-8 md:p-10 rounded-3xl bg-white border border-zinc-100 hover:border-blue-200 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-100 group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-600 transition-all duration-500">
                    <category.icon size={20} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[10px] font-normal uppercase tracking-[0.3em] text-zinc-400 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h4>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-normal px-4 py-2 rounded-xl bg-zinc-50 text-zinc-600 border border-zinc-100 group-hover:border-blue-200 group-hover:text-blue-700 transition-all duration-300 cursor-default font-sans"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications Row */}
          <div className="relative p-10 md:p-12 rounded-[2.5rem] bg-zinc-50/50 border border-zinc-100 overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-transparent blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="max-w-xs">
                <p className="text-[10px] font-normal uppercase tracking-[0.4em] text-zinc-400 mb-4">Verified Credentials</p>
                <Paragraph className="text-xs text-zinc-500 leading-relaxed font-sans italic">
                  Actively expanding proficiency in generative AI architectures and distributed systems observability to drive next-generation infrastructure solutions.
                </Paragraph>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 w-full">
                {certifications.map((cert) => (
                  <motion.div
                    key={cert.title}
                    whileHover={{ y: -4 }}
                    className="group/cert rounded-3xl bg-white/95 border border-zinc-100 p-4 md:p-5 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50"
                  >
                    <div className="relative h-44 md:h-52 w-full overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 420px"
                        className="object-contain p-4 md:p-5"
                      />
                    </div>
                    <p className="mt-3 text-sm text-zinc-600 group-hover/cert:text-zinc-900 transition-colors font-medium leading-snug font-sans">
                      {cert.title}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
