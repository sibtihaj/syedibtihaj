import { cn } from "@/lib/utils";

export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("prose max-w-none md:prose-lg prose-headings:mt-12 prose-pre:rounded-xl", className)}>
      {children}
    </div>
  );
}
