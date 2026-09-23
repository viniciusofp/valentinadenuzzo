import { revalidateGlobal } from "@/lib/revalidatePage";
import type { GlobalConfig } from "payload";

export const StillPhotography: GlobalConfig = {
  slug: "stillPhotography",
  label: "Still Photography",
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    {
      name: "stills",
      type: "upload",
      label: "Stills",
      relationTo: "media",
      hasMany: true,
    },
  ],
};
