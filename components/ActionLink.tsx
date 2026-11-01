import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "quiet";

const styles: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-cobalt-deep shadow-[0_10px_30px_-14px_rgba(11,42,111,0.7)]",
  quiet: "border border-ink/15 text-ink hover:border-cobalt/50 hover:text-cobalt bg-white/40",
};

/**
 * Link styled as a button. Internal paths use next/link; anything with a
 * protocol opens in a new tab.
 */
export const ActionLink = ({
  href,
  children,
  variant = "primary",
  className,
  download,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  download?: boolean;
}) => {
  const classes = cn(
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 text-[0.95rem] transition-colors duration-200",
    styles[variant],
    className
  );
  const external = /^(https?:|mailto:|tel:)/.test(href);

  if (external || download) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        download={download || undefined}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
};
