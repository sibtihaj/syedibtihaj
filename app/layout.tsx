import { Sidebar } from "@/components/Sidebar";
import { Backdrop } from "@/components/Backdrop";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Outfit, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { getSiteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

// Variable fonts: Source Serif 4 keeps its optical-size axis so large headings
// use the display cut and small ones the text cut.
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: {
    default: "Syed Ibtihaj",
    template: "%s | Syed Ibtihaj",
  },
  description:
    "Syed Ibtihaj is a Senior Product Support Engineer at HashiCorp and the founder of Webifex Labs, a freelance studio shipping web products for clients.",
  metadataBase: new URL(siteUrl),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    images: [
      {
        url: "/images/headshot.jpeg",
        width: 800,
        height: 800,
        alt: "Syed Ibtihaj",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/headshot.jpeg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f5f1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(sourceSerif.variable, outfit.variable)}>
      <body className="min-h-screen bg-paper font-sans text-ink-body antialiased">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-sm text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Backdrop />

        <div className="relative min-h-screen lg:flex">
          <Sidebar />

          <main id="main" className="min-w-0 flex-1 lg:py-3 lg:pr-3">
            <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-paper/[0.92] lg:min-h-[calc(100vh-1.5rem)] lg:rounded-[1.75rem] lg:border lg:border-white/70 lg:shadow-[0_1px_2px_rgba(13,27,62,0.04),0_40px_80px_-48px_rgba(13,27,62,0.35)]">
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
