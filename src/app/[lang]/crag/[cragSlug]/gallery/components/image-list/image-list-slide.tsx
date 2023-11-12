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
      className={`absolute flex h-full w-full items-center justify-center ${positionClass}`}
    >
      <div className="text-center">
        <NextImage
          src={`${baseUrl}/${image.path}.${image.extension}`}
          width={image.maxIntrinsicWidth}
          height={image.maxIntrinsicWidth / image.aspectRatio}
          alt={`${image.title}`}
          quality={100}
          priority
        />
        {title && <div className="pt-2">{title}</div>}
        {author && (
          <div className="text-sm">
            <IconPhoto className="inline pr-1" size="small" />
            {author}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageSlide;
