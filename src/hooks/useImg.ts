/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

interface Options {
  loading?: string;
  error?: string;
  preload?: number;
}

const getScrollParent = (el: Element) => {
  let parent = el.parentNode;
  while (parent && parent !== document) {
    if (
      /(?:scroll)|(?:auto)/.test(
        getComputedStyle(parent as Element)["overflowY"]
      ) ||
      /(?:scroll)|(?:auto)/.test(
        getComputedStyle(parent as Element)["overflow"]
      )
    ) {
      return parent;
    }
    parent = parent.parentNode;
  }
  if (parent === document) {
    return window;
  }
};

const loadImageAsync = (
  src: string,
  resolve: () => void,
  reject: () => void
) => {
  const image = new Image();
  image.src = src;
  image.onload = resolve;
  image.onerror = reject;
};

class ReactiveListener {
  el: Element;
  src: string;
  options: Options;
  elRender: (listener: ReactiveListener, state: string) => void;
  state: {
    loaded: boolean;
  };
  constructor({
    el,
    src,
    options,
    elRender,
  }: {
    el: Element;
    src: string;
    options: Options;
    elRender: (listener: ReactiveListener, state: string) => void;
  }) {
    this.el = el;
    this.src = src;
    this.options = options;
    this.elRender = elRender;
    this.state = { loaded: false };
  }
  checkInView() {
    const { top } = this.el.getBoundingClientRect();
    return top < window.innerHeight * (this.options.preload || 1.3);
  }
  load() {
    this.elRender(this, "loading");
    loadImageAsync(
      this.src,
      () => {
        this.state.loaded = true;
        this.elRender(this, "finish");
      },
      () => {
        this.state.loaded = true;
        this.elRender(this, "error");
      }
    );
  }
}

class LazyClass {
  options: Options;
  bindHandler: boolean;
  listenerQueue: ReactiveListener[];
  constructor(options: Options) {
    this.options = options;
    this.bindHandler = false;
    this.listenerQueue = [];
  }
  handleLazyLoad() {
    this.listenerQueue.forEach((listener) => {
      if (!listener.state.loaded) {
        const catIn = listener.checkInView();
        catIn && listener.load();
      }
    });
  }
  add(el: Element, index: number) {
    if (
      this.listenerQueue[index] &&
      this.listenerQueue[index].src === el.getAttribute("data-src") &&
      el.getAttribute("data-src") === el.getAttribute("src")
    ) {
      return;
    }
    const scrollParent = getScrollParent(el);
    if (scrollParent && !this.bindHandler) {
      this.bindHandler = true;
      scrollParent.addEventListener("scroll", this.handleLazyLoad.bind(this));
    }
    const listener = new ReactiveListener({
      el,
      src: el.getAttribute("data-src") as string,
      options: this.options,
      elRender: this.elRender.bind(this),
    });
    this.listenerQueue[index] = listener;
    this.handleLazyLoad();
  }
  elRender(listener: ReactiveListener, state: string) {
    const el = listener.el;
    let src = "";
    switch (state) {
      case "loading":
        src = listener.options.loading || "";
        break;
      case "error":
        src = listener.options.error || "";
        break;
      default:
        src = listener.src;
        break;
    }
    el.setAttribute("src", src);
  }
}

export const useImg = (ele: string, options: Options, deps: any[] = []) => {
  const lazyRef = useRef<any>(null);
  useEffect(() => {
    const nodes = document.querySelectorAll(ele);
    if (!lazyRef.current) {
      lazyRef.current = new LazyClass(options);
    }
    nodes.forEach((item, index) => {
      lazyRef.current.add(item, index);
    });
  }, deps);
};
