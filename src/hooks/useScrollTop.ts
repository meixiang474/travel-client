import { useMount } from "./useMount";
import { RefObject } from "react";
import { storage } from "@/utils";

export const useScrollTop = (
  key: string,
  scrollRef: RefObject<HTMLElement>
) => {
  useMount(() => {
    const element = scrollRef.current as HTMLElement;
    element.addEventListener("scroll", () => {
      storage.set(key, element.scrollTop);
    });
  });
};
