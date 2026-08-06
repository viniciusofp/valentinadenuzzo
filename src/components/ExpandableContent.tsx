"use client";

import { CustomRichText } from "@/components/CustomRichText";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export type ExpandableContentProps = {
  content: any;
};

export default function ExpandableContent({ content }: ExpandableContentProps) {
  const [show, setShow] = useState(false);
  return (
    <div className="my-6 **:duration-300 **:ease-in-out">
      <p className="mb-px font-serif text-sm tracking-widest text-stone-500 uppercase">
        Mais informações
      </p>
      <div
        className={cn(
          "relative max-h-19 min-h-10 overflow-hidden text-sm",
          show && "max-h-fit pb-12",
        )}
      >
        <button
          className={cn(
            "absolute bottom-0 left-0 z-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xs bg-black/20 px-6 py-2 font-mono text-xs tracking-widest uppercase backdrop-blur-sm duration-300 hover:bg-sky-950",
            !show && "h-full",
          )}
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? (
            <>
              Ocultar <ChevronUp className="size-4" />
            </>
          ) : (
            <>
              Mostrar <ChevronDown className="size-4" />
            </>
          )}
        </button>
        <div
          className={cn(
            "pointer-events-none absolute bottom-0 left-0 z-2 h-full w-full bg-linear-to-t from-black to-black/0",
            show && "opacity-0",
          )}
        ></div>
        <CustomRichText data={content as any} />
      </div>
    </div>
  );
}
