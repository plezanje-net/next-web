import { useCallback, useEffect } from "react";

export const useKeyDown = (callback: (key: string) => void, keys: string[]) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const wasAnyKeyPressed = keys.some((key) => event.key === key);
      if (wasAnyKeyPressed) {
        event.preventDefault();
        callback(event.key);
      }
    },
    [callback, keys]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};

export default useKeyDown;
