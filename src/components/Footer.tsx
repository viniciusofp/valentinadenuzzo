"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";
import BG from "@/public/tripofobia.png";

export type FooterProps = {};

export default function Footer(props: FooterProps) {
  return (
    <div className="relative z-1 w-full pt-12 pb-6">
      <footer className="relative z-2 mx-auto w-fit rounded-xs bg-white/40 px-3 py-1.5 text-center font-mono text-[10px] tracking-widest uppercase backdrop-blur-xs">
        Desenvolvido por{" "}
        <Link
          href="https://www.viniciusofp.com.br"
          className="font-bold hover:underline"
          target="_blank"
        >
          viniciusofp
        </Link>
        .
      </footer>
    </div>
  );
}
