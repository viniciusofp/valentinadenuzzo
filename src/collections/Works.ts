import {
  BlocksFeature,
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import type { CollectionConfig } from "payload";
import slugify from "slugify";
import urlField from "./fields/url-field";

function trimRichTextContent(value: any) {
  if (
    value.root?.children?.length > 1 &&
    value.root?.children[value.root?.children?.length - 1] &&
    value.root?.children[value.root?.children?.length - 1].type ===
      "paragraph" &&
    value.root?.children[value.root?.children?.length - 1].children?.length ===
      0
  ) {
    var trimmedChildren = [...value.root?.children];
    trimmedChildren.pop();
    return trimRichTextContent({
      ...value,
      root: { ...value.root, children: trimmedChildren },
    });
  } else {
    return value;
  }
}

export const Works: CollectionConfig = {
  slug: "works",
  defaultPopulate: { slug: true },
  labels: { singular: "Work", plural: "Works" },
  trash: true,
  orderable: true,
  admin: {
    useAsTitle: "content",
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
      type: "textarea",
    },
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
          BlocksFeature({
            blocks: [
              {
                slug: "videoEmbed",
                labels: { singular: "Vídeo", plural: "Vídeos" },
                fields: [urlField],
              },
              {
                slug: "code",
                labels: {
                  singular: "Código (Embed)",
                  plural: "Códigos (Embed)",
                },
                fields: [{ name: "code", type: "code", label: "Código" }],
              },
              {
                slug: "imageGallery",
                labels: {
                  singular: "Galeria de Imagem",
                  plural: "Galerias de Imagem",
                },
                fields: [
                  {
                    name: "images",
                    type: "upload",
                    label: "Imagem",
                    relationTo: "media",
                    hasMany: true,
                  },
                ],
              },
            ],
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

    {
      name: "categories",
      type: "relationship",
      label: { single: "Categoria", plural: "Categorias" },
      relationTo: "categories",
      hasMany: true,
    },
  ],
};
