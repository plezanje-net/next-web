import IconPhoto from "@/components/ui/icons/photo";
import { Image } from "@/graphql/generated";
import NextImage from "next/image";

type TImageListElementParams = {
  image: Image;
  baseUrl: string;
};

function ImageListElement({ image, baseUrl }: TImageListElementParams) {
  const { id, path, extension, maxIntrinsicWidth, aspectRatio, title, author } =
    image;
  return (
    <div key={id} className="mb-4 break-inside-avoid-column">
      <NextImage
        src={`${baseUrl}/${path}.${extension}`}
        width={maxIntrinsicWidth}
        height={maxIntrinsicWidth / aspectRatio}
        sizes="(max-width: 512px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        alt={`${title}`}
        className="rounded-lg"
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
  );
}

export default ImageListElement;
