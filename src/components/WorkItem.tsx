"use client";

import { Media, Work } from "@/payload-types";
import { workAsyncStorage } from "next/dist/server/app-render/work-async-storage.external";
import Link from "next/link";
import { CustomCursor } from "./CustomCursor";
import { cn } from "@/lib/utils";

export type WorkItemProps = { work: Work };

export default function WorkItem({ work }: WorkItemProps) {
  const thumb = (work.frames as Media[])[0];
  return (
    <Link href={`/${work.slug}`} className="group **:duration-300">
      <div className="relative mb-2 aspect-video w-full overflow-hidden">
        <img
          src={thumb.sizes?.half?.url || thumb.url || ""}
          alt=""
          className="h-full w-full object-cover object-center group-hover:scale-105"
        />
      </div>
      <h2 className="font-serif text-xl tracking-wide sm:text-2xl md:text-xl lg:text-2xl">
        {work.title}
      </h2>
      <p className="text-xs tracking-wider text-stone-500 uppercase">
        {work.metadata?.role}, {work.metadata?.year}.
      </p>

      <CustomCursor className={cn("hidden group-hover:flex")} />
    </Link>
  );
}
