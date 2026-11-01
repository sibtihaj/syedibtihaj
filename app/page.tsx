import Image from "next/image";
import Link from "next/link";
import { ActionLink } from "@/components/ActionLink";
import { ArticleIndex } from "@/components/ArticleIndex";
import { Container } from "@/components/Container";
import { InkUnderline } from "@/components/InkUnderline";
import { ProjectList } from "@/components/ProjectList";
import { SectionHeading } from "@/components/SectionHeading";
import { TechStack } from "@/components/TechStack";
import { certificationBadges } from "@/constants/certificationBadges";
import { getAllBlogMeta } from "@/lib/getAllBlogs";

const caseFile = [
  {
    term: "Now",
    title: "HashiCorp (now IBM)",
    detail: "Senior Product Support Engineer, Terraform Enterprise. Since Nov 2024.",
  },
  {
    term: "Before",
    title: "Amazon Web Services",
    detail: "Cloud Support Engineer on Amazon EKS and ECS escalations. 2022 to 2024.",
  },
  {
    term: "Alongside",
    title: "Webifex Labs",
    detail: "Founding engineer, building web products for clients. Since 2022.",
  },
  {
    term: "Heading toward",
    title: "Solutions architecture",
    detail: null,
  },
];

const delay = (ms: number) => ({ ["--rise-delay" as string]: `${ms}ms` });

export default async function Home() {
  const articles = await getAllBlogMeta();

  return (
    <Container>
      <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:gap-14 xl:gap-20">
        <div className="pt-2 lg:pt-8">
          <p className="field-label rise">Syed Ibtihaj, product support engineering</p>
          <h1
            className="rise mt-6 text-[2.15rem] leading-[1.08] sm:text-[2.6rem] lg:text-[3.05rem]"
            style={delay(80)}
          >
            I work in the gap between what a team meant to deploy and what{" "}
            <InkUnderline>still runs</InkUnderline>.
          </h1>
          <div
            className="rise mt-8 max-w-measure space-y-4 text-[1.0625rem] leading-relaxed text-ink-body md:text-lg"
            style={delay(180)}
          >
            <p>
              Most of my week is Terraform Enterprise for large customers on AWS, Azure and GCP: upgrades,
              credentials, data dependencies and real on-call pressure. Before HashiCorp I handled Amazon EKS
              escalations at AWS.
            </p>
            <p>
              Since 2022 I have also built and shipped web products for clients through Webifex Labs. Two of those
              builds are written up below.
            </p>
          </div>
          <div className="rise mt-9 flex flex-wrap gap-3" style={delay(260)}>
            <ActionLink href="/resume">Read the resume</ActionLink>
            <ActionLink href="#work" variant="quiet">
              See the builds
            </ActionLink>
          </div>
        </div>

        <aside
          aria-label="At a glance"
          className="rise self-start rounded-2xl border border-ink/10 bg-white/60 p-6 backdrop-blur-sm lg:mt-10"
          style={delay(340)}
        >
          <dl className="divide-y divide-rule">
            {caseFile.map((row) => (
              <div key={row.term} className="py-4 first:pt-0">
                <dt className="field-label">{row.term}</dt>
                <dd className="mt-1">
                  <span className="font-heading text-[1.1rem] text-ink">{row.title}</span>
                  {row.detail ? (
                    <span className="mt-1 block text-sm leading-snug text-ink-muted">{row.detail}</span>
                  ) : null}
                </dd>
              </div>
            ))}
            <div className="pt-4">
              <dt className="field-label">Certified</dt>
              <dd className="mt-3">
                <ul className="flex flex-wrap gap-1.5">
                  {certificationBadges.map((badge) => (
                    <li key={badge.title}>
                      <Image
                        src={badge.src}
                        alt={badge.title}
                        title={badge.title}
                        width={40}
                        height={40}
                        unoptimized
                        className="h-10 w-10 object-contain"
                      />
                    </li>
                  ))}
                </ul>
                <Link href="/resume#certifications" className="ink-link mt-3 inline-block text-sm">
                  What each one covers
                </Link>
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      <section aria-labelledby="work" className="mt-28 scroll-mt-24 md:mt-36">
        <SectionHeading
          index="01"
          id="work"
          title="Recent builds"
          aside={
            <Link href="/projects" className="ink-link">
              All projects
            </Link>
          }
        />
        <ProjectList />
      </section>

      <section aria-labelledby="writing" className="mt-28 md:mt-36">
        <SectionHeading
          index="02"
          id="writing"
          title="Published support articles"
          aside="Also on HashiCorp and IBM Support"
        />
        <ArticleIndex articles={articles} />
      </section>

      <section aria-labelledby="stack" className="mt-28 md:mt-36">
        <TechStack />
      </section>

      <section className="mt-28 md:mt-36">
        <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-12 text-paper sm:px-10 md:px-14 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, #1e4fd6 0%, transparent 70%)" }}
          />
          <h2 className="relative max-w-2xl text-[1.75rem] leading-tight text-paper md:text-[2.2rem]">
            Hiring for solutions architecture, or have a project in mind?
          </h2>
          <p className="relative mt-5 max-w-xl leading-relaxed text-[#c9d3ea]">
            I would like to hear about roles where someone needs to diagram a target state and defend it under
            production pressure. Selected code is on{" "}
            <a
              href="https://github.com/sibtihaj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-paper"
            >
              GitHub
            </a>
            .
          </p>
          <div className="relative mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:syedibtihaj12@gmail.com"
              className="inline-flex min-h-[44px] items-center rounded-full bg-paper px-5 text-[0.95rem] text-ink transition-colors hover:bg-white"
            >
              Email syedibtihaj12@gmail.com
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center rounded-full border border-paper/30 px-5 text-[0.95rem] text-paper transition-colors hover:border-paper/70"
            >
              Other ways to reach me
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}
