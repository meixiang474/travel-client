/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject } from "react";
import { storage } from "@/utils";
import { useMount } from "./useMount";

export const useScrollTop = (
  key: string,
  scrollRef: RefObject<HTMLElement>
) => {
  useMount(() => {
    const element = scrollRef.current as HTMLElement;
    const callback = () => {
      storage.set(key, element.scrollTop);
    };
    element.addEventListener("scroll", callback);
    return () => {
      element.removeEventListener("scroll", callback);
    };
  });
};
