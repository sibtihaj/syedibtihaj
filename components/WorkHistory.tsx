import Link from "next/link";
import { timeline } from "@/constants/timeline";

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="mt-5 max-w-[46rem] space-y-3">
    {items.map((item) => (
      <li key={item} className="relative pl-5 text-[0.95rem] leading-relaxed text-ink-body">
        <span aria-hidden className="absolute left-0 top-[0.7em] h-px w-2.5 bg-cobalt" />
        {item}
      </li>
    ))}
  </ul>
);

/** Experience section of the resume, read straight from constants/timeline.tsx. */
export const WorkHistory = () => {
  return (
    <ol className="divide-y divide-rule">
      {timeline.map((item) => (
        <li
          key={`${item.company}-${item.title}`}
          className="grid gap-3 py-10 first:pt-0 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10"
        >
          <p className="pt-1 text-sm tabular-nums text-ink-muted">{item.date}</p>
          <div>
            <h3 className="text-[1.35rem] leading-snug">{item.company}</h3>
            <p className="mt-1 text-[0.95rem] text-cobalt">{item.title}</p>
            <Bullets items={item.responsibilities} />
            {item.subsections?.map((sub) => (
              <div key={sub.title} className="mt-8 border-l border-cobalt/30 pl-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h4 className="font-heading text-[1.1rem] text-ink">
                    {sub.href ? (
                      <Link href={sub.href} className="ink-link">
                        {sub.title}
                      </Link>
                    ) : (
                      sub.title
                    )}
                  </h4>
                  {sub.date ? <p className="text-sm tabular-nums text-ink-muted">{sub.date}</p> : null}
                </div>
                {sub.note ? <p className="mt-1 text-sm italic text-ink-muted">{sub.note}</p> : null}
                <Bullets items={sub.items} />
              </div>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
};
