import Image from "next/image";
import Link from "next/link";
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
import { SectionHeading } from "./SectionHeading";
import { TechStackBrandIcon } from "./TechStackBrandIcon";

type ToolboxItem =
  | { label: string; kind: "icon"; icon: SimpleIcon }
  | { label: string; kind: "image"; src: string; alt: string }
  | { label: string; kind: "text" };

/**
 * Advanced surfaces from HashiCorp/AWS day work plus Cruvio and Studifex builds.
 * Intentionally omits commodity labels (Git, Tailwind, generic Node).
 */
const toolboxGroups: { name: string; items: ToolboxItem[] }[] = [
  {
    name: "Enterprise platform",
    items: [
      { label: "Terraform", kind: "icon", icon: siTerraform },
      { label: "HashiCorp", kind: "icon", icon: siHashicorp },
      { label: "Kubernetes", kind: "icon", icon: siKubernetes },
      { label: "Helm", kind: "icon", icon: siHelm },
      { label: "Consul", kind: "icon", icon: siConsul },
      { label: "Nomad", kind: "icon", icon: siNomad },
      { label: "Argo CD", kind: "icon", icon: siArgo },
      { label: "AWS", kind: "image", src: "/images/logos/aws.webp", alt: "" },
      { label: "Google Cloud", kind: "icon", icon: siGooglecloud },
      { label: "Azure", kind: "text" },
    ],
  },
  {
    name: "Cruvio and Studifex systems",
    items: [
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
    ],
  },
  {
    name: "AI, retrieval and agents",
    items: [
      { label: "LangGraph", kind: "icon", icon: siLanggraph },
      { label: "LangChain", kind: "icon", icon: siLangchain },
      { label: "MCP", kind: "icon", icon: siModelcontextprotocol },
      { label: "Pinecone", kind: "text" },
      { label: "Ollama", kind: "icon", icon: siOllama },
      { label: "Hugging Face", kind: "icon", icon: siHuggingface },
      { label: "Anthropic", kind: "icon", icon: siAnthropic },
      { label: "Claude", kind: "icon", icon: siClaude },
    ],
  },
  {
    name: "Observability",
    items: [
      { label: "Prometheus", kind: "icon", icon: siPrometheus },
      { label: "Grafana", kind: "icon", icon: siGrafana },
      { label: "OpenTelemetry", kind: "icon", icon: siOpentelemetry },
      { label: "Datadog", kind: "icon", icon: siDatadog },
      { label: "PostHog", kind: "icon", icon: siPosthog },
    ],
  },
  {
    name: "Product surfaces",
    items: [
      { label: "Next.js", kind: "icon", icon: siNextdotjs },
      { label: "TypeScript", kind: "icon", icon: siTypescript },
    ],
  },
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

const ItemMark = ({ item }: { item: ToolboxItem }) => {
  if (item.kind === "icon") {
    return <TechStackBrandIcon icon={item.icon} className="h-4 w-4 shrink-0 text-ink/70" />;
  }
  if (item.kind === "image") {
    return (
      <Image
        src={item.src}
        alt={item.alt}
        width={16}
        height={16}
        className="h-4 w-4 shrink-0 object-contain opacity-80 grayscale"
        unoptimized
      />
    );
  }
  return <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-cobalt" />;
};

export const TechStack = () => {
  return (
    <div>
      <SectionHeading index="03" id="stack" title="Where the work lives" />

      <p className="max-w-measure text-[1.0625rem] leading-relaxed text-ink-body">
        Most of my week is HashiCorp Terraform Enterprise across AWS, Azure, and GCP. The harder product
        engineering shows up in Cruvio (governance APIs, connectors, document pipelines) and Studifex (RAG, grading
        graphs, vector retrieval). The names below are the surfaces those systems actually touch, not a beginner
        checklist. Detail lives in{" "}
        <Link href="/projects" className="ink-link">
          selected projects
        </Link>{" "}
        and the{" "}
        <Link href="/resume" className="ink-link">
          resume
        </Link>
        .
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        {focusAreas.map((area) => (
          <div key={area.title} className="border-t border-ink/80 pt-5">
            <h3 className="text-[1.2rem]">{area.title}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-body">{area.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h3 className="text-[1.2rem]">Systems I build and operate with</h3>
        <p className="mt-2 max-w-measure text-[0.95rem] text-ink-muted">
          From enterprise platform support and from shipping Cruvio and Studifex. Not every logo is a specialty, but
          none of these are filler.
        </p>
        <dl className="mt-6 divide-y divide-rule border-y border-rule">
          {toolboxGroups.map((group) => (
            <div key={group.name} className="grid gap-3 py-5 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8">
              <dt className="field-label pt-0.5">{group.name}</dt>
              <dd>
                <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.label} className="inline-flex items-center gap-2 text-[0.95rem] text-ink">
                      <ItemMark item={item} />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-ink-muted">Brand marks are shown for recognition only.</p>
      </div>
    </div>
  );
};
