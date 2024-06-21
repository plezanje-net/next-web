import { IconSize } from "@/components/ui/icons/icon-size";
import IconPhoto from "@/components/ui/icons/photo";
import { Image } from "@/graphql/generated";
import useTapDetection from "@/hooks/useTapDetection";
import NextImage from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type TImageSlideParams = {
  image: Image;
  positionClass: string;
  baseUrl: string;
  isFullScreen: boolean;
  toggleFullScreen: () => void;
};

type TImageDimensions = {
  width: number;
  height: number;
};

function getImageDimensionsAccordingToContainer(
  image: TImageDimensions,
  container: TImageDimensions
): TImageDimensions {
  const imageRatio = image.width / image.height;
  const containerRatio = container.width / container.height;

  if (image.width <= container.width && image.height <= container.height) {
    return {
      width: image.width,
      height: image.height,
    };
  }

  if (imageRatio > containerRatio) {
    return {
      width: container.width,
      height: container.width / imageRatio,
    };
  } else {
    return {
      width: container.height * imageRatio,
      height: container.height,
    };
  }
}

function calculateImageDimensions(
  image: Image,
  container: HTMLDivElement,
  captionHeight: number
) {
  const imageDimensions = {
    width: image.maxIntrinsicWidth,
    height: image.maxIntrinsicWidth / image.aspectRatio,
  };
  const containerDimensions = {
    width: container.clientWidth,
    height: container.clientHeight - captionHeight,
  };
  return getImageDimensionsAccordingToContainer(
    imageDimensions,
    containerDimensions
  );
}

function ImageSlide({
  image,
  positionClass,
  baseUrl,
  toggleFullScreen,
  isFullScreen,
}: TImageSlideParams) {
  const { title, author } = image;
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const [captionWidth, setCaptionWidth] = useState<number | null>(null);
  const [imageDimensions, setImageDimensions] = useState<TImageDimensions>({
    width: 0,
    height: 0,
  });

  const recalculateAll = useCallback(
    (
      image: Image,
      container: HTMLDivElement,
      captionRef: HTMLDivElement | null
    ) => {
      const newImageDimensions = calculateImageDimensions(
        image,
        container,
        captionRef?.clientHeight ?? 0
      );
      setImageDimensions(newImageDimensions);
      setCaptionWidth(newImageDimensions.width);
    },
    []
  );

  useEffect(() => {
    recalculateAll(image, containerRef.current!, captionRef.current);

    const resizeObserver = new ResizeObserver(([{ target }]) =>
      recalculateAll(image, containerRef.current!, captionRef.current)
    );
    resizeObserver.observe(containerRef.current!);
    return () => resizeObserver.disconnect();
  }, [image, recalculateAll, isFullScreen]);

  const { handleTouchStart, handleTouchEnd } =
    useTapDetection(toggleFullScreen);

  return (
    <div
      ref={containerRef}
      className={`absolute flex h-full w-full flex-col items-center justify-center ${positionClass}`}
    >
      <div className={`overflow-hidden`}>
        <NextImage
          ref={imageRef}
          src={`${baseUrl}/${image.path}.${image.extension}`}
          width={imageDimensions.width}
          height={imageDimensions.height}
          alt={`${image.title}`}
          quality={100}
          priority
          className={`mx-auto select-none ${!isFullScreen && "rounded-lg"}`}
          onDoubleClick={toggleFullScreen}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />
      </div>
      {!isFullScreen && (
        <div
          ref={captionRef}
          className={`max-w-full pt-2 text-left`}
          style={{ width: captionWidth ? `${captionWidth}px` : "auto" }}
        >
          {title && <div>{title}</div>}
          {author && (
            <div className="flex items-center gap-0.5 text-sm">
              <IconPhoto size={IconSize.small} />
              <span>{author}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageSlide;
