import Link from "next/link";

export const ButtonCTA = () => {
  return (
    <div className="absolute top-0 inset-x-0 flex justify-center">
      <Link
        href="/projects"
        className="no-underline group cursor-pointer relative shadow-xl shadow-zinc-200 rounded-full p-px text-[10px] font-normal leading-6 text-zinc-900 inline-block bg-white border border-zinc-100"
      >
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(16,185,129,0.1)_0%,rgba(16,185,129,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-white py-1 px-4 ring-1 ring-zinc-200/50 group-hover:ring-blue-500/30 transition-all">
          <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent uppercase tracking-[0.2em]">View Projects</span>
          <span className="text-blue-500 transition-transform group-hover:translate-x-0.5">→</span>
        </div>
      </Link>
    </div>
  );
};
