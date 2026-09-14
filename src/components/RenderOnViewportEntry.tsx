"use client";

import useFirstViewportEntry from "@/lib/useFirstViewportEntry";
import { Suspense, useRef } from "react";

export type RenderOnViewportEntryProps = any;

export default function RenderOnViewportEntry({
  children,
  threshold = 0,
  root = null,
  rootMargin = "0px 0px 0px 0px",
  ...wrapperDivProps
}: RenderOnViewportEntryProps) {
  const ref = useRef(null);
  const entered = useFirstViewportEntry(ref, { threshold, root, rootMargin });

  return (
    <div {...wrapperDivProps} ref={ref}>
      {entered && (
        <Suspense
          fallback={
            <div className="flex aspect-video animate-pulse items-center justify-center rounded-xs bg-stone-200 font-mono text-xs">
              Loading...
            </div>
          }
        >
          {children}
        </Suspense>
      )}
    </div>
  );
}
