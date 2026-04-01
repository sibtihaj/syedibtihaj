import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
    <html lang="en" className={twMerge(bricolage.className, inter.variable)}>
      <body
        className={twMerge(
          "flex antialiased h-screen overflow-hidden bg-zinc-950 text-zinc-200"
        )}
      >
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative">
          {/* Noise Texture Overlay */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50"></div>
          
          <div className="lg:pl-2 lg:pt-2 h-full">
            <div className="min-h-screen lg:rounded-tl-3xl border-l border-t border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-y-auto shadow-2xl">
              {children}
              <Footer />
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
