import { useLayoutEffect, useRef } from "react";

// TODO: use this hook in route list page
// TODO: check flickering on crags when page loads and should display table view
function useResizeObserver<T extends HTMLElement>(
  callback: (target: T, entry: ResizeObserverEntry) => void
) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const element = ref?.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      callback(element, entries[0]);
    });

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [callback, ref]);

  return ref;
}

export default useResizeObserver;
