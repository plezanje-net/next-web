"use client";

import { Image } from "@/graphql/generated";
import { useEffect, useMemo, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import ImageListElement from "./image-list-element";
import ImageListSlider from "./image-list-slider";

type TImage = Pick<
  Image,
  | "id"
  | "path"
  | "extension"
  | "maxIntrinsicWidth"
  | "aspectRatio"
  | "title"
  | "author"
>;

type TImageListParams = {
  images: TImage[];
  baseUrl: string;
};

function ImageList({ images, baseUrl }: TImageListParams) {
  const [openImage, setOpenImage] = useState<string | null>(null);

  const windowSize = useWindowSize();
  const columns = useMemo(() => {
    if (windowSize.width === undefined || windowSize.width <= 768) {
      return 2;
    }
    if (windowSize.width <= 1024) {
      return 3;
    }
    return 4;
  }, [windowSize.width]);

  const sortedImages = useMemo(() => {
    const columnArrays = images.reduce((acc: TImage[][], image, index) => {
      const column = index % columns;
      if (!acc[column]) {
        acc[column] = [];
      }
      acc[column].push(image);
      return acc;
    }, []);

    return columnArrays.flat();
  }, [columns, images]);

  const columnClasses = [
    "",
    "columns-1",
    "columns-2",
    "columns-3",
    "columns-4",
  ];

  useEffect(() => {
    if (openImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openImage]);

  function handleClick(id: string) {
    setOpenImage(id);
  }

  function handleClose() {
    setOpenImage(null);
  }

  return (
    <div className={columnClasses[columns]}>
      {sortedImages.map((image) => (
        <div key={image.id} className="mb-4 break-inside-avoid-column">
          <ImageListElement
            image={image}
            baseUrl={baseUrl}
            onClick={() => handleClick(image.id)}
          />
        </div>
      ))}
      {openImage && (
        <ImageListSlider
          id={openImage}
          baseUrl={baseUrl}
          images={images}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default ImageList;
