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
    loadMore(element, callback);
    return () => {
      element.removeEventListener("scroll", callback);
    };
  });
};
