import IconClose from "@/components/ui/icons/close";
import IconLeft from "@/components/ui/icons/left";
import IconRight from "@/components/ui/icons/right";
import { Image } from "@/graphql/generated";
import { ReactNode, useCallback, useState } from "react";
import ImageSlide from "./image-list-slide";
import {
  DndContext,
  DragEndEvent,
  Modifier,
  useDraggable,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import useKeyDown from "@/hooks/useKeyDown";
import Button from "@/components/ui/button";

type TImageListLightboxParams = {
  images: Image[];
  baseUrl: string;
  id: string;
  onClose: () => void;
};

function Draggable({
  children,
  className,
  transformX,
  disabled,
}: {
  children: ReactNode;
  className: string;
  transformX: number;
  disabled: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
    disabled,
  });
  const transformValue = transform ? `${transform.x}px` : `${transformX}%`;
  const style = {
    transform: `translate3d(${transformValue}, 0, 0)`,
  };

  return (
    <div
      className={className}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}

function ImageListSlider({
  images,
  baseUrl,
  id,
  onClose,
}: TImageListLightboxParams) {
  const [index, setIndex] = useState<number>(
    images.findIndex((image) => image.id === id)
  );
  const [transformX, setTransformX] = useState<number>(0);
  const [transitionActive, setTransitionActive] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  function handlePrevious() {
    if (transitionActive) {
      return;
    }
    setTransformX(100);
    setTransitionActive(true);
    setTimeout(() => handleTransitionEnd(-1), 500);
  }

  function handleNext() {
    if (transitionActive) {
      return;
    }
    setTransformX(-100);
    setTransitionActive(true);
    setTimeout(() => handleTransitionEnd(1), 500);
  }

  function handleTransitionEnd(direction: number) {
    setTransitionActive(false);
    setTransformX(0);
    const newIndex = (index + direction + images.length) % images.length;
    setIndex(newIndex);
  }

  function handleDragEnd(event: DragEndEvent) {
    if (event.delta.x < -30) {
      handleNext();
    }
    if (event.delta.x > 30) {
      handlePrevious();
    }
  }

  function applyPositionClass(key: number) {
    if (key === index) return "left-0";
    if (key === (index - 1) % images.length) return "-left-full";
    if (key === (index + 1) % images.length) return "left-full";
    return "top-full";
  }

  useKeyDown(
    (key) => {
      if (key === "Escape") isFullScreen ? setIsFullScreen(false) : onClose();
      if (key === "ArrowLeft") handlePrevious();
      if (key === "ArrowRight") handleNext();
    },
    ["ArrowLeft", "ArrowRight", "Escape"]
  );

  const restrictToSlideEdges = useCallback<Modifier>(
    ({ transform }) => {
      let { x } = transform;

      if (index == 0 && x > 0) {
        x = 0;
      }
      if (index == images.length - 1 && x < 0) {
        x = 0;
      }

      return {
        ...transform,
        x,
      };
    },
    [index, images.length]
  );

  return (
    <div className="fixed left-0 top-0 flex h-full w-full flex-col bg-white">
      {!isFullScreen && (
        <div className="flex h-12 items-center justify-end p-4">
          <button onClick={onClose}>
            <IconClose />
          </button>
        </div>
      )}
      <div className="flex flex-1 items-center justify-center">
        {!isFullScreen && (
          <div className="flex w-14 justify-center">
            <Button
              onClick={handlePrevious}
              variant="quaternary"
              disabled={index == 0}
            >
              <IconLeft />
            </Button>
          </div>
        )}
        <div className="h-full w-full flex-1 overflow-hidden">
          <DndContext
            modifiers={[restrictToHorizontalAxis, restrictToSlideEdges]}
            onDragEnd={handleDragEnd}
          >
            <Draggable
              className={`relative h-full w-full flex-1 cursor-default outline-none ${
                transitionActive
                  ? "transition-transform duration-500 ease-in-out"
                  : ""
              }`}
              transformX={transformX}
              disabled={transitionActive}
            >
              {images.map((image, key) => (
                <ImageSlide
                  key={key}
                  baseUrl={baseUrl}
                  image={image}
                  positionClass={applyPositionClass(key)}
                  isFullScreen={isFullScreen}
                  toggleFullScreen={() => setIsFullScreen(!isFullScreen)}
                />
              ))}
            </Draggable>
          </DndContext>
        </div>
        {!isFullScreen && (
          <div className="flex w-12 justify-center">
            <Button
              onClick={handleNext}
              variant="quaternary"
              disabled={index == images.length - 1}
            >
              <IconRight />
            </Button>
          </div>
        )}
      </div>
      <div className="h-12"></div>
    </div>
  );
}

export default ImageListSlider;
