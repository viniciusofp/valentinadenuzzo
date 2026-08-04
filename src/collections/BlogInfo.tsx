import { trimRichTextContent } from "@/lib/utils";
import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { GlobalConfig } from "payload";

export const BlogInfo: GlobalConfig = {
  slug: "blogInfo",
  label: "Informações Gerais",
  fields: [
    {
      name: "name",
      label: "Título do blog",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Descrição",
      type: "textarea",
      required: true,
    },
    {
      name: "about",
      label: "Bio",
      type: "richText",
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature({
            applyToFocusedEditor: false, // Apply to focused editor
            customGroups: {
              format: {
                // Custom configuration for format group
              },
            },
          }),
        ],
      }),
      hooks: {
        beforeValidate: [
          ({ value }) => {
            return value ? trimRichTextContent(value) : undefined;
          },
        ],
      },
    },
    {
      name: "reel",
      label: "Reel",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    { name: "email", type: "email", label: "E-mail" },
    { name: "phone", type: "text", label: "Telefone" },
  ],
};
