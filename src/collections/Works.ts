import {
  BlocksFeature,
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import type { CollectionConfig, Field } from "payload";
import slugify from "slugify";
import urlField from "./fields/url-field";
import { trimRichTextContent } from "@/lib/utils";

export const Works: CollectionConfig = {
  slug: "works",
  defaultPopulate: { slug: true },
  labels: { singular: "Trabalho", plural: "Trabalhos" },
  trash: true,
  orderable: true,
  admin: {
    useAsTitle: "title",
    components: {
      edit: {
        beforeDocumentControls: [
          "@/components/payload/ui/BeforeControls#VisitContent",
        ],
      },
    },
    livePreview: {
      url: ({ data, collectionConfig, req }) =>
        `${req.protocol}//${req.host}/${data.slug}?preview=true`,
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 1000,
      },
    },
    maxPerDoc: 10,
  },

  fields: [
    {
      name: "title",
      label: "Título",
      type: "text",
      required: true,
    },

    {
      name: "slug",
      type: "text",
      admin: { position: "sidebar", style: { opacity: 0.5 } },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (value) {
              return value;
            }
            if (siblingData.title) {
              return slugify(siblingData.title, {
                lower: true,
                strict: true,
                locale: "pt-BR",
              });
            }
            if (siblingData.content) {
              const plaintext = convertLexicalToPlaintext({
                data: siblingData.content,
              });
              return slugify(plaintext.slice(0, 80), {
                lower: true,
                strict: true,
                locale: "pt-BR",
              });
            }
            return undefined;
          },
        ],
      },
      required: true,
      unique: true,
    },
    { ...urlField, name: "videoUrl", label: "Vimeo Vídeo URL" } as Field,
    {
      name: "content",
      label: "Conteúdo",
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
      name: "frames",
      type: "upload",
      label: "Frames",
      relationTo: "media",
      hasMany: true,
    },
    {
      name: "metadata",
      label: "Informações",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            { name: "year", label: "Ano", type: "number", admin: { step: 1 } },
            { name: "client", label: "Cliente", type: "text" },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "role",
              label: "Cargo Exercido",
              type: "text",
              defaultValue: "Direção de Fotografia",
              admin: {
                description:
                  "Ex.: direção de fotografia, assistência de direção, etc...",
              },
            },
            {
              name: "type",
              label: "Tipo de Produção",
              type: "text",
              admin: {
                description: "Ex.: curta-metragem, longa-metragem, etc...",
              },
            },
          ],
        },
      ],
    },
  ],
};
