import { throttle } from ".";

export const downRefresh = (
  element: HTMLElement,
  callback: (...args: any[]) => Promise<any>,
  setLoading: (val: boolean) => void
) => {
  let startY = 0;
  let distance = 0;
  let originalTop = element.offsetTop;
  let startTop = 0;
  let $timer: any = null;
  element.addEventListener("touchstart", (event: TouchEvent) => {
    if ($timer) {
      return;
    }

    const back = () => {
      $timer = setInterval(() => {
        let currentTop = element.offsetTop;
        if (currentTop - originalTop > 10) {
          element.style.top = currentTop - 10 + "px";
        } else {
          element.style.top = originalTop + "px";
          clearTimeout($timer);
          $timer = null;
        }
      }, 13);
    };

    const touchEnd = (event: TouchEvent) => {
      element.removeEventListener("touchmove", touchMove);
      element.removeEventListener("touchend", touchEnd);
      if (distance > 30) {
        callback().then(() => {
          setLoading(false);
          back();
        });
      } else {
        setLoading(false);
        back();
      }
    };

    const touchMove = throttle((event: TouchEvent) => {
      let pageY = event.touches[0].pageY;
      if (pageY > startY) {
        distance = pageY - startY;
        element.style.top = startTop + distance + "px";
        if (element.offsetTop > 30) {
          setLoading(true);
        }
      } else if (element.offsetTop === originalTop) {
        element.removeEventListener("touchmove", touchMove);
        element.removeEventListener("touchend", touchEnd);
      }
    }, 30);

    if (element.scrollTop === 0) {
      startTop = element.offsetTop;
      startY = event.touches[0].pageY;
      element.addEventListener("touchmove", touchMove);
      element.addEventListener("touchend", touchEnd);
    }
  });
};
