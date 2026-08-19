"use client";

import { Category, Media, Work } from "@/payload-types";
import { workAsyncStorage } from "next/dist/server/app-render/work-async-storage.external";
import Link from "next/link";
import { CustomCursor } from "./CustomCursor";
import { cn } from "@/lib/utils";

import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { PlayerEntry } from "react-player/players";
import { DivideCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export type WorkItemProps = { work: Work };

export default function WorkItem({ work }: WorkItemProps) {
  const playerRef = useRef(null);
  const thumb = (work.frames as Media[])[0];
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(NaN);
  const [isPlaying, setIsPlaying] = useState(false);
  const play = () => {
    if (!playerRef.current) return;

    (playerRef.current as HTMLMediaElement).play();
    setIsPlaying(true);
  };
  const pause = () => {
    if (!playerRef.current) return;
    (playerRef.current as HTMLMediaElement).pause();
    setIsPlaying(false);
  };
  const handleProgress = () => {
    if (!playerRef.current) return;
    setCurrentTime((playerRef.current as HTMLMediaElement).currentTime);
  };
  const handleDuration = () => {
    if (!playerRef.current) return;
    setDuration((playerRef.current as HTMLMediaElement).duration);
  };
  return (
    <Link href={`/${work.slug}`} className="group relative grid">
      <div className="relative block w-full **:duration-300">
        <div
          className="group relative aspect-video w-full overflow-hidden rounded-xs shadow-xl"
          onMouseEnter={play}
          // onMouseLeave={pause}
          onPointerDown={play}
          // onPointerUp={pause}
          onTouchStart={play}
          // onTouchEnd={pause}
        >
          {isPlaying && !isNaN(duration) ? (
            <div className="absolute bottom-2 left-1 z-7 font-mono text-[10px] tracking-wider text-shadow-xs">
              {Math.floor(Math.round(currentTime) / 60) === 0
                ? "00"
                : Math.floor(Math.round(currentTime) / 60) < 10
                  ? "0" + Math.floor(Math.round(currentTime) / 60)
                  : Math.floor(Math.round(currentTime) / 60)}
              :
              {Math.floor(Math.round(currentTime) % 60) === 0
                ? "00"
                : Math.floor(Math.round(currentTime) % 60) < 10
                  ? "0" + Math.floor(Math.round(currentTime) % 60)
                  : Math.floor(Math.round(currentTime) % 60)}{" "}
              /{" "}
              {Math.floor(Math.round(duration) / 60) === 0
                ? "00"
                : Math.floor(Math.round(duration) / 60) < 10
                  ? "0" + Math.floor(Math.round(duration) / 60)
                  : Math.floor(Math.round(duration) / 60)}
              :
              {Math.floor(Math.round(duration) % 60) === 0
                ? "00"
                : Math.floor(Math.round(duration) % 60) < 10
                  ? "0" + Math.floor(Math.round(duration) % 60)
                  : Math.floor(Math.round(duration) % 60)}
            </div>
          ) : null}
          {/* <AnimatePresence>
            {!isPlaying || isNaN(duration) ? (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                src={thumb.sizes?.half?.url || thumb.url || ""}
                alt=""
                className="z-3 h-full w-full object-cover object-center"
              />
            ) : null}
          </AnimatePresence> */}

          {isPlaying && !isNaN(duration) ? (
            <div className="absolute bottom-0 left-0 z-7 h-1 w-full bg-stone-800">
              <div
                className="h-1 min-w-px bg-sky-600"
                style={{ width: (currentTime / duration) * 100 + "%" }}
              ></div>
            </div>
          ) : null}
          <ReactPlayer
            ref={playerRef}
            src={work.videoUrl || ""}
            muted={true}
            className="h-full w-full object-cover"
            width={"100%"}
            height={"100%"}
            onTimeUpdate={handleProgress}
            // light={
            //   <img src="https://i.vimeocdn.com/video/1515732489-eab3fe43638be9b0e1214bb9a3f0254f35e6cfe56ee96481473c013b0238c7db-d?region=us" />
            // }
            onPlaying={handleDuration}
            loop
            config={{
              vimeo: {
                // @ts-ignore
                muted: true,
                playbackRate: 2,
              },
            }}
          />
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-center font-mono font-bold uppercase">
          {work.title}
        </h2>
        <p className="text-center font-mono text-[10px] tracking-wider uppercase opacity-60">
          {(work.metadata?.type as Category)?.name} - {work.metadata?.year}
        </p>
      </div>

      <CustomCursor className={cn("z-9 hidden group-hover:flex")} />
    </Link>
  );
}
