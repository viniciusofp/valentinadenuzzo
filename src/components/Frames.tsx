"use client";

import { Media } from "@/payload-types";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export type FramesProps = { frames: Media[] };

export default function Frames(props: FramesProps) {
  return (
    <div className="my-6">
      {props.frames?.map((frame) => {
        return <Frame key={frame.id} frame={frame} />;
      })}
    </div>
  );
}
const Frame = ({ frame }: { frame: any }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.95, 1, 1, 0.95],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="my-[10vh] flex w-full items-center justify-center backdrop-blur-lg"
    >
      <img
        src={
          ((frame as Media).sizes?.full?.url as string) ||
          ((frame as Media).url as string)
        }
        alt={(frame as Media).alt}
        className=""
      />
    </motion.div>
  );
};
