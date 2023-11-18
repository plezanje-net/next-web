import IconClose from "@/components/ui/icons/close";
import IconLeft from "@/components/ui/icons/left";
import IconRight from "@/components/ui/icons/right";
import { Image } from "@/graphql/generated";
import { ReactNode, useState } from "react";
import ImageSlide from "./image-list-slide";
import { DndContext, DragEndEvent, useDraggable } from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import IconPhoto from "@/components/ui/icons/photo";
import useKeyDown from "@/hooks/useKeyDown";

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

  const [currentImage, setCurrentImage] = useState<Image>(images[index]);
  const [prevImage, setPrevImage] = useState<Image>(
    images[(index + images.length - 1) % images.length]
  );
  const [nextImage, setNextImage] = useState<Image>(
    images[(index + 1) % images.length]
  );

  const [transformX, setTransformX] = useState<number>(0);
  const [transitionActive, setTransitionActive] = useState<boolean>(false);

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
    setCurrentImage(images[newIndex]);
    setPrevImage(images[(newIndex + images.length - 1) % images.length]);
    setNextImage(images[(newIndex + 1) % images.length]);
  }

  function handleDragEnd(event: DragEndEvent) {
    if (event.delta.x < -30) {
      handleNext();
    }
    if (event.delta.x > 30) {
      handlePrevious();
    }
  }

  useKeyDown(
    (key) => {
      if (key === "Escape") onClose();
      if (key === "ArrowLeft") handlePrevious();
      if (key === "ArrowRight") handleNext();
    },
    ["ArrowLeft", "ArrowRight", "Escape"]
  );

  return (
    <div className="fixed left-0 top-0 flex h-full w-full flex-col bg-white">
      <div className="flex h-16 items-center justify-end p-4">
        <button onClick={onClose}>
          <IconClose />
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="p-4" onClick={handlePrevious}>
          <IconLeft />
        </div>
        <div className="h-full w-full flex-1 overflow-hidden">
          <DndContext
            modifiers={[restrictToHorizontalAxis]}
            onDragEnd={handleDragEnd}
          >
            <Draggable
              className={`relative h-full w-full flex-1 ${
                transitionActive
                  ? "transition-transform duration-500 ease-in-out"
                  : ""
              }`}
              transformX={transformX}
              disabled={transitionActive}
            >
              <ImageSlide
                baseUrl={baseUrl}
                image={prevImage}
                positionClass="-left-full"
              />
              <ImageSlide
                baseUrl={baseUrl}
                image={currentImage}
                positionClass="left-0"
              />
              <ImageSlide
                baseUrl={baseUrl}
                image={nextImage}
                positionClass="left-full"
              />
            </Draggable>
          </DndContext>
        </div>
        <div className="p-4" onClick={handleNext}>
          <IconRight />
        </div>
      </div>
      <div className="h-16"></div>
    </div>
  );
}

export default ImageListSlider;
