import type { ComponentType, SVGProps } from "react";

export type TablerIconComponent = ComponentType<
  SVGProps<SVGSVGElement> & { className?: string }
>;

export type Navlink = {
  href: string;
  label: string;
  icon: TablerIconComponent;
};
