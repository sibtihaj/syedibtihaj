import React from "react";
import { twMerge } from "tailwind-merge";

export const Paragraph = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={twMerge(
        "max-w-2xl text-sm font-normal leading-relaxed text-ink-body md:text-base",
        className
      )}
    >
      {children}
    </p>
  );
};
