"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { SimpleIcon } from "simple-icons";
import {
  siAnthropic,
  siArgo,
  siClaude,
  siConsul,
  siDatadog,
  siFastapi,
  siGo,
  siGooglecloud,
  siGrafana,
  siHashicorp,
  siHelm,
  siHuggingface,
  siKubernetes,
  siLangchain,
  siLanggraph,
  siModelcontextprotocol,
  siNextdotjs,
  siNomad,
  siOllama,
  siOpentelemetry,
  siPostgresql,
  siPosthog,
  siPrometheus,
  siPython,
  siRedis,
  siRender,
  siSqlite,
  siSupabase,
  siTerraform,
  siTypescript,
  siVercel,
} from "simple-icons";
import { motion } from "framer-motion";
import { Heading } from "./Heading";
import { TechStackBrandIcon } from "./TechStackBrandIcon";

type ToolboxItem =
  | { label: string; kind: "icon"; icon: SimpleIcon }
  | { label: string; kind: "image"; src: string; alt: string }
  | { label: string; kind: "text" };

/**
 * Advanced surfaces from HashiCorp/AWS day work plus Cruvio and Studifex builds.
 * Intentionally omits commodity labels (Git, Tailwind, generic Node).
 */
const toolboxItems: ToolboxItem[] = [
  // Enterprise platform
  { label: "Terraform", kind: "icon", icon: siTerraform },
  { label: "HashiCorp", kind: "icon", icon: siHashicorp },
  { label: "Kubernetes", kind: "icon", icon: siKubernetes },
  { label: "Helm", kind: "icon", icon: siHelm },
  { label: "Consul", kind: "icon", icon: siConsul },
  { label: "Nomad", kind: "icon", icon: siNomad },
  { label: "Argo CD", kind: "icon", icon: siArgo },
  { label: "AWS", kind: "image", src: "/images/logos/aws.webp", alt: "AWS" },
  { label: "Google Cloud", kind: "icon", icon: siGooglecloud },
  { label: "Azure", kind: "text" },
  // Cruvio / Studifex systems
  { label: "Go", kind: "icon", icon: siGo },
  { label: "Python", kind: "icon", icon: siPython },
  { label: "FastAPI", kind: "icon", icon: siFastapi },
  { label: "PostgreSQL", kind: "icon", icon: siPostgresql },
  { label: "Supabase", kind: "icon", icon: siSupabase },
  { label: "Redis", kind: "icon", icon: siRedis },
  { label: "SQLite", kind: "icon", icon: siSqlite },
  { label: "River", kind: "text" },
  { label: "Render", kind: "icon", icon: siRender },
  { label: "Vercel", kind: "icon", icon: siVercel },
  // AI / RAG / agents
  { label: "LangGraph", kind: "icon", icon: siLanggraph },
  { label: "LangChain", kind: "icon", icon: siLangchain },
  { label: "MCP", kind: "icon", icon: siModelcontextprotocol },
  { label: "Pinecone", kind: "text" },
  { label: "Ollama", kind: "icon", icon: siOllama },
  { label: "Hugging Face", kind: "icon", icon: siHuggingface },
  { label: "Anthropic", kind: "icon", icon: siAnthropic },
  { label: "Claude", kind: "icon", icon: siClaude },
  // Observability
  { label: "Prometheus", kind: "icon", icon: siPrometheus },
  { label: "Grafana", kind: "icon", icon: siGrafana },
  { label: "OpenTelemetry", kind: "icon", icon: siOpentelemetry },
  { label: "Datadog", kind: "icon", icon: siDatadog },
  { label: "PostHog", kind: "icon", icon: siPosthog },
  // Product surfaces (kept sparse)
  { label: "Next.js", kind: "icon", icon: siNextdotjs },
  { label: "TypeScript", kind: "icon", icon: siTypescript },
];

const focusAreas = [
  {
    title: "Terraform Enterprise",
    body: "Day-to-day work inside enterprise control planes: upgrades, auth and VCS wiring, workspaces and modules under real customer pressure, not lab demos.",
  },
  {
    title: "Product systems",
    body: "Cruvio and Studifex are where the harder build work shows up: Go governance APIs, River workers, FastAPI RAG sidecars, Pinecone retrieval, Supabase RLS, and AWS-backed object storage.",
  },
  {
    title: "How systems fail",
    body: "The useful skill is diagnosing the gap between intended architecture and what still runs after credentials rotate, data dependencies shift, and on-call starts.",
  },
];

export const TechStack = () => {
  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.35em] text-emerald-800/70">
          Where the work lives
        </p>
        <Heading as="h2" className="mb-4 text-xl font-normal md:text-2xl lg:text-3xl">
          Platform depth{" "}
          <span className="font-light text-stone-400">before tool lists</span>
        </Heading>
        <p className="mb-12 max-w-2xl text-base leading-relaxed text-stone-600 md:text-lg">
          Most of my week is HashiCorp Terraform Enterprise across AWS, Azure, and GCP. The harder product
          engineering shows up in Cruvio (governance APIs, connectors, document pipelines) and Studifex (RAG,
          grading graphs, vector retrieval). The names below are the surfaces those systems actually touch — not a
          beginner checklist. Detail lives in{" "}
          <Link
            href="/projects"
            className="font-medium text-emerald-700 underline-offset-4 hover:underline"
          >
            selected projects
          </Link>{" "}
          and the{" "}
          <Link
            href="/resume"
            className="font-medium text-emerald-700 underline-offset-4 hover:underline"
          >
            resume
          </Link>
          .
        </p>
      </motion.div>

      <div className="mb-16 grid grid-cols-1 gap-10 border-t border-stone-200/80 pt-10 md:grid-cols-3 md:gap-8">
        {focusAreas.map((area, idx) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
          >
            <h3 className="font-heading text-base font-normal text-stone-900 md:text-lg">
              {area.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-500">{area.body}</p>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-stone-100 pt-10">
        <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.35em] text-stone-400">
          Systems I build and operate with
        </p>
        <p className="mb-6 max-w-xl text-sm text-stone-500">
          From enterprise platform support and from shipping Cruvio and Studifex — not every logo is a specialty, but
          none of these are filler.
        </p>

        <ul className="flex flex-wrap gap-2.5">
          {toolboxItems.map((item) => (
            <li
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-stone-200/80 bg-[#FAF9F6]/80 px-3.5 py-2 text-sm font-normal text-stone-700"
            >
              {item.kind === "icon" ? (
                <TechStackBrandIcon icon={item.icon} className="h-5 w-5 shrink-0" />
              ) : item.kind === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={20}
                  height={20}
                  className="h-5 w-5 shrink-0 object-contain"
                  unoptimized
                />
              ) : (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" aria-hidden />
              )}
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
