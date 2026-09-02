import { headers as getHeaders } from "next/headers";

import config from "@/payload.config";
import { getPayload } from "payload";

import { Metadata } from "next";
import { CustomRichText } from "@/components/CustomRichText";

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

  const home = await payload.findGlobal({ slug: "blogInfo" });

  return (
    <section className="flex min-h-[calc(100svh-160px)] items-center justify-center p-4 lg:p-6 xl:p-8 2xl:p-10">
      <CustomRichText data={home.about} className="prose mx-auto mb-12" />
    </section>
  );
}
