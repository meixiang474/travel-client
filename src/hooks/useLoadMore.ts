/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject } from "react";
import { loadMore } from "@/utils/loadMore";
import { useMount } from "./useMount";

export const useLoadMore = (
  elementRef: RefObject<HTMLElement>,
  callback: (...args: any[]) => any
) => {
  useMount(() => {
    const element = elementRef.current as HTMLElement;
    if (element) {
      loadMore(element, callback);
    }
    return () => {
      if (element) {
        element.removeEventListener("scroll", callback);
      }
    };
  });
};
