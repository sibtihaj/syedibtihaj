"use client";
import React from "react";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { motion } from "framer-motion";

export const ResumeSkills = () => {
  const skillsCategories = [
    {
      title: "Platform & Infrastructure Engineering",
      skills: ["Cloud Engineering", "DevOps", "Infrastructure as Code", "CI/CD Pipeline Design", "Cloud Architecture Implementation"],
    },
    {
      title: "Full-Stack Development",
      skills: ["Front-end Development (React, Next.js)", "Back-end Development (Node.js, Python, Go)", "API Design & Implementation", "Database Management (SQL/NoSQL)", "System Scaling & Performance Tuning"],
    },
  ];

  const certifications = [
    "AWS Certified Solutions Architect",
    "Certified Kubernetes Administrator (CKA)",
    "HashiCorp Certified: Terraform Associate",
    "DeepLearning.AI Machine Learning Specialization (Coursera)",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 mb-32">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <Heading as="h3" className="text-xl md:text-2xl font-normal mb-8">Technical <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent font-light">Proficiencies</span></Heading>
        <div className="space-y-8">
          {skillsCategories.map((category, idx) => (
            <div key={idx} className="p-1 rounded-3xl bg-gradient-to-br from-zinc-50 to-white shadow-xl shadow-zinc-200/50">
              <div className="p-8 rounded-[22px] bg-white border border-zinc-100">
                <p className="text-xs font-normal uppercase tracking-widest bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent mb-4">{category.title}</p>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-normal px-3 py-1.5 rounded-xl bg-zinc-50 text-zinc-600 border border-zinc-100 hover:border-blue-200 hover:text-blue-700 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <Heading as="h3" className="text-xl md:text-2xl font-normal mb-8">Industry <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent font-light">Certifications</span></Heading>
        <div className="p-1 rounded-3xl bg-gradient-to-br from-zinc-50 to-white shadow-xl shadow-zinc-200/50 h-fit">
          <div className="p-8 rounded-[22px] bg-white border border-zinc-100">
            <div className="space-y-4">
              {certifications.map((cert, idx) => (
                <div key={idx} className="flex items-start group">
                  <div className="h-6 w-6 mt-0.5 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-sky-50 text-blue-600 group-hover:from-blue-600 group-hover:to-sky-500 group-hover:text-white transition-all duration-300 mr-4 flex-shrink-0 border border-blue-100 group-hover:border-transparent">
                    <span className="text-[10px] font-normal">✓</span>
                  </div>
                  <Paragraph className="text-zinc-600 group-hover:text-zinc-900 transition-colors font-normal">
                    {cert}
                  </Paragraph>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-zinc-100">
              <p className="text-[10px] font-normal uppercase tracking-[0.2em] text-zinc-400 mb-2">Ongoing Learning</p>
              <Paragraph className="text-zinc-500 italic text-sm">
                DeepLearning.AI Machine Learning Specialization — currently in progress to expand AI/ML integration capabilities.
              </Paragraph>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
