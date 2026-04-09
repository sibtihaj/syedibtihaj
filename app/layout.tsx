import { Sidebar } from "@/components/Sidebar";
import Grainient from "@/components/Grainient";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Libre_Franklin, Noto_Serif } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";
import { getSiteUrl } from "@/lib/site";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
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
      className={twMerge(notoSerif.variable, libreFranklin.variable)}
    >
      <body
        className={twMerge(
          "antialiased bg-zinc-100 text-zinc-900 font-sans",
          libreFranklin.className
        )}
      >
        <div className="fixed inset-0 pointer-events-none opacity-[0.2] z-0">
          <Grainient
            color1="#3b82f6"
            color2="#0ea5e9"
            color3="#6366f1"
            warpStrength={0.5}
            timeSpeed={0.1}
            grainAmount={0.05}
          />
        </div>

        {/* Main Noise Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50"></div>

        <div className="flex flex-col lg:flex-row min-h-screen relative">
          <aside className="lg:sticky lg:top-0 lg:h-screen z-[100]">
            <Sidebar />
          </aside>

          <main className="flex-1 lg:pl-2">
            <div className="min-h-screen lg:rounded-tl-3xl border-l border-t border-zinc-200 bg-white/80 backdrop-blur-sm shadow-2xl relative">
              {children}
              <Footer />
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
