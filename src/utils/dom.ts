export const moveScrollToTop = (_timer?: number): number => {
  _timer && cancelAnimationFrame(_timer);
  let timer = requestAnimationFrame(function fn() {
    const top = document.documentElement.scrollTop;
    if (top > 0) {
      document.documentElement.scrollTop = top - 60;
      timer = requestAnimationFrame(fn);
    } else {
      cancelAnimationFrame(timer);
    }
  });
  return timer;
};

export const getOffsetTop = (el: HTMLElement): number => {
  let offsetTop = 0, _el: HTMLElement | null = el;
  while (_el) {
    offsetTop += el.offsetTop;
    _el = el.offsetParent as HTMLElement;
  }
  return offsetTop;
};

export const throttle = <T extends (...args: any) => void>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timer: number | null = null;
  // eslint-disable-next-line func-names
  return function (this: any, ...args: Parameters<T>) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
};
