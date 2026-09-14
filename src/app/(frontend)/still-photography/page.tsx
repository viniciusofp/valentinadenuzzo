import config from "@/payload.config";
import { getPayload } from "payload";

import { Media } from "@/payload-types";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
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
