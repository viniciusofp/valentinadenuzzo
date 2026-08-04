import { headers as getHeaders } from "next/headers";

import config from "@/payload.config";
import { getPayload } from "payload";

import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import Player from "@/components/Player";
import WorkItem from "@/components/WorkItem";

export type BlogPageProps = {
  searchParams: Promise<{ page: string; preview: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const blogInfo = await payload.findGlobal({ slug: "blogInfo" });
  const description = convertLexicalToPlaintext({
    data: blogInfo.description as any,
  });
  return {
    title: `${blogInfo.name}`,
    description: `${description}`,
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

  return (
    <>
      <Player videoUrl="https://vimeo.com/1140901163" />
      <div className="grid gap-4 gap-y-8 p-4 md:grid-cols-2">
        {docs.map((doc) => {
          return <WorkItem key={doc.id} work={doc} />;
        })}
      </div>
    </>
  );
}
