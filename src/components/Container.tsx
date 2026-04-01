import React from "react";
import { twMerge } from "tailwind-merge";

export const Container = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
  }
>(({ children, className }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        "max-w-6xl w-full mx-auto py-12 md:py-24 px-6 md:px-12",
        className
      )}
    >
      {children}
    </div>
  );
});

Container.displayName = "Container";
