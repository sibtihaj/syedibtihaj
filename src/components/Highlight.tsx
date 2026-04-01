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
        "bg-gradient-to-r from-blue-500/10 to-sky-500/10 text-blue-700 px-1 py-0.5 rounded font-medium",
        className
      )}
    >
      {children}
    </span>
  );
};
