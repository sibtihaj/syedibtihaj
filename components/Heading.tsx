import React from "react";
import { twMerge } from "tailwind-merge";

export const Heading = ({
  className,
  children,
  as: Tag = "h1",
  id,
}: {
  className?: string;
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  id?: string;
}) => {
  return (
    <Tag
      id={id}
      className={twMerge(
        "font-heading text-2xl md:text-3xl lg:text-5xl font-normal tracking-tight text-zinc-900",
        className
      )}
    >
      {children}
    </Tag>
  );
};
