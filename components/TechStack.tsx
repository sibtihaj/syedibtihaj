"use client";

import Image from "next/image";
import React from "react";
import type { SimpleIcon } from "simple-icons";
import {
  siAnthropic,
  siArgo,
  siClaude,
  siConsul,
  siDatadog,
  siDocker,
  siGit,
  siGithubactions,
  siGo,
  siGooglecloud,
  siGrafana,
  siKubernetes,
  siLangchain,
  siLanggraph,
  siModelcontextprotocol,
  siNextdotjs,
  siNomad,
  siNodedotjs,
  siPostgresql,
  siPrometheus,
  siPython,
  siRailway,
  siRedis,
  siSupabase,
  siTailwindcss,
  siTerraform,
  siTypescript,
  siVercel,
} from "simple-icons";
import { IconBinaryTree2, IconFlame } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Heading } from "./Heading";
import { TechStackBrandIcon } from "./TechStackBrandIcon";

type StackCategory = "Platform" | "Delivery" | "Observability" | "AI";

type StackCard =
  | {
      key: string;
      title: string;
      blurb: string;
      category: StackCategory;
      kind: "simple";
      icon: SimpleIcon;
    }
  | {
      key: string;
      title: string;
      blurb: string;
      category: StackCategory;
      kind: "image";
      src: string;
      alt: string;
    }
  | {
      key: string;
      title: string;
      blurb: string;
      category: StackCategory;
      kind: "glyph";
      Glyph: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
      glyphClassName: string;
    };

const stackCards: StackCard[] = [
  {
    key: "argo",
    title: "Argo CD",
    blurb: "GitOps delivery and sync for Kubernetes workloads.",
    category: "Platform",
    kind: "simple",
    icon: siArgo,
  },
  {
    key: "tfe",
    title: "Terraform Enterprise",
    blurb: "Day to day support, upgrades, and automation at enterprise scale.",
    category: "Platform",
    kind: "simple",
    icon: siTerraform,
  },
  {
    key: "consul",
    title: "HashiCorp Consul",
    blurb: "Service discovery, mesh, and connectivity patterns.",
    category: "Platform",
    kind: "simple",
    icon: siConsul,
  },
  {
    key: "nomad",
    title: "HashiCorp Nomad",
    blurb: "Scheduling and orchestration alongside the rest of the stack.",
    category: "Platform",
    kind: "simple",
    icon: siNomad,
  },
  {
    key: "k8s",
    title: "Kubernetes",
    blurb: "CKA level operations, EKS style troubleshooting, workload design.",
    category: "Platform",
    kind: "simple",
    icon: siKubernetes,
  },
  {
    key: "go",
    title: "Go",
    blurb: "APIs and services where typed concurrency and small binaries matter.",
    category: "Platform",
    kind: "simple",
    icon: siGo,
  },
  {
    key: "next",
    title: "Next.js",
    blurb: "App Router, SSR, and production frontends.",
    category: "Delivery",
    kind: "simple",
    icon: siNextdotjs,
  },
  {
    key: "ts",
    title: "TypeScript",
    blurb: "End to end typing for UI, APIs, and tooling.",
    category: "Delivery",
    kind: "simple",
    icon: siTypescript,
  },
  {
    key: "vercel",
    title: "Vercel",
    blurb: "Deploy previews, edge routing, and AI Gateway for production traffic.",
    category: "Delivery",
    kind: "simple",
    icon: siVercel,
  },
  {
    key: "grafana",
    title: "Grafana",
    blurb: "Dashboards, TFE telemetry samples, and on call visibility.",
    category: "Observability",
    kind: "simple",
    icon: siGrafana,
  },
  {
    key: "prometheus",
    title: "Prometheus",
    blurb: "Metrics collection and alerting in customer and lab environments.",
    category: "Observability",
    kind: "simple",
    icon: siPrometheus,
  },
  {
    key: "langchain",
    title: "LangChain",
    blurb: "Agents, tools, and structured flows around LLMs.",
    category: "AI",
    kind: "simple",
    icon: siLangchain,
  },
  {
    key: "langfuse",
    title: "Langfuse",
    blurb: "Tracing and eval hooks for LLM apps in production.",
    category: "AI",
    kind: "glyph",
    Glyph: IconFlame,
    glyphClassName: "h-8 w-8 text-teal-600",
  },
  {
    key: "langsmith",
    title: "LangSmith",
    blurb: "Datasets, regression checks, and observability for chains.",
    category: "AI",
    kind: "glyph",
    Glyph: IconBinaryTree2,
    glyphClassName: "h-8 w-8 text-violet-600",
  },
  {
    key: "claude",
    title: "Claude",
    blurb: "Anthropic models for assistants, drafting, and careful reasoning.",
    category: "AI",
    kind: "simple",
    icon: siClaude,
  },
  {
    key: "mcp",
    title: "Model Context Protocol",
    blurb: "Tool surfaces and context for agents, including incident style demos.",
    category: "AI",
    kind: "simple",
    icon: siModelcontextprotocol,
  },
];

type SupplementaryChip =
  | { label: string; kind: "icon"; icon: SimpleIcon }
  | { label: string; kind: "image"; src: string; alt: string }
  | { label: string; kind: "text" };

/** Also used regularly: from resume and shipped projects */
const supplementaryChips: SupplementaryChip[] = [
  { label: "AWS", kind: "image", src: "/images/logos/aws.webp", alt: "AWS" },
  { label: "Google Cloud", kind: "icon", icon: siGooglecloud },
  { label: "PostgreSQL", kind: "icon", icon: siPostgresql },
  { label: "Redis", kind: "icon", icon: siRedis },
  { label: "Docker", kind: "icon", icon: siDocker },
  { label: "Supabase", kind: "icon", icon: siSupabase },
  { label: "Tailwind CSS", kind: "icon", icon: siTailwindcss },
  { label: "GitHub Actions", kind: "icon", icon: siGithubactions },
  { label: "Git", kind: "icon", icon: siGit },
  { label: "OpenAI", kind: "text" },
  { label: "LangGraph", kind: "icon", icon: siLanggraph },
  { label: "Anthropic", kind: "icon", icon: siAnthropic },
  { label: "Python", kind: "icon", icon: siPython },
  { label: "Node.js", kind: "icon", icon: siNodedotjs },
  { label: "Railway", kind: "icon", icon: siRailway },
  { label: "Datadog", kind: "icon", icon: siDatadog },
];

function StackCardView({ card, idx }: { card: StackCard; idx: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: idx * 0.03 }}
      className="group relative flex gap-4 rounded-2xl border border-stone-200/90 bg-gradient-to-br from-white via-white to-stone-50/90 p-5 shadow-sm transition-all duration-300 hover:border-emerald-800/20 hover:shadow-[inset_0_2px_24px_rgba(45,90,67,0.07),inset_0_0_0_1px_rgba(45,90,67,0.08)] md:gap-5 md:p-6"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-stone-100 bg-stone-50/90 shadow-inner shadow-stone-200/40 transition-colors group-hover:border-emerald-100 group-hover:bg-emerald-50/40 md:h-16 md:w-16">
        {card.kind === "simple" ? (
          <TechStackBrandIcon icon={card.icon} className="h-8 w-8 md:h-9 md:w-9" />
        ) : card.kind === "image" ? (
          <Image
            src={card.src}
            alt={card.alt}
            width={40}
            height={40}
            className="h-9 w-9 object-contain md:h-10 md:w-10"
            unoptimized
          />
        ) : (
          <card.Glyph className={card.glyphClassName} aria-hidden />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-800/75">
          {card.category}
        </p>
        <h3 className="font-heading text-base font-normal leading-snug text-stone-900 md:text-lg">
          {card.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-stone-500">{card.blurb}</p>
      </div>
    </motion.article>
  );
}

export const TechStack = () => {
  return (
    <div className="pt-20">
      <Heading as="h2" className="mb-3 text-xl font-normal md:text-2xl lg:text-3xl">
        Tools <span className="text-stone-400 font-light">& tech I ship with</span>
      </Heading>
      <p className="mb-10 max-w-2xl text-sm leading-relaxed text-stone-500 md:text-base">
        A practical map of what shows up in Terraform Enterprise support work, portfolio builds, and AI side
        projects. Brand marks are for recognition only.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:gap-6">
        {stackCards.map((card, idx) => (
          <StackCardView key={card.key} card={card} idx={idx} />
        ))}
      </div>

      <div className="mt-14 border-t border-stone-100 pt-10">
        <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.35em] text-stone-400">
          Also in the toolbox
        </p>
        <p className="mb-5 max-w-2xl text-sm text-stone-500">
          The rest of what shows up on my CV and in shipped work: multi cloud, data stores, CI, observability, and
          everyday runtime glue.
        </p>
        <ul className="flex flex-wrap gap-2.5">
          {supplementaryChips.map((chip) => (
            <li
              key={chip.label}
              className="inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-white px-3 py-1.5 text-xs font-normal text-stone-600 shadow-sm"
            >
              {chip.kind === "icon" ? (
                <TechStackBrandIcon icon={chip.icon} className="h-4 w-4 shrink-0" />
              ) : chip.kind === "image" ? (
                <Image
                  src={chip.src}
                  alt={chip.alt}
                  width={16}
                  height={16}
                  className="h-4 w-4 shrink-0 object-contain"
                  unoptimized
                />
              ) : (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600/70" aria-hidden />
              )}
              {chip.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};