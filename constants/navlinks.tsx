import { FileText, FolderOpen, House, Mail, PenLine, UserRound, type LucideIcon } from "lucide-react";
import type { Navlink } from "@/types/navlink";

export type NavItem = Navlink & {
  /** Decorative glyph shown beside the label; the label stays the accessible name. */
  icon: LucideIcon;
};

export const navlinks: NavItem[] = [
  { href: "/", label: "Home", icon: House },
  { href: "/about", label: "About", icon: UserRound },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/blog", label: "Articles", icon: PenLine },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/contact", label: "Contact", icon: Mail },
];
