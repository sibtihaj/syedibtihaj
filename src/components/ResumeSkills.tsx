"use client";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { motion } from "framer-motion";

type SkillCategory = {
  title: string;
  items: string;
};

const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    title: "Platform & Infrastructure",
    items: "Terraform Enterprise, Kubernetes (CKA), Docker/Podman, AWS (EKS, ECS, RDS, VPC, S3, IAM), GCP, Azure, PostgreSQL, Redis, Multi-cloud architecture, IaC",
  },
  {
    title: "Full-Stack Development",
    items: "Next.js, TypeScript, React, Node.js, Python, MongoDB, PostgreSQL, Auth (OAuth, JWT, RBAC), REST/GraphQL APIs, Stripe, Headless CMS",
  },
  {
    title: "AI & Automation",
    items: "OpenAI API, Ollama, MCP, RAG, LangChain, Custom AI Agents, Workflow automation",
  },
  {
    title: "DevOps & Reliability",
    items: "CI/CD (GitHub Actions, Vercel, Argo CD), Prometheus, Grafana, Incident management, RCA, SLA compliance",
  },
  {
    title: "Enterprise Support",
    items: "Technical escalations, Architecture reviews, Documentation, Zendesk, Stakeholder communication",
  },
  {
    title: "Tools & Scripting",
    items: "Git, Bash, Python, kubectl, eksctl, AWS CLI, TLS/SSL, VCS integrations",
  },
] as const;

const CERTIFICATIONS: readonly string[] = [
  "Certified Kubernetes Administrator (CKA)",
  "AWS Certified Solutions Architect – Associate",
  "HashiCorp Certified: Terraform Associate",
] as const;

export const ResumeSkills = () => {
  return (
    <div className="mt-20 mb-6 space-y-24">
      <section>
        <div className="flex items-center gap-3 mb-12">
          <span className="h-px w-12 bg-emerald-500/50" />
          <Heading
            as="h2"
            className="text-2xl md:text-3xl font-black uppercase tracking-wider"
          >
            Core <span className="text-emerald-500 font-light tracking-normal">Expertise</span>
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/5"
            >
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-500 mb-4 transition-colors">
                {category.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-300 group-hover:text-zinc-100 transition-colors">
                {category.items}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-12">
          <span className="h-px w-12 bg-sky-500/50" />
          <Heading
            as="h2"
            className="text-2xl md:text-3xl font-black uppercase tracking-wider"
          >
            Professional <span className="text-sky-500 font-light tracking-normal">Credentials</span>
          </Heading>
        </div>

        <div className="flex flex-wrap gap-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-sm font-medium text-zinc-300 hover:text-white hover:border-sky-500/30 hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300"
            >
              {cert}
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="px-6 py-4 rounded-2xl bg-zinc-950/50 border border-dashed border-zinc-800 text-sm font-medium text-zinc-500 italic"
          >
            Machine Learning Specialization (DeepLearning.AI) — in progress
          </motion.div>
        </div>
      </section>
    </div>
  );
};
