import type { Product } from "@/types/products";
import { AIIncidentAssistantContent } from "@/components/project-content/AIIncidentAssistantContent";
import { IBSchedulingContent } from "@/components/project-content/IBSchedulingContent";
import { StudifexContent } from "@/components/project-content/StudifexContent";
import {
  AIIncidentBanner,
  IBSchedulingBanner,
  StudifexBanner,
} from "@/components/banners/ProjectBanners";
const ibSchedulingHome = "/images/ib-scheduling-home.png";
const ibSchedulingArch = "/images/ib-scheduling-architecture.png";
const ibSchedulingGrafana = "/images/grafana.png";
const aiIncidentHome = "/images/ai-incident-assistant-home.png";
const aiIncidentLogin = "/images/ai-incident-assistant-login.png";
const aiIncidentFlow = "/images/ai-incident-assistant-flow.png";

export const products: Product[] = [
  {
    // Not publicly launched, so there is no live link and no screenshots.
    href: "",
    title: "Studifex: AI Marking for Handwritten VCE Maths",
    description:
      "A study platform for VCE students that reads photos of handwritten maths working, retrieves the official marking guide and marks it step by step. I built the Next.js portals, the Python marking service and the AWS infrastructure behind it.",
    Banner: StudifexBanner,
    images: [],
    stack: [
      "Next.js",
      "Python",
      "FastAPI",
      "LangGraph",
      "Pinecone",
      "Supabase",
      "AWS Bedrock",
      "Mathpix",
      "AWS EC2",
      "Terraform",
    ],
    slug: "studifex",
    content: <StudifexContent />,
  },
  {
    href: "https://ai-incident-assistant.vercel.app/",
    title: "AI Incident Assistant",
    description:
      "Production-style incident response playground: authenticated chat, MCP incident tools, template-driven CAN/RCA generation, Supabase sessions + quotas, and gateway-routed model orchestration.",
    thumbnail: aiIncidentHome,
    Banner: AIIncidentBanner,
    images: [aiIncidentHome, aiIncidentLogin, aiIncidentFlow],
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "LangChain",
      "MCP",
      "Vercel AI Gateway",
      "Turnstile",
      "LangSmith",
    ],
    slug: "ai-incident-assistant",
    content: <AIIncidentAssistantContent />,
  },
  {
    href: "https://go-booking-system.vercel.app/",
    title: "IB Scheduling: Go + Next.js Booking Platform",
    description:
      "Portfolio booking engine: Supabase Auth + Postgres, Go API (chi, pgx, OIDC JWT) on Railway, Next.js on Vercel, Prometheus/Grafana for metrics - race-safe reservations and full telemetry.",
    thumbnail: ibSchedulingHome,
    Banner: IBSchedulingBanner,
    images: [ibSchedulingHome, ibSchedulingArch, ibSchedulingGrafana],
    stack: [
      "Next.js",
      "Go",
      "Supabase",
      "PostgreSQL",
      "Railway",
      "Vercel",
      "Prometheus",
      "Grafana",
    ],
    slug: "ib-scheduling",
    content: <IBSchedulingContent />,
  },
];
