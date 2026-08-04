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

export type ContactDialogProps = { contactInfo: SerializedEditorState };

export default function ContactDialog({ contactInfo }: ContactDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer text-[10px] tracking-widest uppercase max-[430px]:tracking-wide sm:text-xs">
          Contato
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações de contato</DialogTitle>
          <DialogDescription asChild>
            <CustomRichText data={contactInfo} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
