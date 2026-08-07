import config from "@/payload.config";
import { getPayload } from "payload";
import { CustomRichText } from "./CustomRichText";
import ContactDialog from "./ContactDialog";
export type AboutProps = {};

export default async function About(props: AboutProps) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const info = await payload.findGlobal({ slug: "blogInfo" });
  return (
    <div className="px-4">
      <div className="mx-auto my-12 flex w-fit flex-col items-center gap-8 text-center">
        <div className="flex gap-4">
          <div className="size-1 rounded-full bg-cyan-500/30"></div>
          <div className="size-1 rounded-full bg-cyan-500/30"></div>
          <div className="size-1 rounded-full bg-cyan-500/30"></div>
        </div>
        <p className="font-serif text-base tracking-widest uppercase max-[430px]:tracking-wide lg:text-lg">
          {info.name}{" "}
          <span className="hidden text-stone-400 min-[380px]:inline">
            | {info.description}
          </span>
        </p>
        <div className="max-w-prose font-serif text-xl text-stone-300 md:text-2xl xl:text-3xl">
          <CustomRichText data={info.about} />
        </div>

        <ContactDialog data={info}>
          <button className="cursor-pointer rounded-xs px-2 py-2 font-mono text-sm tracking-widest uppercase underline decoration-sky-400 decoration-2 underline-offset-8 duration-150 hover:bg-sky-900 hover:decoration-sky-900 hover:decoration-0 hover:underline-offset-12 max-[390px]:px-1.5 sm:px-3 md:text-base">
            Contato
          </button>
        </ContactDialog>
        <div className="flex gap-4">
          <div className="size-1 rounded-full bg-cyan-500/30"></div>
          <div className="size-1 rounded-full bg-cyan-500/30"></div>
          <div className="size-1 rounded-full bg-cyan-500/30"></div>
        </div>
      </div>
    </div>
  );
}
