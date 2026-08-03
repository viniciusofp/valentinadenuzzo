import GoogleAnalytics from "@/components/GoogleAnalytics";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WebVitals } from "@/components/WebVitals";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import React from "react";
import "./styles.css";

// export const metadata = {
//   description: "A blank template using Payload in a Next.js app.",
//   title: "Payload Blank Template",
// };

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-serif",
});

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en" className={`${hanken.variable} ${cormorant.variable}`}>
      <body className="dark p-4 font-sans md:p-5">
        <TooltipProvider>
          <main className="">
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
