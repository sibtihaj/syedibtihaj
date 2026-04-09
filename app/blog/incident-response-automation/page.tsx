import { BlogLayout } from "@/components/BlogLayout";

const meta = {
  date: "2025-10-15",
  title: "The Hidden Cost of Docker Prune in Terraform Enterprise Production Environments",
  description:
    "Why aggressive Docker pruning can slow incident recovery in Terraform Enterprise, and how to clean up disk safely without breaking operations.",
  image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2400&q=80",
  category: "Terraform Enterprise Support",
  tags: ["terraform-enterprise", "docker", "operations", "incident-response"],
};

export default function Page() {
  return (
    <BlogLayout meta={meta}>
      <p>
        Disk pressure is a common trigger during Terraform Enterprise incident handling. One frequent mistake is
        reaching for <code>docker system prune -a</code> too early, especially during production troubleshooting
        windows where speed and predictability matter most.
      </p>

      <h2>Why This Becomes a Recovery Risk</h2>

      <p>
        Docker marks resources as unused when they are not referenced by running containers. In Terraform Enterprise
        environments, that can include stopped containers and images that are still operationally important for
        restart, rollback, or post-incident validation.
      </p>

      <p>
        In online environments, pruning too aggressively means re-pulling large image sets before services can
        stabilize. In airgapped environments, the same action can create extended downtime if installation bundles are
        not immediately available.
      </p>

      <h2>Safer Cleanup Sequence</h2>

      <p>A safer approach is to inspect first, then prune in narrow stages:</p>

      <ul>
        <li>
          <code>docker ps -a</code> to confirm what exists beyond active containers.
        </li>
        <li>
          <code>docker system df</code> to validate where disk is actually being consumed.
        </li>
        <li>
          <code>docker volume ls</code> before touching anything volume-related.
        </li>
        <li>
          <code>docker container prune -f</code> as an initial low-risk cleanup step.
        </li>
        <li>
          <code>docker image prune -f</code> for dangling images only.
        </li>
      </ul>

      <p>The most important operational distinction is this:</p>

      <ul>
        <li>
          <code>docker image prune</code> is generally safer because it targets dangling images.
        </li>
        <li>
          <code>docker image prune -a</code> is destructive in production troubleshooting because it removes all unused
          images, including ones needed for Terraform Enterprise recovery paths.
        </li>
      </ul>

      <h2>Airgapped Environment Considerations</h2>

      <p>
        When internet re-pull is not an option, prune actions should be treated as change-controlled operations. Back
        up critical images before cleanup and maintain a known-good inventory for restore paths.
      </p>

      <h2>Support Links</h2>

      <p>
        <strong>HashiCorp Support article:</strong>{" "}
        <a href="https://support.hashicorp.com/hc/en-us/articles/41908140525715-The-Hidden-Cost-of-Docker-Prune-Troubleshooting-Challenges-in-Production-Environments">
          The Hidden Cost of Docker Prune: Troubleshooting Challenges in Production Environments
        </a>
      </p>

      <p>
        <strong>IBM Support article:</strong>{" "}
        <a href="https://www.ibm.com/support/pages/hidden-cost-docker-prune-troubleshooting-challenges-production-environments">
          The Hidden Cost of Docker Prune: Troubleshooting Challenges in Production Environments
        </a>
      </p>

      <blockquote>
        <p>
          HashiCorp Support content migrated to IBM Support on April 1, 2026. The IBM link is included as the current
          support platform reference.
        </p>
      </blockquote>
    </BlogLayout>
  );
}
