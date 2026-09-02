import type { GlobalConfig } from "payload";

export const StillPhotography: GlobalConfig = {
  slug: "stillPhotography",
  label: "Still Photography",
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
