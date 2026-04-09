import React from "react";
import { twMerge } from "tailwind-merge";

export const Highlight = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <span
      className={twMerge(
        "bg-emerald-500/10 text-emerald-800 px-1 py-0.5 rounded font-medium",
        className
      )}
    >
      {children}
    </span>
  );
};
