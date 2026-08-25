import config from "@/payload.config";
import Link from "next/link";
import { getPayload } from "payload";
import ContactDialog from "./ContactDialog";
import { MenuIcon } from "lucide-react";

export type NavProps = {};

export default async function Nav(props: NavProps) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const home = await payload.findGlobal({ slug: "blogInfo" });
  return (
    <>
      <nav className="fixed top-2 left-2 z-50 w-[calc(100svw-2rem)] max-[390px]:top-1 max-[390px]:left-1 sm:top-3 sm:left-3 sm:w-auto">
        <div className="mx-auto rounded-sm px-3 py-0.5 hover:bg-white/60 hover:backdrop-blur-sm max-[390px]:px-2">
          <div className="flex items-center justify-between gap-2 max-[390px]:gap-1 sm:justify-start sm:gap-3 md:gap-4">
            <div className="flex flex-col">
              <Link
                href="/"
                className="font-serif text-xl font-medium tracking-wider uppercase md:text-2xl"
              >
                {home.name}{" "}
              </Link>
              {/* {home.description ? (
            <p className="font-serif text-sm leading-1 tracking-[0.24em] text-stone-300 uppercase">
              {home.description}
            </p>
          ) : null} */}
            </div>
            <div className="h-2 w-px bg-sky-200/20"></div>
            {/* <span className="font-serif text-sm leading-none tracking-wider text-stone-400 uppercase md:text-base">
          {home.description}
        </span> */}
            <div className="sm:hidden">
              <MenuIcon className="size-6" />
            </div>
            <div className="hidden items-center gap-1 max-[390px]:gap-0 sm:flex">
              <Link
                href="/#filmes"
                className="rounded-xs px-2 py-2 font-mono text-[10px] tracking-widest uppercase duration-150 hover:bg-sky-900 max-[390px]:px-1.5 sm:px-3"
              >
                Films
              </Link>

              <p className="rounded-xs px-2 py-2 font-mono text-[10px] tracking-widest uppercase duration-150 hover:bg-sky-900 max-[390px]:px-1.5 sm:px-3">
                Still Photograpy
              </p>
              <p className="rounded-xs px-2 py-2 font-mono text-[10px] tracking-widest uppercase duration-150 hover:bg-sky-900 max-[390px]:px-1.5 sm:px-3">
                About
              </p>
              <ContactDialog data={home}>
                <button className="cursor-pointer rounded-xs px-2 py-2 font-mono text-[10px] tracking-widest uppercase duration-150 hover:bg-sky-900 max-[390px]:px-1.5 sm:px-3">
                  Contact
                </button>
              </ContactDialog>
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-background flex h-12 w-full items-end px-4 py-2 font-serif text-base tracking-widest text-stone-400 uppercase max-[390px]:h-11 sm:h-15">
        {/* {home.description} */}
      </div>
    </>
  );
}
