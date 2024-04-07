import { IconSize } from "@/components/ui/icons/icon-size";
import IconPhoto from "@/components/ui/icons/photo";
import { Image } from "@/graphql/generated";
import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";

type TImageSlideParams = {
  image: Image;
  positionClass: string;
  baseUrl: string;
};

function ImageSlide({ image, positionClass, baseUrl }: TImageSlideParams) {
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

  return (
    <div
      className={`absolute flex h-full w-full flex-col items-center justify-center ${positionClass}`}
    >
      <div></div>
      <div className="overflow-hidden">
        <NextImage
          ref={imageRef}
          src={`${baseUrl}/${image.path}.${image.extension}`}
          width={image.maxIntrinsicWidth}
          height={image.maxIntrinsicWidth / image.aspectRatio}
          alt={`${image.title}`}
          quality={100}
          priority
          className="h-full w-auto object-contain"
        />
      </div>
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
    </div>
  );
}

export default ImageSlide;
