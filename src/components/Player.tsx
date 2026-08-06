"use client";

import { useRef } from "react";
import ReactPlayer from "react-player";

export type PlayerProps = { videoUrl: string };

export default function Player({ videoUrl }: PlayerProps) {
  const playerRef = useRef(null);
  return (
    <ReactPlayer
      ref={playerRef}
      src={videoUrl}
      autoPlay
      muted={true}
      className="h-full w-full object-cover"
      width={"100%"}
      height={"100%"}
      controls
      // light={
      //   <img src="https://i.vimeocdn.com/video/1515732489-eab3fe43638be9b0e1214bb9a3f0254f35e6cfe56ee96481473c013b0238c7db-d?region=us" />
      // }
      loop
      config={{
        vimeo: {
          // @ts-ignore
          muted: true,
        },
      }}
    />
  );
}
