## Learned User Preferences
- Prefers using the `frontend-design` skill for high-quality, non-generic UI implementations.
- Prefers on-site resume rendering using the existing portfolio template over simple PDF embeds.
- Prefers removing all template-related attribution and placeholder text (e.g., John Doe, Aceternity, Sidefolio) from the codebase.
- Prefers local assets for profile images (e.g., `/images/headshot.jpeg` instead of Unsplash URLs).
- Prefers structured and separate sections for Skills and Certifications in the resume view.
- Prefers light mode for the portfolio while keeping background gradients (not a dark-first theme).
- Prefers blue-forward gradient branding rather than green or flat solid blue.
- Prefers restrained typography and copy: headings not bold and not unnecessarily large; professional, humanized wording that does not read as generic AI output.
- Prefers the sidebar without a solid white panel behind it (minimal / transparent treatment).
- Prefers accurate professional positioning in site copy and resume content (technical services / product support engineering with software engineering experience)—avoid inflated titles such as "senior software engineer" unless accurate.

## Learned Workspace Facts
- The project is a Next.js personal portfolio for Syed Ibtihaj.
- Workspace rule `codacy.mdc` requires running `codacy_cli_analyze` after any file edit.
- The repository structure includes `app/resume/page.tsx` for the resume and `src/components/Sidebar.tsx` for navigation.
- Real professional experience (HashiCorp, AWS, IBM) is stored in `src/constants/timeline.tsx`.
- The resume PDF is stored at `public/Syed-Resume-New.pdf` and serves as the source of truth for professional data.
- The sidebar layout uses a vertical column with an 80x80 rounded avatar and centered text for name/title.
- Certification badge images are in `public/badges/` and used on About and resume-related UI.
- Body text uses Ubuntu via Next.js Google Fonts; headings default to local Plein, with optional Manrope via `config/typography.ts`.
- Local heading font files live under `fonts/Plein_Complete/`.
