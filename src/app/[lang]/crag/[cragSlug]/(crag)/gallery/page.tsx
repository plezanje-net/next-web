import { CragGalleryDocument, Image } from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";
import NextImage from "next/image";
import { gql } from "urql/core";
import ImageList from "./components/image-list";

type TCragGalleryPageParams = {
  cragSlug: string;
};

async function CragGalleryPage({ params }: { params: TCragGalleryPageParams }) {
  const { data } = await urqlServer().query(CragGalleryDocument, {
    crag: params.cragSlug,
  });

  const images = data.cragBySlug.images as Image[];
  const imagesBaseUrl = `${process.env.NEXT_PUBLIC_IMAGES_BASEURL}`;

  return (
    <div className="mx-auto mt-18 px-4 2xl:container xs:px-8">
      <ImageList images={images} baseUrl={imagesBaseUrl} />
    </div>
  );
}

gql`
  query CragGallery($crag: String!) {
    cragBySlug(slug: $crag) {
      id
      slug
      images {
        id
        title
        path
        extension
        aspectRatio
        maxIntrinsicWidth
        author
        user {
          id
        }
      }
    }
  }
`;

export default CragGalleryPage;
