import { Sidebar } from "@/components/Sidebar";
import Grainient from "@/components/Grainient";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";

// Load Plein for headings
const plein = localFont({
  src: "../../fonts/Plein_Complete/Fonts/WEB/fonts/Plein-Variable.woff2",
  display: "swap",
  variable: "--font-plein",
});

// Load CalSans for body
const calsans = localFont({
  src: "../../fonts/CalSans-SemiBold.woff2",
  display: "swap",
  variable: "--font-calsans",
});

export const metadata: Metadata = {
  title: "Syed Ibtihaj - Developer",
  description:
    "Syed Ibtihaj is a full-stack developer building scalable and reliable digital products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={twMerge(plein.variable, calsans.variable)}>
      <body
        className={twMerge(
          "flex antialiased h-screen overflow-hidden bg-zinc-100 text-zinc-900",
          calsans.className
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
