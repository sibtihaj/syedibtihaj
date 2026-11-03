import React from "react";
import { cn } from "@/lib/utils";

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("mx-auto w-full max-w-5xl px-5 pb-8 pt-10 sm:px-8 md:px-12 lg:pt-16", className)}>
      {children}
    </div>
  );
};
