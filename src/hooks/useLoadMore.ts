import { RefObject } from "react";
import { loadMore } from "@/utils/loadMore";
import { useMount } from ".";

export const useLoadMore = (
  elementRef: RefObject<HTMLElement>,
  callback: (...args: any[]) => any
) => {
  useMount(() => {
    loadMore(elementRef.current as HTMLElement, callback);
  });
};
