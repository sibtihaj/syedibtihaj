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
        "text-sm md:text-base font-normal text-zinc-400 leading-relaxed max-w-2xl",
        className
      )}
    >
      {children}
    </p>
  );
};
