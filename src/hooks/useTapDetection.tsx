import { TouchEvent, useState } from "react";

function useTapDetection(action: () => void) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );

  const handleTouchStart = ({ touches }: TouchEvent<HTMLImageElement>) => {
    const touch = touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = ({ changedTouches }: TouchEvent<HTMLImageElement>) => {
    const touch = changedTouches[0];
    if (
      touchStart &&
      Math.abs(touch.clientX - touchStart.x) < 10 &&
      Math.abs(touch.clientY - touchStart.y) < 10
    ) {
      action();
    }
    setTouchStart(null);
  };

  return { handleTouchStart, handleTouchEnd };
}

export default useTapDetection;
