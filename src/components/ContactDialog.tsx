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
import { useEffect } from "react";
import { toast } from "sonner";

export type ContactDialogProps = { data: BlogInfo };

export default function ContactDialog({ data }: ContactDialogProps) {
  const [copiedText, copy] = useCopyToClipboard();

  useEffect(() => {
    if (copiedText) {
      toast(`${copiedText} foi copiado para a área de transferência.`);
    }
  }, [copiedText]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer text-[10px] tracking-widest uppercase max-[430px]:tracking-wide sm:text-xs">
          Contato
        </button>
      </DialogTrigger>
      <DialogContent className="sm">
        <DialogHeader>
          <DialogTitle className="text-base font-bold">
            Informações de contato
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <p className="w-full">{data.email}</p>
            <div className="flex gap-2">
              <Button
                size="xs"
                variant={"secondary"}
                onClick={() => copy(data.email || "")}
              >
                Copiar email <ClipboardIcon />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="w-full">{data.phone}</p>
            <div className="flex gap-2">
              <Button
                size="xs"
                variant={"secondary"}
                onClick={() => copy(data.phone || "")}
              >
                Copiar telefone <ClipboardIcon />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="w-full">https://www.valentinadenuzzo.com.br</p>
            <div className="flex gap-2">
              <Button
                size="xs"
                variant={"secondary"}
                onClick={() => copy("https://www.valentinadenuzzo.com.br")}
              >
                Copiar site <ClipboardIcon />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
