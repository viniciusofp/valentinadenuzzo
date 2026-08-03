import { getPayload } from "payload";

import PreviewAlert from "@/components/PreviewAlert";
import { RefreshRouteOnSave } from "@/components/RefreshRouteOnSave";
import config from "@/payload.config";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import { Metadata, ResolvingMetadata } from "next";
import { headers as getHeaders } from "next/headers";
import Link from "next/link";

export type BlogPostProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview: string }>;
};

export async function generateMetadata(
  { params, searchParams }: BlogPostProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const { preview } = await searchParams;
  const blogInfo = await payload.findGlobal({ slug: "blogInfo" });
  const slug = (await params).slug;

  // fetch work information
  const { docs: works } = await payload.find({
    collection: "works",
    where: { slug: { equals: slug } },
  });
  const work = works[0];
  if (work) {
    const createdAt = new Date(work.createdAt);
    const plaintext = convertLexicalToPlaintext({
      data: work.content as SerializedEditorState,
    }).replaceAll("&nbsp;", " ");

    return {
      title: `${preview ? "PREVIEW: " : ""}${
        work.title
          ? `${work.title} - ${blogInfo.name}`
          : `${createdAt.toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })} - ${createdAt.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })} - ${blogInfo.name}`
      }`,
      description:
        plaintext.length > 160 ? `${plaintext.slice(0, 154)} (...)` : plaintext,
    };
  }
  return {};
}
export default async function BlogPost({
  params,
  searchParams,
}: BlogPostProps) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { slug } = await params;

  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });
  const { preview } = await searchParams;

  const { docs } = await payload.find({
    collection: "works",
    where: {
      slug: { equals: slug },
      _status: { equals: user && Boolean(preview) ? "draft" : "published" },
    },
    depth: 1,
    draft: user && Boolean(preview) ? true : false,
  });
  const work = docs[0];

  if (!work)
    return (
      <div className="my-8">
        <p>
          Publicação não encontrada.
          <br />
          <Link href="/" className="font-medium hover:underline">
            Voltar pra casa.
          </Link>
        </p>
      </div>
    );

  const createdAt = new Date(work.createdAt);
  const updatedAt = new Date(work.updatedAt);
  return (
    <>
      <RefreshRouteOnSave />
      {preview ? <PreviewAlert /> : null}
      {work.title}
    </>
  );
}
