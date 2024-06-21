import { Image } from "@/graphql/generated";
import NextImage from "next/image";

type TRouteImageProps = {
  image: Image;
  className?: string;
};

function RouteImage({ image, className }: TRouteImageProps) {
  const { id, path, extension, maxIntrinsicWidth, aspectRatio, title, author } =
    image;

  const baseUrl = `${process.env.IMAGES_PROTOCOL}://${process.env.IMAGES_HOSTNAME}${process.env.IMAGES_PATHNAME}`;

  return (
    <div className={className}>
      <NextImage
        src={`${baseUrl}/${path}.${extension}`}
        width={maxIntrinsicWidth}
        height={maxIntrinsicWidth / aspectRatio}
        sizes="(max-width: 512px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        alt={`${title}`}
        className="inline-block rounded-lg"
        quality={100}
        priority
      />
    </div>
  );
}

export default RouteImage;
