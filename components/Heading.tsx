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
        "font-heading text-xl md:text-2xl lg:text-3xl font-normal tracking-normal text-stone-900",
        className
      )}
    >
      {children}
    </Tag>
  );
};
