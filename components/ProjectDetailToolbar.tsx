import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";

type ProjectDetailToolbarProps = {
  projectTitle: string;
};

export function ProjectDetailToolbar({
  projectTitle,
}: ProjectDetailToolbarProps) {
  return (
    <nav
      className="sticky top-0 z-[45] -mx-6 mb-6 border-b border-zinc-100/90 px-6 py-3 md:-mx-12 md:px-12"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2 text-sm text-zinc-500">
        <li>
          <Link
            href="/projects"
            className="rounded-md px-1.5 py-0.5 transition-colors hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Projects
          </Link>
        </li>
        <li aria-hidden>
          <IconChevronRight size={16} className="text-zinc-400" />
        </li>
        <li className="max-w-[70vw] truncate font-medium text-zinc-900">
          {projectTitle}
        </li>
      </ol>
    </nav>
  );
}
