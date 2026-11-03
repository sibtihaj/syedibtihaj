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
        "font-heading text-xl font-normal text-ink md:text-2xl lg:text-3xl",
        className
      )}
    >
      {children}
    </Tag>
  );
};
