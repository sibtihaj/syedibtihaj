import type { Metadata } from "next";
import { ActionLink } from "@/components/ActionLink";
import { Container } from "@/components/Container";
import { ResumeCertifications, ResumeSkills } from "@/components/ResumeSkills";
import { SectionHeading } from "@/components/SectionHeading";
import { WorkHistory } from "@/components/WorkHistory";
import { careerSummary, education, referencesNote, resumeHeader } from "@/constants/resumeContent";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Syed Ibtihaj: Terraform Enterprise support at HashiCorp (now IBM), Amazon EKS support at AWS, and client product work through Webifex Labs.",
};

const RESUME_PDF = "/ibtihaj-resume.pdf";
const delay = (ms: number) => ({ ["--rise-delay" as string]: `${ms}ms` });

export default function ResumePage() {
  const contacts = [
    { label: resumeHeader.email, href: `mailto:${resumeHeader.email}` },
    { label: resumeHeader.phone, href: `tel:+61${resumeHeader.phone.replace(/\s/g, "").replace(/^0/, "")}` },
    { label: resumeHeader.location },
    { label: "LinkedIn", href: resumeHeader.linkedInHref, external: true },
  ];

  return (
    <Container>
      <header className="mb-16 grid gap-8 md:mb-24 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="field-label rise">Resume</p>
          <h1 className="rise mt-5 text-[2.2rem] leading-[1.08] sm:text-[2.6rem] lg:text-[2.9rem]" style={delay(80)}>
            Syed Ibtihaj
          </h1>
          <p className="rise mt-3 text-lg leading-snug text-ink-body" style={delay(140)}>
            Senior Product Support Engineer, Terraform Enterprise
            <span className="ink-text mt-1 block font-heading text-[1.15em] italic">HashiCorp (now IBM)</span>
          </p>
          <ul className="rise mt-6 flex flex-wrap gap-x-6 gap-y-1 text-[0.95rem]" style={delay(200)}>
            {contacts.map((c) => (
              <li key={c.label}>
                {c.href ? (
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex min-h-[44px] items-center text-ink-body transition-colors hover:text-cobalt"
                  >
                    {c.label}
                    {c.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                  </a>
                ) : (
                  <span className="inline-flex min-h-[44px] items-center text-ink-muted">{c.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="rise flex flex-wrap gap-3" style={delay(260)}>
          <ActionLink href={RESUME_PDF} newTab>
            View PDF
            <span className="sr-only"> (opens in a new tab)</span>
          </ActionLink>
          <ActionLink href={RESUME_PDF} variant="quiet" download>
            Download PDF
          </ActionLink>
        </div>
      </header>

      <section aria-labelledby="summary" className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
        <div>
          <SectionHeading index="01" id="summary" title="Summary" />
          <p className="max-w-measure text-[1.0625rem] leading-relaxed text-ink-body md:text-lg">{careerSummary}</p>
        </div>
        <aside aria-labelledby="education" className="lg:pt-[4.6rem]">
          <h2 id="education" className="field-label">
            Education
          </h2>
          <ul className="mt-3 space-y-5">
            {education.map((item) => (
              <li key={item.institution}>
                <p className="font-heading text-[1.15rem] text-ink">{item.institution}</p>
                <p className="mt-1 text-[0.95rem] text-ink-body">{item.credential}</p>
                <p className="mt-1 text-sm tabular-nums text-ink-muted">{item.period}</p>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section aria-labelledby="skills" className="mt-24 md:mt-32">
        <SectionHeading index="02" id="skills" title="Skills" />
        <ResumeSkills />
      </section>

      <section aria-labelledby="certifications" className="mt-24 scroll-mt-24 md:mt-32">
        <SectionHeading index="03" id="certifications" title="Certifications" />
        <ResumeCertifications />
      </section>

      <section aria-labelledby="experience" className="mt-24 scroll-mt-24 md:mt-32">
        <SectionHeading index="04" id="experience" title="Experience" />
        <WorkHistory />
      </section>

      <section className="mt-20 flex flex-col gap-6 border-t border-rule pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-ink-body">
          <span className="field-label mr-3">References</span>
          {referencesNote}
        </p>
        <ActionLink href="/contact" variant="quiet">
          Get in touch
        </ActionLink>
      </section>
    </Container>
  );
}
