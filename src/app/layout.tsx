import { Sidebar } from "@/components/Sidebar";
import Grainient from "@/components/Grainient";
import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Ubuntu } from "next/font/google";
import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";

// Load Ubuntu from Google Fonts
const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-ubuntu",
});

// Plein — local heading option (toggle in src/config/typography.ts)
const plein = localFont({
  src: "../../fonts/Plein_Complete/Fonts/WEB/fonts/Plein-Variable.woff2",
  display: "swap",
  variable: "--font-plein",
});

// Manrope — Google heading option (toggle in src/config/typography.ts)
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Syed Ibtihaj",
  description:
    "Syed Ibtihaj is a Senior Support Engineer at HashiCorp and the founder of Webifex Labs, a freelance studio shipping web products for clients.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={twMerge(plein.variable, manrope.variable, ubuntu.variable)}
    >
      <body
        className={twMerge(
          "flex antialiased h-screen overflow-hidden bg-zinc-100 text-zinc-900",
          ubuntu.className
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
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative">
          {/* Noise Texture Overlay */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50"></div>
          
          <div className="lg:pl-2 lg:pt-2 h-full">
            <div className="min-h-screen lg:rounded-tl-3xl border-l border-t border-zinc-200 bg-white/80 backdrop-blur-sm overflow-y-auto shadow-2xl">
              {children}
              <Footer />
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
