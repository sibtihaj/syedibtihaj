import React from "react";
import { twMerge } from "tailwind-merge";
import { HEADING_FONT } from "@/config/typography";

const headingFontClass =
  HEADING_FONT === "manrope" ? "font-manrope" : "font-plein";

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
        "text-2xl md:text-3xl lg:text-5xl font-normal tracking-tight text-zinc-900",
        headingFontClass,
        className
      )}
    >
      {children}
    </Tag>
  );
};
