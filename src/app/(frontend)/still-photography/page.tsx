import { headers as getHeaders } from "next/headers";

import config from "@/payload.config";
import { getPayload } from "payload";

import About from "@/components/About";
import WorkItem from "@/components/WorkItem";
import { Media } from "@/payload-types";
import { Metadata } from "next";
import ReactPlayer from "react-player";
import WorkFilteredList from "@/components/WorkFilteredList";
import { redirect } from "next/navigation";
import Image from "next/image";
export type StillPhotographyPageProps = {
  searchParams: Promise<{ page: string; preview: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const blogInfo = await payload.findGlobal({ slug: "blogInfo" });

  return {
    title: `${blogInfo.name} - ${blogInfo.description}`,
    description: `${blogInfo.description}`,
  };
}
export default async function StillPhotographyPage({
  searchParams,
}: StillPhotographyPageProps) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const stillPhotography = await payload.findGlobal({
    slug: "stillPhotography",
  });
  if (!stillPhotography?.stills?.length) redirect("/");
  return (
    <section>
      {stillPhotography.stills.map((s) => {
        const still = s as Media;
        return (
          <div
            key={still.id}
            className="relative max-h-svh max-w-svw overflow-hidden"
          >
            <Image
              lazyBoundary=""
              src={still.url || ""}
              width={1920}
              height={1080}
              alt={still.alt}
              className="h-full w-full object-contain object-center"
            />
          </div>
        );
      })}
    </section>
  );
}
