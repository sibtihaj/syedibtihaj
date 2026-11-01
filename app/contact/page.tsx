import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Syed Ibtihaj about a role or a project.",
};

const EMAIL_PRIMARY = "syedibtihaj12@gmail.com";
const EMAIL_SECONDARY = "syedibtihajulhaque@live.com";
const PHONE_DISPLAY = "0470 465 820";
const PHONE_TEL = "+61470465820";

const details: { term: string; value: React.ReactNode }[] = [
  {
    term: "Email",
    value: (
      <>
        <a href={`mailto:${EMAIL_PRIMARY}`} className="ink-link break-all">
          {EMAIL_PRIMARY}
        </a>
        <span className="mt-1 block text-sm text-ink-muted">
          or{" "}
          <a href={`mailto:${EMAIL_SECONDARY}`} className="ink-link break-all">
            {EMAIL_SECONDARY}
          </a>
        </span>
      </>
    ),
  },
  {
    term: "Phone",
    value: (
      <a href={`tel:${PHONE_TEL}`} className="ink-link">
        {PHONE_DISPLAY}
      </a>
    ),
  },
  { term: "Based in", value: "Melbourne, VIC" },
  {
    term: "LinkedIn",
    value: (
      <a href="https://www.linkedin.com/in/ib-02" target="_blank" rel="noopener noreferrer" className="ink-link">
        linkedin.com/in/ib-02
      </a>
    ),
  },
  {
    term: "GitHub",
    value: (
      <a href="https://github.com/sibtihaj" target="_blank" rel="noopener noreferrer" className="ink-link">
        github.com/sibtihaj
      </a>
    ),
  },
];

export default function ContactPage() {
  return (
    <Container>
      <PageIntro
        label="Contact"
        title={
          <>
            An <span className="ink-text italic">opportunity</span> or a project in mind?
          </>
        }
      >
        <p>
          Email is the quickest way to reach me, and I will respond as soon as I can. The form opens your own email app with
          the message filled in.
        </p>
      </PageIntro>

      <div className="grid gap-14 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16">
        <dl className="divide-y divide-rule border-y border-rule">
          {details.map((row) => (
            <div key={row.term} className="py-5">
              <dt className="field-label">{row.term}</dt>
              <dd className="mt-1.5 text-[1.0625rem] text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>

        <section aria-labelledby="write" className="rounded-2xl border border-ink/10 bg-white/60 p-6 sm:p-8">
          <h2 id="write" className="text-[1.5rem]">
            Write to me
          </h2>
          <p className="mb-8 mt-2 text-ink-muted">Share a short note and I will reply by email.</p>
          <Contact />
        </section>
      </div>
    </Container>
  );
}
