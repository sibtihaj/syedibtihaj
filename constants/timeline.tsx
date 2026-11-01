/**
 * Experience, taken from public/ibtihaj-resume.pdf (October 2026 version).
 * `description` is a one-line summary of the role's bullets for the About page;
 * `responsibilities` and `subsections` carry the resume wording.
 */

export type TimelineSubsection = {
  title: string;
  /** Optional link to a case study on this site. */
  href?: string;
  date?: string;
  note?: string;
  items: string[];
};

export type TimelineEntry = {
  company: string;
  title: string;
  date: string;
  description: string;
  responsibilities: string[];
  subsections?: TimelineSubsection[];
};

export const timeline: TimelineEntry[] = [
  {
    company: "CodeRabbit",
    title: "Senior Product Support Engineer",
    date: "Aug 2026 - Present",
    description:
      "Support for CodeRabbit's AI code review platform, including its early-stage enterprise self-hosted deployments.",
    responsibilities: [
      "Investigate customer-reported bugs, reproduce them with root-cause evidence, and log them in Linear with reproduction steps, diagnostic evidence and customer impact. Implement fixes in the codebase and submit pull requests for review and approval by the engineering team.",
      "Helping build CodeRabbit's support capability for enterprise self-hosted (on-premises) deployments, an early-stage offering. Applying lessons from supporting HashiCorp's self-managed products to shape troubleshooting runbooks, diagnostic data collection, escalation paths and reproduction environments, so enterprise installs can be supported reliably as adoption grows.",
      "Act as a technical point of contact for early enterprise self-hosted customers, working through installation, configuration and integration issues in their own environments and feeding deployment gaps back to Engineering to harden the product for on-premises use.",
      "Work directly with customers to troubleshoot, debug, reproduce and resolve complex technical issues on CodeRabbit's AI-powered code review platform, including Git platform integrations (GitHub, GitLab, Bitbucket, Azure DevOps) and review configuration.",
      "Run customer calls to resolve escalations, improve their experience and drive product adoption, educating engineering teams on best-practice usage so they get full value from their investment.",
      "Partner with developers to identify defects and product improvement opportunities, turning reproducible evidence and customer feedback into bugs, feature requests and roadmap input.",
      "Improve product serviceability by testing new features and building tools and automation that scale deployments and the auto-support infrastructure.",
      "Support Customer Success and Sales on retention and expansion motions, and analyse the install base to surface and reduce risk before it affects customers.",
    ],
  },
  {
    company: "HashiCorp (IBM)",
    title: "Senior Product Support Engineer (Enterprise & On-Premises)",
    date: "Nov 2024 - Jul 2026",
    description:
      "Support for self-managed Terraform Enterprise, Consul Enterprise and Nomad Enterprise deployments run by customers in their own environments.",
    responsibilities: [
      "Supported self-managed (on-premises) deployments of Terraform Enterprise, Consul Enterprise and Nomad Enterprise, installed and operated by customers inside their own environments (their AWS, Azure and GCP accounts, private data centres and air-gapped networks) rather than HashiCorp's managed cloud (HCP).",
      "Owned high-severity (Sev1) incidents for large enterprise customers, where a TFE outage halted infrastructure delivery across the whole organisation. Worked methodically through logs, configuration and database state in live production systems, where a wrong step could corrupt Terraform state or cause data loss, so every change was evidence-based, reviewed and reversible.",
      "Troubleshot the full stack around each installation: Flexible Deployment Options on Docker, Podman and Kubernetes (Helm), legacy Replicated installs, external PostgreSQL, Redis and object storage (S3, Azure Blob, GCS), load balancers, proxies, DNS, custom CA and TLS certificate chains, and restricted network egress.",
      "Diagnosed failures where TFE was embedded in customers' CI/CD pipelines, covering VCS webhooks (GitHub Enterprise, GitLab, Bitbucket, Azure DevOps), API-driven runs from GitHub Actions, GitLab CI, Jenkins and Azure Pipelines, TFE agents in private networks, run tasks, Sentinel/OPA policy checks and workspace state issues.",
      "Debugged Consul service mesh and service discovery failures (cluster peering, WAN federation, mesh gateway routing, ACLs) and Nomad scheduling, allocation, CSI volume and Vault secrets integration issues in production.",
      "Reproduced issues with clear evidence and worked with Engineering and product owners through triage and roadmap discussions, articulating customer impact so fixes landed in a way customers could rely on.",
      "Led an observability initiative on TFE's telemetry (metrics endpoints, log patterns, distributed traces) and authored customer documentation and sample Datadog/Grafana dashboards for proactive detection of service degradation.",
      "Authored deployment playbooks, incident response runbooks and official Terraform documentation as a subject matter expert, reducing resolution times and repeat tickets.",
      "Guided enterprise customers through installs, upgrades and migrations of self-managed TFE (including Replicated to Flexible Deployment Options), and advised on architecture and scaling for high-volume workloads.",
    ],
    subsections: [
      {
        title: "Cross-Product Projects and Research",
        items: [
          "Led a cross-functional Hack Week team building NexSev, an AI-powered incident response assistant automating Sev1 workflows. Led the build of a Slack bot with Zendesk and knowledge base integrations using LLMs (Llama 3.1, Granite via Ollama), custom MCP tools, and a Next.js interface with Vercel AI SDK streaming to generate CAN reports and RCA documentation and provide troubleshooting guidance from historical data.",
          "Led escalation calls and RCA sessions with cross-functional teams, using Datadog, Prometheus and CloudWatch to diagnose production incidents and improve platform reliability.",
          "Served as primary in the PagerDuty on-call rotation for Terraform Enterprise, Consul Enterprise and Nomad Enterprise.",
        ],
      },
    ],
  },
  {
    company: "Webifex Labs",
    title: "Founder & Lead Engineer (Part-time / Freelance)",
    date: "Aug 2022 - Present",
    description:
      "Client web applications and AI features, built with a development team alongside full-time roles, plus the Studifex EdTech product.",
    responsibilities: [
      "Led a development team delivering 20+ production web applications for clients in pharmaceutical, education and non-profit sectors, owning architecture, client scoping and delivery using Next.js, TypeScript and React.",
      "Built full-stack e-commerce platforms with Stripe/PayPal integrations, authentication systems and PostgreSQL/MongoDB backends supporting real-time inventory management.",
      "Built AI-powered features using Vercel AI SDK and the OpenAI API, including streaming chat interfaces, document processing workflows and intelligent form assistants for pharmaceutical and legal services clients.",
    ],
    subsections: [
      {
        title: "Studifex EdTech SaaS",
        href: "/projects/studifex",
        date: "Mar 2026 - Jun 2026",
        note: "Built through Webifex Labs",
        items: [
          "Built a Python FastAPI RAG service (Python 3.12, managed with uv) that validates and chunks PDF and DOCX documents, generates embeddings and serves retrieval to the Next.js app through a typed client.",
          "Pinecone: dense and sparse indexes searched in parallel, merged with reciprocal rank fusion, reranked with Cohere Rerank 3.5, then source content hydrated from Supabase.",
          "LangGraph: orchestrated the marking workflow (quality gate, OCR, LaTeX normalisation, step segmentation, retrieval, rubric comparison and result storage), with timeouts, error handling and confidence-based routing.",
          "Mathpix: primary OCR for handwritten maths working, converting it to LaTeX for comparison against model solutions.",
          "Fireworks AI (Kimi K2.6, DeepSeek R1): LaTeX normalisation fallback, document structuring and judge escalation for hard cases.",
          "AWS Bedrock (Claude): the grading judge for borderline marks, and the post-marking coach. I moved the judge from open-source models to Bedrock Claude after open-source models proved unreliable in that role.",
          "Supabase: Postgres for grades and content, Auth with JWT verification, and file storage for student uploads.",
          "Next.js, React and TypeScript on Vercel for the student, teacher and admin portals; KaTeX for maths rendering; PostHog for product analytics.",
          "Built an evaluation runner for grading models, measuring exact mark agreement, mean absolute mark error, criterion F1 and JSON validity.",
          "Deployment and observability: the RAG service runs on AWS EC2 in Sydney, deployed by GitHub Actions with OIDC and IAM roles for Bedrock access. Langfuse traces LLM calls, OpenTelemetry instruments the service, Sentry captures errors, and structlog sends logs to Axiom.",
        ],
      },
    ],
  },
  {
    company: "Amazon Web Services",
    title: "Cloud Support Engineer",
    date: "Dec 2022 - Aug 2024",
    description: "Escalation support for Amazon EKS and related container services in enterprise environments.",
    responsibilities: [
      "Managed escalation tickets raised by Cloud Engineers for the EKS service, conducting deep technical investigations and supporting high-severity EKS cases.",
      "Collaborated with customers to configure and optimise enterprise-grade, mission-critical systems, resolving complex issues effectively.",
      "Handled high-severity (business-critical system) cases, maintaining adherence to a 4-hour resolution SLA.",
      "Advised enterprises on AWS services including EKS, ECS, Fargate, App Mesh, X-Ray, ECR, AWS Batch, IAM, CloudWatch, CloudTrail, CloudFormation, EC2, Cloud Map, Amazon Managed Prometheus, Grafana, VPC and Route 53.",
      "Completed a Subject Matter Expert technical pathway for the EKS service while performing in the role.",
      "Carried out on-call duties for the EKS service, supporting Cloud Engineers with escalated issues and high-severity escalation tickets, and for the deployment profile on a four-week rotation.",
    ],
  },
  {
    company: "Amazon Web Services",
    title: "Associate Cloud Support Engineer",
    date: "Jan 2022 - Dec 2022",
    description: "Enterprise, Business and Developer support, mainly on Amazon EKS and ECS.",
    responsibilities: [
      "Handled Enterprise, Business and Developer customer cases, providing architecture advice and best-practice guidance.",
      "Performed resource-specific troubleshooting, mainly for Elastic Kubernetes Service and Elastic Container Service, in live contact with customers around the globe.",
      "Worked on a broad spectrum of technical issues relating to AWS services and customer-specific architecture.",
      "Completed the training and evaluation phase and transitioned from a cybersecurity background to meeting KPIs in the containers profile (EKS and ECS).",
    ],
  },
  {
    company: "Various Organisations",
    title: "Early Career Support & Administration Roles",
    date: "Sep 2017 - Jan 2022",
    description:
      "Support and administration roles across government, retail IT, a non-profit and higher education.",
    responsibilities: [
      "Product Support Officer, Dept of Justice & Community Safety (Aug 2021 - Jan 2022): Logged incidents and service requests, coordinated between customer needs and vendors, resolved application, software and hardware issues, and took part in 24/7 after-hours support for business-critical systems.",
      "Service Desk Analyst, Officeworks (Jan 2021 - Jul 2021): First point of contact for IT support across the store network; logged and prioritised incidents, troubleshot hardware and software issues, escalated complex cases and monitored resolution to minimise business impact.",
      "Gap Year (2020): Completed final degree requirements during the COVID-19 pandemic.",
      "Salesforce & Website Administrator, Summer Foundation (Jan 2019 - Dec 2019): Administered Salesforce and The Housing Hub platform, implemented complex workflow logic and APIs, and supported 24 remote staff across Australia with macOS, iOS and app issues.",
      "Examinations Officer, RMIT University (Sep 2017 - Dec 2018): Coordinated digitally lodged theses and projects, maintained administrative processes in line with university policy, monitored examination workflow and advised on higher degree administration.",
    ],
  },
];
