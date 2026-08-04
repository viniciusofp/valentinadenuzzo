import GoogleAnalytics from "@/components/GoogleAnalytics";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WebVitals } from "@/components/WebVitals";
import { Cormorant_Garamond, Hanken_Grotesk, Parastoo } from "next/font/google";
import React from "react";
import "./styles.css";
import Link from "next/link";
import { ReactLenis, useLenis } from "lenis/react";

// export const metadata = {
//   description: "A blank template using Payload in a Next.js app.",
//   title: "Payload Blank Template",
// };

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-sans",
});

const parastoo = Parastoo({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-serif",
});

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en" className={`${hanken.variable} ${parastoo.variable}`}>
      <ReactLenis root />

      <body className="dark font-sans antialiased">
        <TooltipProvider>
          <nav className="fixed top-0 z-99 flex h-14 w-full items-center bg-stone-950 px-4 lg:px-16">
            <Link
              href="/"
              className="font-serif text-sm tracking-widest uppercase md:text-base"
            >
              Valentina Denuzzo{" "}
              <span className="text-stone-500">| Direção de Fotografia</span>
            </Link>
          </nav>
          <main className="pt-14">
            {children}
            {/* Google Analytics - @next/third-parties optimized - loads after hydration */}
            <GoogleAnalytics />
            {/* Core Web Vitals Tracking */}
            <WebVitals />
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}
