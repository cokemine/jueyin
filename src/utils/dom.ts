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
