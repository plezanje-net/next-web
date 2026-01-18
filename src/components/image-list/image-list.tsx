"use client";

import { Image } from "@/graphql/generated";
import { useEffect, useState } from "react";
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
  const [columns, setColumns] = useState<number>(0);
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [sortedImages, setSortedImages] = useState<Image[]>([]);

  useEffect(() => {
    const sortedImages =
      columns > 0
        ? images.reduce((acc: TImage[][], image, index) => {
            const column = index % columns;
            if (!acc[column]) {
              acc[column] = [];
            }
            acc[column].push(image);
            return acc;
          }, [])
        : [];

    setSortedImages(sortedImages.flat());
  }, [columns, images]);

  const columnClasses = [
    "",
    "columns-1",
    "columns-2",
    "columns-3",
    "columns-4",
  ];

  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize.width === undefined || windowSize.width <= 768) {
      setColumns(2);
      return;
    }
    if (windowSize.width <= 1024) {
      setColumns(3);
      return;
    }
    setColumns(4);
  }, [windowSize.width]);

  function handleClick(id: string) {
    setOpenImage(id);
    document.body.style.overflow = "hidden";
  }

  function handleClose() {
    setOpenImage(null);
    document.body.style.overflow = "auto";
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
