/** On-site resume copy aligned with PDF / Syed-Resume-New.pdf; keep in sync when CV updates. */

export const resumeHeader = {
  name: "Syed Haque",
  email: "syedibtihaj12@gmail.com",
  phone: "0470 465 820",
  location: "Melbourne, VIC",
  linkedInLabel: "LinkedIn: Syed Ibtihaj",
  linkedInHref: "https://www.linkedin.com/in/ib-02",
} as const;

export const careerSummary =
  "Platform engineer with 6+ years architecting cloud infrastructure and full-stack applications for enterprise customers. Proven expertise in Kubernetes, Terraform Enterprise, AWS (certified Solutions Architect), and modern web technologies including 20+ production Next.js deployments. Strong track record translating customer requirements into scalable technical solutions, conducting architecture reviews, and building AI-powered automation using Vercel AI SDK, OpenAI, and agentic workflows. Deep background in system integrations (Version Control Systems, API troubleshooting, multi-cloud deployments) with hands-on experience guiding engineering teams through complex migrations and platform improvements.";

export const education = [
  {
    institution: "Monash University",
    credential: "Bachelor of Information Technology (Cybersecurity)",
    period: "Jul 2018 – Jul 2021",
  },
  {
    institution: "Coursera (Deep Learning AI)",
    credential: "Machine Learning Specialization",
    period: "In progress",
  },
] as const;

export const certificationsDetailed = [
  {
    title: "AWS Certified Solutions Architect – Associate",
    description:
      "Strengthened my ability to design secure, scalable, and cost-effective AWS architectures, with practical knowledge across core compute, networking, storage, identity, containerization and high-availability services.",
  },
  {
    title: "Certified Kubernetes Administrator (CKA)",
    description:
      "Built hands-on capability in deploying, managing, and troubleshooting Kubernetes clusters, with a strong focus on workload orchestration, cluster operations, networking, storage, and security.",
  },
  {
    title: "HashiCorp Certified Terraform Associate",
    description:
      "Developed a solid working knowledge of infrastructure as code, including writing maintainable Terraform configurations, managing state, and automating cloud infrastructure delivery through version-controlled workflows.",
  },
  {
    title: "HashiCorp Certified Consul Associate",
    description:
      "Gained a practical understanding of service discovery, service networking, and service mesh concepts, including how to support secure communication and connectivity across distributed systems.",
  },
] as const;

export const referencesNote = "Furnished upon request.";

export const skillsBlocks = [
  {
    title: "Platform & Infrastructure Engineering",
    items:
      "Terraform Enterprise, Kubernetes (CKA), Docker/Podman, AWS (EKS, ECS, RDS, VPC, S3, IAM), GCP, Azure, PostgreSQL, Redis, Multi-cloud architecture, Infrastructure as Code",
  },
  {
    title: "Full-Stack Development",
    items:
      "Next.js, TypeScript, React, Node.js, Python, MongoDB, PostgreSQL, Authentication (OAuth, JWT, RBAC), REST/GraphQL APIs, Payment Integration (Stripe, PayPal), Headless CMS (Sanity, Contentful)",
  },
  {
    title: "AI & Automation",
    items:
      "Vercel AI SDK (streaming, tool calling, structured outputs), OpenAI API, Anthropic Claude, Model Context Protocol (MCP), RAG implementations, LangChain, LangGraph, Custom AI agents",
  },
  {
    title: "DevOps & Reliability",
    items:
      "CI/CD (GitHub Actions, Vercel, Argo CD), Prometheus, Grafana, Incident management, Root cause analysis, Performance optimization, SLA compliance",
  },
  {
    title: "Enterprise Support",
    items:
      "Technical escalations, Customer architecture reviews, Documentation, Zendesk, Stakeholder communication, Multi-timezone support",
  },
  {
    title: "Tools & Scripting",
    items:
      "Git, Bash, Python scripting, kubectl, eksctl, AWS CLI, TLS/SSL, VCS integrations (GitHub Enterprise, GitLab)",
  },
] as const;
