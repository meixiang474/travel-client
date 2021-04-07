import { throttle } from ".";

export const downRefresh = (
  element: HTMLElement,
  callback: (...args: any[]) => Promise<any>,
  setLoading: (val: boolean) => void,
  step = 10
) => {
  let startX = 0;
  let startY = 0;
  let distance = 0;
  let originalTop = element.offsetTop;
  let startTop = 0;
  let $timer: any = null;
  const fn = (event: TouchEvent) => {
    if ($timer) {
      return;
    }

    const back = () => {
      $timer = setInterval(() => {
        let currentTop = element.offsetTop;
        if (currentTop - originalTop > 10) {
          element.style.top = currentTop - step + "px";
        } else {
          element.style.top = originalTop + "px";
          distance = 0;
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
      let pageX = event.touches[0].pageX;
      let pageY = event.touches[0].pageY;
      if (pageY > startY) {
        if (Math.abs(pageX - startX) > Math.abs(pageY - startY)) {
          return;
        }
        if (pageY - startY > 100) {
          return;
        }
        distance = pageY - startY;
        element.style.top = startTop + distance + "px";
        if (distance > 30) {
          setLoading(true);
        } else {
          setLoading(false);
        }
      } else if (element.offsetTop === originalTop) {
        element.removeEventListener("touchmove", touchMove);
        element.removeEventListener("touchend", touchEnd);
      }
    }, 30);

    if (element.scrollTop === 0) {
      startTop = originalTop;
      startX = event.touches[0].pageX;
      startY = event.touches[0].pageY;
      element.addEventListener("touchmove", touchMove);
      element.addEventListener("touchend", touchEnd);
    }
  };
  element.addEventListener("touchstart", fn);
  return fn;
};
