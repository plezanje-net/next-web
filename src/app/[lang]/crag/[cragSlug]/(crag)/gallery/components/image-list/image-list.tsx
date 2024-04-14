"use client";

import { Image } from "@/graphql/generated";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import ImageListElement from "./image-list-element";

type TImageListParams = {
  images: Image[];
  baseUrl: string;
};

function ImageList({ images, baseUrl }: TImageListParams) {
  const [columns, setColumns] = useState<number>(0);

  useEffect(() => {
    const sortedImages =
      columns > 0
        ? images.reduce((acc: Image[][], image, index) => {
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

  const [sortedImages, setSortedImages] = useState<Image[]>([]);

  const columnClasses = [
    "",
    "columns-1",
    "columns-2",
    "columns-3",
    "columns-4",
  ];

  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize.width === undefined || windowSize.width <= 512) {
      setColumns(1);
      return;
    }
    if (windowSize.width <= 768) {
      setColumns(2);
      return;
    }
    if (windowSize.width <= 1024) {
      setColumns(3);
      return;
    }

    setColumns(4);
  }, [windowSize.width]);

  return (
    <div className={columnClasses[columns]}>
      {sortedImages.map((image) => (
        <div key={image.id} className="mb-4 break-inside-avoid-column">
          <ImageListElement image={image} baseUrl={baseUrl} />
        </div>
      ))}
    </div>
  );
}

export default ImageList;
