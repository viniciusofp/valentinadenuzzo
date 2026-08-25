import { headers as getHeaders } from "next/headers";

import config from "@/payload.config";
import { getPayload } from "payload";

import About from "@/components/About";
import WorkItem from "@/components/WorkItem";
import { Media } from "@/payload-types";
import { Metadata } from "next";
import ReactPlayer from "react-player";
import WorkFilteredList from "@/components/WorkFilteredList";

export type BlogPageProps = {
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
export default async function BlogPage({ searchParams }: BlogPageProps) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  const { page, preview } = await searchParams;
  const { docs, totalPages, nextPage, prevPage } = await payload.find({
    collection: "works",
    limit: 100,
    where: {
      or: [
        {
          _status: { equals: user && Boolean(preview) ? "draft" : "published" },
        },
        {
          _status: {
            equals: user && Boolean(preview) ? "published" : "published",
          },
        },
      ],
    },
    pagination: false,
    depth: 2,
    draft: user && Boolean(preview) ? true : false,
  });
  const { docs: categories } = await payload.find({
    collection: "categories",
    limit: 100,
  });

  const home = await payload.findGlobal({ slug: "blogInfo" });

  return (
    <>
      <div className="relative aspect-video max-h-[60svh] w-full mix-blend-darken">
        <div className="absolute bottom-0 left-0 z-2 h-40 max-h-[40svh] w-full bg-linear-to-t from-white to-transparent"></div>
        <ReactPlayer
          src={(home.reel as Media).url || ""}
          // src="https://vimeo.com/1104598642"
          autoPlay
          className="h-full w-full object-cover"
          width={"100%"}
          height={"100%"}
          playsInline
          pip={false}
          muted
          // light={
          //   <img src="https://i.vimeocdn.com/video/1515732489-eab3fe43638be9b0e1214bb9a3f0254f35e6cfe56ee96481473c013b0238c7db-d?region=us" />
          // }
          loop
        />
      </div>
      {/* <About /> */}
      <WorkFilteredList works={docs} categories={categories} />
    </>
  );
}
