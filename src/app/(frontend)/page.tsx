import { headers as getHeaders } from "next/headers";

import config from "@/payload.config";
import { getPayload } from "payload";

import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import Player from "@/components/Player";

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
    limit: 12,
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
    page: page ? parseInt(page) : 1,
    pagination: true,
    sort: "-createdAt",
    depth: 2,
    draft: user && Boolean(preview) ? true : false,
  });

  return (
    <>
      <Player />
      <h1 className="my-9 text-[clamp(1.5rem,2.5vw,2rem)] font-medium text-balance">
        Google Consciência de Origem
      </h1>
      <p className="max-w-prose text-sm leading-loose font-light">
        Produtora: @santatransmedia <br />
        Direção: @diogocomum <br />
        Produção executiva: @remunaretto <br />
        Coordenação de produção: @gabilandia @jonasdematos
        <br />
        Atendimento: @rochlaura <br />
        Assistente de direção: atribecalledmay <br />
        Direção de Fotografia: @maria.navarrogs <br />
        Segunda unidade de direção de fotografia : @valentinadenuzzo <br />
        Câmera steadycam: @gusmorozini <br />
        Direção de Arte: @igormariwaki <br />
        Produção: @arabimesquita <br />
        Assistente de Produção: Analu Nascimento <br />
        Atriz: @samiracarvalho <br />
        Figurino: @fefestylist <br />
        Assistente de Figurino: @ngulusian <br />
        Som Direto: Marina Bruno <br />
        Assistente de Som Direto: Marina de Lourdes <br />
        Pós-produção: @liquor.media <br />
        Coordenador de pós: @ale_ngd <br />
        Edição: Ariel Serrão <br />
        Color Grading: @efetolotti <br />
        Produtora de áudio: Fita Trilha e <br />
        Produção de áudio: @thiagogauterio
      </p>
      <div className="flex flex-col divide-y divide-stone-100">
        {docs.map((doc) => {
          return <div key={doc.id}>{doc.title}</div>;
        })}
      </div>
      <div className="footer my-8 grid grid-cols-3 items-center text-sm tracking-wide">
        <div>
          {prevPage ? (
            <Link
              href={`/?page=${prevPage}`}
              className="flex items-center justify-start gap-1 text-red-600 opacity-80 duration-200 hover:opacity-100"
            >
              <ArrowLeft className="size-4" />
              Mais novos
            </Link>
          ) : null}
        </div>
        <div className="flex items-center justify-center text-stone-400 uppercase">
          {page ? page : 1}/{totalPages}
        </div>
        <div>
          {nextPage ? (
            <Link
              href={`/?page=${nextPage}`}
              className="flex items-center justify-end gap-1 text-red-600 opacity-80 duration-200 hover:opacity-100"
            >
              Mais antigos <ArrowRight className="size-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
}
