"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { navlinks } from "@/constants/navlinks";
import { socials } from "@/constants/socials";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Site navigation.
 * Wide screens: a transparent rail on the left, always rendered by CSS.
 * Narrow screens: a compact top bar with a labelled menu button.
 * Both layouts are in the server HTML, so nothing depends on window size at render.
 */
export const Sidebar = () => {
  return (
    <>
      <DesktopRail />
      <MobileBar />
    </>
  );
};

const Avatar = ({ size }: { size: number }) => (
  <Image
    src="/images/headshot.jpeg"
    alt=""
    width={size}
    height={size}
    priority
    className="rounded-full object-cover ring-1 ring-ink/10"
    style={{ width: size, height: size }}
  />
);

const DesktopRail = () => {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col px-8 py-10 lg:flex xl:w-64">
      <Link href="/" className="group block rounded-lg" aria-label="Syed Ibtihaj, home">
        <Avatar size={80} />
        <p className="mt-5 font-heading text-[1.35rem] leading-tight text-ink">Syed Ibtihaj</p>
        <p className="mt-1.5 text-sm leading-snug text-ink-muted">
          Product support engineering,
          <br />
          Terraform Enterprise
        </p>
      </Link>

      <nav aria-label="Main" className="mt-12">
        <ul className="space-y-0.5">
          {navlinks.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative flex items-center py-2 text-[0.95rem] transition-colors duration-200",
                    active ? "text-ink" : "text-ink-muted hover:text-ink"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "mr-3 h-px bg-[image:var(--ink-gradient)] transition-all duration-300 ease-ink",
                      active ? "w-6" : "w-2 opacity-40 group-hover:w-4 group-hover:opacity-100"
                    )}
                  />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto space-y-1 text-sm">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="block py-1 text-ink-muted transition-colors hover:text-cobalt"
          >
            {s.label}
          </a>
        ))}
        <p className="pt-3 text-ink-muted">Melbourne, VIC</p>
      </div>
    </div>
  );
};

const MobileBar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const closeOnDesktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => closeOnDesktop.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    closeOnDesktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      closeOnDesktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <div className="sticky top-0 z-50 lg:hidden">
      <div
        className={cn(
          "flex h-16 items-center justify-between border-b px-4 backdrop-blur-md transition-colors sm:px-6",
          open ? "border-transparent bg-paper" : "border-ink/5 bg-paper/80"
        )}
      >
        <Link href="/" className="flex min-h-[44px] items-center gap-3 rounded-lg">
          <Avatar size={36} />
          <span className="font-heading text-lg text-ink">Syed Ibtihaj</span>
        </Link>
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 min-w-[44px] items-center gap-2 rounded-full border border-ink/15 px-4 text-sm text-ink transition-colors hover:border-ink/30"
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span aria-hidden className="relative block h-2.5 w-4">
            <span
              className={cn(
                "absolute left-0 top-0 h-px w-4 bg-ink transition-transform duration-300",
                open && "translate-y-[5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-px w-4 bg-ink transition-transform duration-300",
                open && "-translate-y-[4px] -rotate-45"
              )}
            />
          </span>
        </button>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-paper px-6 pb-10 pt-6"
      >
        <nav aria-label="Main">
          <ul>
            {navlinks.map((link, i) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href} className="border-b border-rule">
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-baseline justify-between py-4 font-heading text-[1.75rem] leading-none",
                      active ? "text-cobalt" : "text-ink"
                    )}
                  >
                    {link.label}
                    {active ? <span className="font-sans text-sm text-ink-muted">You are here</span> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem]">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex min-h-[44px] items-center text-ink-muted hover:text-cobalt"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
