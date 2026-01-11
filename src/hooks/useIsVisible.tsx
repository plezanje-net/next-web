import { RefObject, useEffect, useState } from "react";

function useIsVisible(ref: RefObject<HTMLElement>, defaultValue = false) {
  const [isIntersecting, setIntersecting] = useState(defaultValue);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}

export default useIsVisible;
