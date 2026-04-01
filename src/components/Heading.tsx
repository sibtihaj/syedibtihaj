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
        "text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight text-zinc-100",
        className
      )}
    >
      {children}
    </Tag>
  );
};
