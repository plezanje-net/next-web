import { IconSize } from "@/components/ui/icons/icon-size";
import IconPhoto from "@/components/ui/icons/photo";
import { Image } from "@/graphql/generated";
import NextImage from "next/image";

type TImageSlideParams = {
  image: Image;
  positionClass: string;
  baseUrl: string;
};

function ImageSlide({ image, positionClass, baseUrl }: TImageSlideParams) {
  const { title, author } = image;
  return (
    <div
      className={`absolute flex h-full w-full flex-col items-center justify-center ${positionClass}`}
    >
      <div className="overflow-hidden">
        <NextImage
          src={`${baseUrl}/${image.path}.${image.extension}`}
          width={image.maxIntrinsicWidth}
          height={image.maxIntrinsicWidth / image.aspectRatio}
          alt={`${image.title}`}
          quality={100}
          priority
          className="h-full object-contain"
        />
      </div>
      {title && <div className="pt-2">{title}</div>}
      {author && (
        <div className="flex items-center gap-0.5 text-sm">
          <IconPhoto size={IconSize.small} />
          <span>{author}</span>
        </div>
      )}
    </div>
  );
}

export default ImageSlide;
