import React from "react";
import { twMerge } from "tailwind-merge";

export const Container = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge("max-w-6xl w-full mx-auto py-12 md:py-24 px-6 md:px-12", className)}>
      {children}
    </div>
  );
};
