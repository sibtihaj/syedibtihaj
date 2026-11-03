import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ActionLink } from "@/components/ActionLink";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { SectionHeading } from "@/components/SectionHeading";
import { certificationBadges } from "@/constants/certificationBadges";
import { timeline } from "@/constants/timeline";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Syed Ibtihaj got from service desks to product support at AWS, HashiCorp and CodeRabbit, and why he is heading toward solutions architecture.",
};

export default function AboutPage() {
  return (
    <Container>
      <PageIntro
        label="About"
        title={
          <>
            Deep in production platforms by day, <span className="ink-text italic">architecture-minded</span>{" "}
            delivery after hours.
          </>
        }
      />

      <section className="grid gap-12 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-14">
        <figure className="rise self-start" style={{ ["--rise-delay" as string]: "200ms" }}>
          <div className="relative aspect-[4/5] w-40 overflow-hidden rounded-2xl border border-ink/10 bg-ink md:w-full">
            <Image
              src="/images/headshot.jpeg"
              alt="Syed Ibtihaj"
              fill
              sizes="(min-width: 768px) 240px, 160px"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <figcaption className="mt-3 text-sm text-ink-muted">Melbourne, VIC</figcaption>
        </figure>

        <div className="max-w-measure space-y-5 text-[1.0625rem] leading-relaxed text-ink-body">
          <p className="text-lg text-ink">
            I&apos;m a Senior Product Support Engineer at CodeRabbit and the founder of Webifex Labs, which I started
            in 2022.
          </p>
          <p>
            I&apos;m deliberately moving toward solutions architect work: customer-facing design conversations,
            trade-offs made explicit, and architectures that survive contact with production, not slide decks that
            ignore how things fail.
          </p>
          <p>
            That direction comes from how I got here. Support and operations first (service desks, Salesforce admin,
            higher-degree administration), then Amazon EKS escalations at AWS, then self-managed Terraform
            Enterprise, Consul and Nomad at HashiCorp (IBM), and now AI developer tooling and enterprise self-hosted
            support at CodeRabbit. Most of that work sits in the gap between what people intend to deploy and what
            actually runs when data, auth and upgrades meet reality.
          </p>
          <p>
            Webifex Labs is where I practise end-to-end ownership beyond day-to-day support: drawing boundaries
            between services, wiring integrations, and making systems observable enough to operate. Most recently I
            built{" "}
            <Link href="/projects/ai-marking" className="ink-link">
              an EdTech AI platform
            </Link>{" "}
            there, which marks students&apos; handwritten maths
            working against the official marking guide.{" "}
            <Link href="/projects/ai-incident-assistant" className="ink-link">
              AI Incident Assistant
            </Link>{" "}
            and{" "}
            <Link href="/projects/ib-scheduling" className="ink-link">
              IB Scheduling
            </Link>{" "}
            are two of my own projects. I&apos;m pushing more of this work to GitHub and keeping this site current so the
            story matches what I ship.
          </p>
        </div>
      </section>

      <figure className="my-24 border-y border-rule py-12 md:my-32 md:py-16">
        <blockquote className="max-w-3xl font-heading text-[1.6rem] italic leading-snug text-ink md:text-[2.1rem]">
          <span className="ink-text">Support taught me where designs crack;</span> building end-to-end taught me
          how to close the loop.
        </blockquote>
        <figcaption className="mt-5 text-sm text-ink-muted">
          The mindset I bring to architecture conversations.
        </figcaption>
      </figure>

      <section aria-labelledby="path">
        <SectionHeading index="01" id="path" title="The path so far" />
        <ol className="relative ml-1.5 border-l border-cobalt/30">
          {timeline.map((role) => (
            <li key={`${role.company}-${role.title}`} className="relative pb-9 pl-8 last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full border-2 border-paper bg-cobalt"
              />
              <p className="text-sm tabular-nums text-ink-muted">{role.date}</p>
              <h3 className="mt-1 text-[1.25rem] leading-snug">{role.company}</h3>
              <p className="mt-0.5 text-[0.95rem] text-ink">{role.title}</p>
              <p className="mt-2 max-w-measure text-[0.95rem] leading-relaxed text-ink-body">{role.description}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10">
          <Link href="/resume#experience" className="ink-link">
            Full responsibilities on the resume
          </Link>
        </p>
      </section>

      <section aria-labelledby="credentials" className="mt-24 md:mt-32">
        <SectionHeading index="02" id="credentials" title="Certifications" />
        <p className="max-w-measure leading-relaxed text-ink-body">
          AWS Solutions Architect - Associate sits alongside CKA and HashiCorp certifications. Together they back up
          the idea that I can talk customer outcomes and platform mechanics in the same conversation.
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {certificationBadges.map((badge) => (
            <li key={badge.title} className="flex flex-col items-start">
              <Image
                src={badge.src}
                alt=""
                width={112}
                height={112}
                unoptimized
                className="h-24 w-24 object-contain md:h-28 md:w-28"
              />
              <p className="mt-4 text-[0.95rem] leading-snug text-ink">{badge.title}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24 border-t border-rule pt-12 md:mt-32">
        <p className="max-w-2xl font-heading text-[1.4rem] leading-snug text-ink md:text-[1.65rem]">
          If you&apos;re hiring for solutions architecture, principal consulting, or a role that needs someone who
          can diagram a target state and defend it under production pressure, I&apos;d like to talk.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ActionLink href="/contact">Get in touch</ActionLink>
          <ActionLink href="/resume" variant="quiet">
            Read the resume
          </ActionLink>
        </div>
      </section>
    </Container>
  );
}
