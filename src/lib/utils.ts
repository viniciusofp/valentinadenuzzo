import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function trimRichTextContent(value: any) {
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
