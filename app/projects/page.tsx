import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { ProjectList } from "@/components/ProjectList";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies of web products Syed Ibtihaj built and shipped through Webifex Labs.",
};

export default function Projects() {
  return (
    <Container>
      <PageIntro
        label="Projects"
        title={
          <>
            Three builds, written up as <span className="ink-text italic">case studies</span>.
          </>
        }
      >
        <p>
          Each write-up walks through the architecture and how the pieces fit together. I am publishing more of
          the code on{" "}
          <Link href="https://github.com/sibtihaj" target="_blank" rel="noopener noreferrer" className="ink-link">
            GitHub
          </Link>{" "}
          and keep this page current as new builds ship.
        </p>
      </PageIntro>
      <ProjectList headingLevel="h2" />
    </Container>
  );
}
