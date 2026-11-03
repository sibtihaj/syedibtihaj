/**
 * On-site resume copy, taken from public/ibtihaj-resume.pdf (October 2026 version).
 * Keep this file, constants/timeline.tsx and the PDF in sync when the CV changes.
 */

export const resumeHeader = {
  name: "Syed Haque",
  email: "syedibtihaj12@gmail.com",
  phone: "0470 465 820",
  location: "Melbourne, VIC",
  linkedInLabel: "LinkedIn: @syed Ibtihaj",
  linkedInHref: "https://www.linkedin.com/in/ib-02",
  githubLabel: "github.com/sibtihaj",
  githubHref: "https://github.com/sibtihaj",
} as const;

/** Career summary from the PDF, word for word, split into paragraphs for reading on screen. */
export const careerSummary = [
  "Customer-facing infrastructure engineer with approximately seven years of experience across technical support, enterprise infrastructure and software development. At AWS I handled Amazon EKS escalations for business-critical Kubernetes and container workloads, working directly with customers under strict SLAs. At HashiCorp (IBM) I supported self-managed Terraform Enterprise, Consul and Nomad deployments, focusing on the DevOps and CI/CD pipelines around them, including incidents that interrupted infrastructure delivery across whole organisations. That work involved troubleshooting Kubernetes, cloud networking, databases, TLS and CI/CD integrations, and turning findings into clear guidance, reproducible issues and product feedback.",
  "At CodeRabbit I apply that background to AI developer tooling and support for enterprise self-hosted deployments. I investigate customer-reported bugs, document findings in Linear, implement fixes and submit pull requests for engineering review.",
  "Alongside these roles, I founded Webifex Labs and delivered 20+ production applications using Next.js, TypeScript and LLM tooling. I built the Python RAG pipeline for an EdTech AI platform, covering document processing, hybrid retrieval and rubric-based grading, integrating model APIs and adding evaluation and diagnostic tooling. I hold Kubernetes, AWS and HashiCorp certifications and a cybersecurity degree from Monash, and am completing the Machine Learning Specialization.",
] as const;

export const education = [
  {
    institution: "Monash University",
    credential: "Bachelor of Information Technology (Cybersecurity)",
    period: "Jul 2018 - Jul 2021",
  },
  {
    institution: "Coursera (DeepLearning.AI)",
    credential: "Machine Learning Specialization",
    period: "In progress",
  },
] as const;

export const certificationsDetailed = [
  {
    title: "AWS Certified Solutions Architect - Associate",
    description:
      "Designing secure, scalable and cost-effective AWS architectures across compute, networking, storage, identity, containers and high-availability services.",
  },
  {
    title: "Certified Kubernetes Administrator (CKA)",
    description:
      "Deploying, managing and troubleshooting Kubernetes clusters, with a focus on workload orchestration, cluster operations, networking, storage and security.",
  },
  {
    title: "HashiCorp Certified Terraform Associate",
    description:
      "Writing maintainable Terraform configurations, managing state, and automating cloud infrastructure delivery through version-controlled workflows.",
  },
  {
    title: "HashiCorp Certified Consul Associate",
    description:
      "Service discovery, service networking and service mesh, including secure communication and connectivity across distributed systems.",
  },
] as const;

export const skillsBlocks = [
  {
    title: "AI Developer Tooling",
    items:
      "AI code review workflows, Git platform integrations (GitHub, GitLab, Bitbucket, Azure DevOps), PR automation, developer onboarding and enablement",
  },
  {
    title: "Platform & Infrastructure Engineering",
    items:
      "Terraform Enterprise, Consul, Nomad, Vault, Kubernetes (CKA), Docker/Podman, AWS (EKS, ECS, RDS, VPC, S3, IAM), GCP, Azure, PostgreSQL, Redis, multi-cloud architecture, Infrastructure as Code",
  },
  {
    title: "Full-Stack Development",
    items:
      "Next.js, TypeScript, React, Node.js, Python, MongoDB, PostgreSQL, authentication (OAuth, JWT, RBAC), REST/GraphQL APIs, payment integration (Stripe, PayPal), headless CMS (Sanity, Contentful), FastAPI",
  },
  {
    title: "AI & Automation",
    items:
      "Vercel AI SDK (streaming, tool calling, structured outputs), OpenAI API, Anthropic Claude, Model Context Protocol (MCP), RAG implementations, LangGraph, Pinecone, hybrid retrieval, reranking, Fireworks AI, Mathpix OCR, Langfuse tracing, LLM evaluation metrics",
  },
  {
    title: "DevOps & Reliability",
    items:
      "CI/CD (GitHub Actions, Vercel, Argo CD), Prometheus, Grafana, Datadog, incident management, root cause analysis, performance optimisation, SLA compliance",
  },
] as const;
