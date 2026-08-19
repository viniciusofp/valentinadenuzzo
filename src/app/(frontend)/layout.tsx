import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Nav from "@/components/Nav";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WebVitals } from "@/components/WebVitals";
import { Chivo_Mono, Hanken_Grotesk, Parastoo } from "next/font/google";
import React from "react";
import "./styles.css";

import BG from "@/public/bg.jpg";
// export const metadata = {
//   description: "A blank template using Payload in a Next.js app.",
//   title: "Payload Blank Template",
// };

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-sans",
});

const serif = Parastoo({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-serif",
  fallback: [],
});
const mono = Chivo_Mono({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-mono",
});

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body
        className="dark bg-cover bg-fixed font-sans antialiased"
        style={{ backgroundImage: `url('/014.jpg')` }}
      >
        <TooltipProvider>
          <Nav />
          <main className="">
            {children}
            {/* Google Analytics - @next/third-parties optimized - loads after hydration */}
            <GoogleAnalytics />
            {/* Core Web Vitals Tracking */}
            <WebVitals />
          </main>
          <Footer />
        </TooltipProvider>

        <Toaster />
      </body>
    </html>
  );
}
