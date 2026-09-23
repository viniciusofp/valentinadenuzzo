import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

export const revalidatePage: CollectionAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  const path: string = doc.slug === "home" ? "/" : `/${doc.slug}`;
  payload.logger.info(`Relavidate Path at ${path}`);
  revalidatePath(path);
  return doc;
};

export const revalidateGlobal: GlobalAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  revalidatePath("/");
  revalidatePath("/still-photography");
  revalidatePath("/about");
};

export const revalidateDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
}) => {
  const path: string = doc.slug === "home" ? "/" : `/${doc.slug}`;
  payload.logger.info(`Relavidate (Delete) Path at ${path}`);
  revalidatePath(path);
  return doc;
};
