import type { Product } from "@/types/products";
import { NexSevContent } from "@/components/project-content/NexSevContent";

const project1 = "/images/project-feature-1.png";
const project2 = "/images/project-feature-2.png";
const project3 = "/images/project-algochurn-1.png";
const project4 = "/images/project-algochurn-2.png";
const project5 = "/images/project-moonbeam-1.png";
const project6 = "/images/project-moonbeam-2.png";
const project7 = "/images/project-tailwindkit-1.png";
const project8 = "/images/project-tailwindkit-2.png";

export const products: Product[] = [
  {
    href: "https://github.com/sibtihaj",
    title: "NexSev: AI-Powered Incident Response",
    description:
      "HackWeek-led build: LLMs, LangChain agents, and MCP tools to automate RCA, CANs, and knowledge retrieval—cutting post-Sev1 documentation time by ~40% for HashiCorp/IBM APJ.",
    thumbnail: project5,
    images: [project5, project6],
    stack: [
      "LangChain",
      "Ollama",
      "Next.js",
      "Python",
      "FastAPI",
      "MCP",
      "Slack",
      "Zendesk",
    ],
    slug: "nexsev",
    content: <NexSevContent />,
  },
  {
    href: "#",
    title: "Infrastructure Observability Engine",
    description:
      "Enterprise-grade observability and incident response systems for Terraform and cloud infrastructure.",
    thumbnail: project1,
    images: [project1, project2],
    stack: ["Nextjs", "Tailwindcss", "PostgreSQL", "Terraform"],
    slug: "infrastructure-observability",
    content: (
      <div>
        <p>
          Designed and implemented comprehensive observability frameworks for enterprise-scale
          infrastructure. Focused on building intuitive dashboards and automated incident 
          response systems that reduce MTTR and improve system reliability.
        </p>
        <p>
          Leveraged Datadog and Grafana to build proactive monitoring solutions, while 
          architecting secure, private networking environments across AWS, Azure, and GCP.
        </p>
      </div>
    ),
  },
  {
    href: "#",
    title: "Cloud Performance Scaler",
    description:
      "Advanced escalation support and deep technical investigations for EKS and container platforms.",
    thumbnail: project3,
    images: [project3, project4],
    stack: ["AWS", "EKS", "Kubernetes", "IAM"],
    slug: "cloud-scaler",
    content: (
      <div>
        <p>
          Managed high-severity escalations for AWS container platforms, performing root-cause
          analysis for complex networking and security issues within EKS and ECS environments.
        </p>
        <p>
          Provided architectural guidance for global enterprise workloads, focusing on
          optimizing cluster performance and ensuring robust security postures through
          custom IAM and VPC configurations.
        </p>
      </div>
    ),
  },
  {
    href: "#",
    title: "AI-Driven Automation Systems",
    description:
      "Full-stack AI workflows and automation platforms built for diverse enterprise clients.",
    thumbnail: project5,
    images: [project5, project6],
    stack: ["Nextjs", "OpenAI", "React", "TypeScript"],
    slug: "ai-automation",
    content: (
      <div>
        <p>
          Developed and deployed production-ready AI applications integrating custom-hosted
          models and OpenAI APIs. Built to streamline internal workflows and automate 
          complex business processes.
        </p>
        <p>
          Focused on creating seamless user experiences while managing high-concurrency
          backend operations and secure data handling for sensitive client information.
        </p>
      </div>
    ),
  },
  {
    href: "#",
    title: "Enterprise E-Commerce Framework",
    description:
      "Scalable e-commerce systems with multi-gateway payment integrations and real-time inventory tracking.",
    thumbnail: project7,
    images: [project7, project8],
    stack: ["Nextjs", "Stripe", "PostgreSQL", "Tailwindcss"],
    slug: "ecommerce-framework",
    content: (
      <div>
        <p>
          Architected and maintained robust e-commerce platforms capable of handling 
          thousands of concurrent users. Integrated Stripe and PayPal for secure, 
          multi-currency transaction processing.
        </p>
        <p>
          Implemented real-time data synchronization between frontend displays and 
          backend databases, ensuring accurate inventory management and order tracking.
        </p>
      </div>
    ),
  },
];
