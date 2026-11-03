import React from "react";
import { cn } from "@/lib/utils";

/**
 * Section opener used across the site: an italic serif numeral, the heading,
 * and an ink rule that fades into the page.
 */
export const SectionHeading = ({
  index,
  title,
  id,
  aside,
  className,
}: {
  index: string;
  title: React.ReactNode;
  id?: string;
  aside?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("mb-10", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id={id} className="flex items-baseline gap-4 text-[1.6rem] leading-tight md:text-[1.9rem]">
          <span aria-hidden className="font-heading text-lg italic text-cobalt">
            {index}
          </span>
          <span>{title}</span>
        </h2>
        {aside ? <div className="text-sm text-ink-muted">{aside}</div> : null}
      </div>
      <div aria-hidden className="ink-rule mt-4" />
    </div>
  );
};
