import clsx from "clsx";

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        className,
        "prose prose-sm md:prose-base prose-zinc max-w-none prose-p:text-zinc-600 prose-headings:font-normal prose-headings:text-zinc-900 prose-a:text-blue-600 hover:prose-a:text-blue-700 transition-colors"
      )}
    >
      {children}
    </div>
  );
}
