import { IconSize } from "@/components/ui/icons/icon-size";
import IconPhoto from "@/components/ui/icons/photo";
import { Image } from "@/graphql/generated";
import NextImage from "next/image";

type TImageListElementParams = {
  image: Image;
  baseUrl: string;
  onClick: () => void;
};

function ImageListElement({
  image,
  baseUrl,
  onClick,
}: TImageListElementParams) {
  const { id, path, extension, maxIntrinsicWidth, aspectRatio, title, author } =
    image;
  return (
    <div key={id} className="mb-4 break-inside-avoid-column">
      <div className="text-center">
        <NextImage
          src={`${baseUrl}/${path}.${extension}`}
          width={maxIntrinsicWidth}
          height={maxIntrinsicWidth / aspectRatio}
          sizes="(max-width: 512px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          alt={`${title}`}
          className="inline-block rounded-lg"
          quality={100}
          priority
          onClick={onClick}
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

export default ImageListElement;
