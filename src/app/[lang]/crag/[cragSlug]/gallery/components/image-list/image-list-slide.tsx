import { IconSize } from "@/components/ui/icons/icon-size";
import IconPhoto from "@/components/ui/icons/photo";
import { Image } from "@/graphql/generated";
import useTapDetection from "@/hooks/useTapDetection";
import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";

type TImageSlideParams = {
  image: Image;
  positionClass: string;
  baseUrl: string;
  isFullScreen: boolean;
  toggleFullScreen: () => void;
};

function ImageSlide({
  image,
  positionClass,
  baseUrl,
  toggleFullScreen,
  isFullScreen,
}: TImageSlideParams) {
  const { title, author } = image;
  const imageRef = useRef<HTMLImageElement>(null);
  const [captionWidth, setCaptionWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!imageRef.current) return;
    const resizeObserver = new ResizeObserver(([{ target }]) =>
      setCaptionWidth(target.clientWidth)
    );
    resizeObserver.observe(imageRef.current);
    return () => resizeObserver.disconnect();
  }, [image]);

  const { handleTouchStart, handleTouchEnd } =
    useTapDetection(toggleFullScreen);

  return (
    <div
      className={`absolute flex h-full w-full flex-col items-center justify-center ${positionClass}`}
    >
      <div></div>
      <div
        className={`overflow-hidden ${
          isFullScreen && "fixed left-0 top-0 h-full w-full"
        }`}
      >
        <NextImage
          ref={imageRef}
          src={`${baseUrl}/${image.path}.${image.extension}`}
          width={image.maxIntrinsicWidth}
          height={image.maxIntrinsicWidth / image.aspectRatio}
          alt={`${image.title}`}
          quality={100}
          priority
          className="mx-auto h-full select-none object-contain"
          onDoubleClick={toggleFullScreen}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />
      </div>
      {!isFullScreen && (
        <div
          className={`pt-2${captionWidth ? "" : " hidden"}`}
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
