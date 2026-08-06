import { cn } from "@/lib/utils";
import { MoveHorizontal, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";

export const CustomCursor = ({ className }: { className: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: any) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      style={{
        left: position.x,
        top: position.y,
      }}
      className={cn(
        "pointer-events-none fixed z-90 flex -translate-y-1/2 items-center gap-2 rounded-sm bg-black/20 px-6 py-2 text-xs font-medium text-white backdrop-blur-sm",
        className,
      )}
    >
      <p className="font-mono text-[10px] tracking-widest uppercase">
        Saiba Mais
      </p>
    </div>
  );
};
