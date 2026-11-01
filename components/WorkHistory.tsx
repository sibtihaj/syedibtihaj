import { timeline } from "@/constants/timeline";

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
            <p className="mt-4 max-w-measure leading-relaxed text-ink-body">{item.description}</p>
            <ul className="mt-5 max-w-[46rem] space-y-3">
              {item.responsibilities.map((resp) => (
                <li key={resp} className="relative pl-5 text-[0.95rem] leading-relaxed text-ink-body">
                  <span aria-hidden className="absolute left-0 top-[0.7em] h-px w-2.5 bg-cobalt" />
                  {resp}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
};
