"use client";
import React from "react";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { motion } from "framer-motion";
import { IconCircleCheck, IconCpu, IconRocket } from "@tabler/icons-react";

export const ResumeSkills = () => {
  const skillsCategories = [
    {
      title: "Infrastructure",
      icon: IconCpu,
      skills: ["Cloud Engineering", "DevOps", "IaC (Terraform)", "CI/CD", "K8s"],
      accent: "from-blue-500 to-sky-500",
    },
    {
      title: "Core Stack",
      icon: IconRocket,
      skills: ["React/Next.js", "Node.js", "Python", "Go", "PostgreSQL"],
      accent: "from-indigo-500 to-blue-500",
    },
  ];

  const certifications = [
    "AWS Solutions Architect",
    "Kubernetes Administrator (CKA)",
    "HashiCorp Terraform",
    "ML Specialization (DeepLearning.AI)",
  ];

  return (
    <div className="mt-32 mb-40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Skills Section */}
        <div className="lg:col-span-7 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heading as="h3" className="text-2xl md:text-3xl font-normal mb-3">
              Technical <span className="text-brand-gradient font-light">Proficiencies</span>
            </Heading>
            <Paragraph className="text-zinc-500 mb-12">
              Strategic selection of core technologies utilized to architect and implement high-concurrency systems.
            </Paragraph>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillsCategories.map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative p-8 rounded-3xl bg-white border border-zinc-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.accent} opacity-[0.02] group-hover:opacity-[0.06] blur-3xl transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-100 group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-600 transition-all duration-500">
                        <category.icon size={20} strokeWidth={1.5} />
                      </div>
                      <p className="text-xs font-normal uppercase tracking-[0.2em] text-zinc-400 group-hover:text-blue-600 transition-colors">
                        {category.title}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-normal px-4 py-2 rounded-full bg-zinc-50 text-zinc-600 border border-zinc-100 group-hover:border-blue-200 group-hover:text-blue-700 transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Certifications Sidebar */}
        <div className="lg:col-span-5 h-full">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticky top-24"
          >
            <div className="p-1 rounded-[2.5rem] bg-gradient-to-br from-zinc-50 via-white to-zinc-100 shadow-xl shadow-zinc-200/50">
              <div className="p-10 rounded-[2.2rem] bg-white border border-zinc-100/50 backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px flex-1 bg-zinc-100" />
                  <p className="text-[10px] font-normal uppercase tracking-[0.3em] text-zinc-400">Certifications</p>
                  <div className="h-px flex-1 bg-zinc-100" />
                </div>

                <div className="space-y-5">
                  {certifications.map((cert, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="flex items-center group cursor-default"
                    >
                      <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-blue-50/50 text-blue-600 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-sky-500 group-hover:text-white transition-all duration-500 mr-4 flex-shrink-0 border border-blue-100 group-hover:border-transparent shadow-sm">
                        <IconCircleCheck size={16} strokeWidth={2} />
                      </div>
                      <p className="text-xs md:text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors font-normal leading-tight">
                        {cert}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 p-6 rounded-2xl bg-zinc-50 border border-zinc-100 border-dashed relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <p className="relative z-10 text-[10px] font-normal uppercase tracking-[0.2em] text-blue-600 mb-3 flex items-center gap-2">
                    Professional Development
                  </p>
                  <Paragraph className="relative z-10 text-xs text-zinc-500 leading-relaxed font-normal">
                    Actively advancing expertise in neural architectures and generative systems to broaden the scope of software integration capabilities.
                  </Paragraph>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
