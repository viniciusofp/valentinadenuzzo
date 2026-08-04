import GoogleAnalytics from "@/components/GoogleAnalytics";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WebVitals } from "@/components/WebVitals";
import { Cormorant_Garamond, Hanken_Grotesk, Parastoo } from "next/font/google";
import React from "react";
import "./styles.css";
import Link from "next/link";
import { ReactLenis, useLenis } from "lenis/react";
import Nav from "@/components/Nav";

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
          <Nav />
          <main className="pt-14">
            {children}
            {/* Google Analytics - @next/third-parties optimized - loads after hydration */}
            <GoogleAnalytics />
            {/* Core Web Vitals Tracking */}
            <WebVitals />
          </main>
          <footer className="mt-12 mb-6 text-center text-xs text-stone-400">
            Desenvolvido por{" "}
            <Link
              href="https://www.viniciusofp.com.br"
              className="font-semibold hover:underline"
              target="_blank"
            >
              viniciusofp
            </Link>
            .
          </footer>
        </TooltipProvider>
      </body>
    </html>
  );
}
