import config from "@/payload.config";
import Link from "next/link";
import { getPayload } from "payload";
import ContactDialog from "./ContactDialog";

export type NavProps = {};

export default async function Nav(props: NavProps) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const home = await payload.findGlobal({ slug: "blogInfo" });
  return (
    <nav className="fixed top-2 left-2 z-99 max-[390px]:top-1 max-[390px]:left-1 sm:top-3 sm:left-3">
      <div className="rounded-sm bg-sky-950/30 px-3 py-1.5 backdrop-blur-sm hover:bg-stone-950 max-[390px]:px-2">
        <div className="flex items-center gap-2 max-[390px]:gap-1 sm:gap-3 md:gap-4">
          <div className="flex flex-col">
            <Link
              href="/"
              className="font-serif text-base tracking-wider uppercase sm:text-xl"
            >
              {home.name}{" "}
            </Link>
            {/* {home.description ? (
            <p className="font-serif text-sm leading-1 tracking-[0.24em] text-stone-300 uppercase">
              {home.description}
            </p>
          ) : null} */}
          </div>{" "}
          <div className="ml-2 hidden h-1 w-px bg-sky-200/20 sm:block"></div>
          <div className="ml-2 h-2 w-px bg-sky-200/20 sm:ml-0"></div>
          <div className="hidden h-1 w-px bg-sky-200/20 sm:block"></div>
          {/* <span className="font-serif text-sm leading-none tracking-wider text-stone-400 uppercase md:text-base">
          {home.description}
        </span> */}
          <div className="flex items-center gap-1 max-[390px]:gap-0">
            <Link
              href="/#filmes"
              className="rounded-xs px-2 py-2 font-mono text-[10px] tracking-widest uppercase duration-150 hover:bg-sky-900 max-[390px]:px-1.5 sm:px-3"
            >
              Vídeos
            </Link>

            <p className="rounded-xs px-2 py-2 font-mono text-[10px] tracking-widest uppercase duration-150 hover:bg-sky-900 max-[390px]:px-1.5 sm:px-3">
              Stills
            </p>
            <ContactDialog data={home}>
              <button className="cursor-pointer rounded-xs px-2 py-2 font-mono text-[10px] tracking-widest uppercase duration-150 hover:bg-sky-900 max-[390px]:px-1.5 sm:px-3">
                Contato
              </button>
            </ContactDialog>
          </div>
        </div>
      </div>
    </nav>
  );
}
