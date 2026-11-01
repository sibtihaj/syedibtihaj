import Link from "next/link";
import { socials } from "@/constants/socials";

export const Footer = () => {
  return (
    <footer className="mt-24 border-t border-rule px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 text-sm text-ink-muted md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-heading text-base text-ink">Syed Ibtihaj</p>
          <p className="mt-1">Melbourne, VIC</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex min-h-[44px] items-center transition-colors hover:text-cobalt lg:min-h-0"
              >
                {s.label}
                {s.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/resume"
              className="inline-flex min-h-[44px] items-center transition-colors hover:text-cobalt lg:min-h-0"
            >
              Resume
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
