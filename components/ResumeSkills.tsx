import Image from "next/image";
import { certificationBadges } from "@/constants/certificationBadges";
import { certificationsDetailed, skillsBlocks } from "@/constants/resumeContent";

/** Skills from the resume as a two-column index: area, then the list. */
export const ResumeSkills = () => {
  return (
    <dl className="divide-y divide-rule border-y border-rule">
      {skillsBlocks.map((block) => (
        <div key={block.title} className="grid gap-2 py-5 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10">
          <dt className="font-heading text-[1.1rem] text-ink">{block.title}</dt>
          <dd className="leading-relaxed text-ink-body">{block.items}</dd>
        </div>
      ))}
    </dl>
  );
};

function badgeFor(title: string) {
  const key = title.split(" - ")[0].toLowerCase();
  return certificationBadges.find((b) => key.startsWith(b.title.toLowerCase()) || b.title.toLowerCase().startsWith(key));
}

/** Certifications with their badge and what each one covers, plus training badges. */
export const ResumeCertifications = () => {
  const matched = new Set<string>();
  const rows = certificationsDetailed.map((cert) => {
    const badge = badgeFor(cert.title);
    if (badge) matched.add(badge.title);
    return { cert, badge };
  });
  const training = certificationBadges.filter((b) => !matched.has(b.title));

  return (
    <div>
      <ul className="grid gap-x-10 gap-y-10 md:grid-cols-2">
        {rows.map(({ cert, badge }) => (
          <li key={cert.title} className="flex gap-5">
            {badge ? (
              <Image
                src={badge.src}
                alt=""
                width={72}
                height={72}
                unoptimized
                className="h-16 w-16 shrink-0 object-contain md:h-[72px] md:w-[72px]"
              />
            ) : null}
            <div>
              <h3 className="text-[1.15rem] leading-snug">{cert.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-body">{cert.description}</p>
            </div>
          </li>
        ))}
      </ul>
      {training.length ? (
        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-rule pt-6">
          <p className="field-label">Training</p>
          {training.map((badge) => (
            <span key={badge.title} className="inline-flex items-center gap-3 text-[0.95rem] text-ink">
              <Image src={badge.src} alt="" width={40} height={40} unoptimized className="h-10 w-10 object-contain" />
              {badge.title}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
};
