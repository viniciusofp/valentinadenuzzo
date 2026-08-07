import { headers as getHeaders } from "next/headers";

import config from "@/payload.config";
import { getPayload } from "payload";

import About from "@/components/About";
import WorkItem from "@/components/WorkItem";
import { Media } from "@/payload-types";
import { Metadata } from "next";
import ReactPlayer from "react-player";

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

  const home = await payload.findGlobal({ slug: "blogInfo" });

  return (
    <>
      <div className="relative aspect-video max-h-svh min-h-72 w-full">
        <ReactPlayer
          src={(home.reel as Media).url || ""}
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
      <About />
      <div id="filmes" className="grid gap-4 gap-y-8 p-4 md:grid-cols-2">
        {docs.map((doc) => {
          return <WorkItem key={doc.id} work={doc} />;
        })}
      </div>
    </>
  );
}
