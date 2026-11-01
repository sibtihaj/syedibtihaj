import React from "react";

/**
 * Opening block for inner pages: a short field label, the page heading and an
 * optional lead paragraph, rising in on load.
 */
export const PageIntro = ({
  label,
  title,
  children,
}: {
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) => {
  return (
    <header className="mb-14 md:mb-20">
      <p className="field-label rise">{label}</p>
      <h1
        className="rise mt-5 max-w-3xl text-[2rem] leading-[1.1] sm:text-[2.4rem] lg:text-[2.75rem]"
        style={{ ["--rise-delay" as string]: "80ms" }}
      >
        {title}
      </h1>
      {children ? (
        <div
          className="rise mt-6 max-w-measure space-y-4 text-[1.0625rem] leading-relaxed text-ink-body md:text-lg"
          style={{ ["--rise-delay" as string]: "160ms" }}
        >
          {children}
        </div>
      ) : null}
    </header>
  );
};
