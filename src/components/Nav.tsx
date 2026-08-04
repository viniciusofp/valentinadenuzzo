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
    <nav className="fixed top-0 z-99 flex h-14 w-full items-center justify-between gap-4 bg-stone-950 px-4 lg:px-16">
      <Link
        href="/"
        className="font-serif text-sm tracking-widest uppercase max-[430px]:tracking-wide md:text-base"
      >
        {home.name}{" "}
        <span className="hidden text-stone-400 min-[380px]:inline">
          | {home.description}
        </span>
      </Link>
      <ContactDialog contactInfo={home.contact} />
    </nav>
  );
}
