import { Sidebar } from "@/components/Sidebar";
import Grainient from "@/components/Grainient";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";
import { getSiteUrl } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Syed Ibtihaj",
  description:
    "Syed Ibtihaj is a Senior Support Engineer at HashiCorp and the founder of Webifex Labs, a freelance studio shipping web products for clients.",
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
  themeColor: "#f4f4f5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={twMerge(playfair.variable, outfit.variable)}
    >
      <body
        className={twMerge(
          "antialiased bg-[#FAF9F6] text-stone-800 font-sans selection:bg-emerald-500/20 selection:text-emerald-900",
          outfit.className
        )}
      >
        <div className="fixed inset-0 pointer-events-none opacity-[0.15] z-0">
          <Grainient
            color1="#047857" // emerald-700
            color2="#0f766e" // teal-700
            color3="#4d7c0f" // lime-700
            warpStrength={0.7}
            timeSpeed={0.05}
            grainAmount={0.08}
          />
        </div>

        {/* Main Noise Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50 mix-blend-multiply"></div>

        <div className="flex flex-col lg:flex-row min-h-screen relative">
          <aside className="lg:sticky lg:top-0 lg:h-screen z-[100]">
            <Sidebar />
          </aside>

          <main className="flex-1 lg:pl-2">
            <div className="min-h-screen lg:rounded-tl-[2.5rem] border-l border-t border-stone-200/60 bg-[#FAF9F6]/90 backdrop-blur-md shadow-2xl relative">
              {children}
              <Footer />
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
