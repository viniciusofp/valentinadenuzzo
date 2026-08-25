"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { CustomRichText } from "./CustomRichText";
import { BlogInfo } from "@/payload-types";
import { Button } from "./ui/button";
import { ClipboardIcon } from "lucide-react";
import { useCopyToClipboard } from "usehooks-ts";
import React, { useEffect } from "react";
import { toast } from "sonner";

export type ContactDialogProps = { data: BlogInfo; children: React.ReactNode };

export default function ContactDialog({ data, children }: ContactDialogProps) {
  const [copiedText, copy] = useCopyToClipboard();

  useEffect(() => {
    if (copiedText) {
      toast(`${copiedText} foi copiado para a área de transferência.`);
    }
  }, [copiedText]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="font-mono text-xl font-bold uppercase">
            Informações de contato
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <p className="w-full">{data.email}</p>
            <div className="flex gap-2">
              <button
                className="flex cursor-pointer items-center gap-2 rounded-xs px-2 py-1 font-mono text-[10px] tracking-wider whitespace-nowrap uppercase duration-150 hover:bg-sky-900 [&_svg]:size-3"
                onClick={() => copy(data.email || "")}
              >
                Copiar email <ClipboardIcon />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="w-full">{data.phone}</p>
            <div className="flex gap-2">
              <button
                className="flex cursor-pointer items-center gap-2 rounded-xs px-2 py-1 font-mono text-[10px] tracking-wider whitespace-nowrap uppercase duration-150 hover:bg-sky-900 [&_svg]:size-3"
                onClick={() => copy(data.phone || "")}
              >
                Copiar telefone <ClipboardIcon />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="w-full">valentinadenuzzo.com.br</p>
            <div className="flex gap-2">
              <button
                className="flex cursor-pointer items-center gap-2 rounded-xs px-2 py-1 font-mono text-[10px] tracking-wider whitespace-nowrap uppercase duration-150 hover:bg-sky-900 [&_svg]:size-3"
                onClick={() => copy("https://www.valentinadenuzzo.com.br")}
              >
                Copiar site <ClipboardIcon />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
