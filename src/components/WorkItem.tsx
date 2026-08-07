"use client";

import { Media, Work } from "@/payload-types";
import { workAsyncStorage } from "next/dist/server/app-render/work-async-storage.external";
import Link from "next/link";
import { CustomCursor } from "./CustomCursor";
import { cn } from "@/lib/utils";

import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { PlayerEntry } from "react-player/players";

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
    <Link href={`/${work.slug}`} className="group **:duration-300">
      <div
        className="group relative mb-2 aspect-video w-full overflow-hidden"
        onMouseEnter={play}
        onMouseLeave={pause}
        onPointerDown={play}
        onPointerUp={pause}
        onTouchStart={play}
        onTouchEnd={pause}
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
        {/* <img
          src={thumb.sizes?.half?.url || thumb.url || ""}
          alt=""
          className="h-full w-full object-cover object-center group-hover:scale-105"
        /> */}
      </div>

      <h2 className="font-serif text-2xl tracking-wide sm:text-2xl md:text-xl lg:text-2xl">
        {work.title}
      </h2>

      <CustomCursor className={cn("hidden group-hover:flex")} />
    </Link>
  );
}
