import React from "react";

/**
 * A hand-drawn ink stroke under a phrase. The stroke draws in once on load
 * (static under reduced motion). Text stays a plain inline span for readers.
 */
export const InkUnderline = ({
  children,
  delay = 650,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="ink-text relative z-10 italic">{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        className="absolute -bottom-[0.12em] left-[-2%] h-[0.32em] w-[104%] overflow-visible"
      >
        <defs>
          <linearGradient id="ink-underline" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#0b2a6f" />
            <stop offset="0.55" stopColor="#1e4fd6" />
            <stop offset="1" stopColor="#2f6fe0" />
          </linearGradient>
        </defs>
        <path
          d="M2 9.5C38 4.5 92 3 138 4.6c22 .8 42 2.4 60 4.9"
          pathLength={1}
          fill="none"
          stroke="url(#ink-underline)"
          strokeWidth="3.2"
          strokeLinecap="round"
          className="ink-stroke"
          style={{ ["--draw-delay" as string]: `${delay}ms` }}
        />
      </svg>
    </span>
  );
};
