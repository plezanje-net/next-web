import { CragGalleryDocument, Image } from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";
import NextImage from "next/image";
import { gql } from "urql/core";
import ImageList from "./components/image-list";
import ImageUpload from "@/components/image-upload/image-upload";
import Button from "@/components/ui/button";

type TCragGalleryPageParams = {
  cragSlug: string;
};

async function CragGalleryPage({ params }: { params: TCragGalleryPageParams }) {
  const { data } = await urqlServer().query(CragGalleryDocument, {
    crag: params.cragSlug,
  });


  const images = data.cragBySlug.images as Image[];
  const imagesBaseUrl = `${process.env.IMAGES_PROTOCOL}://${process.env.IMAGES_HOSTNAME}${process.env.IMAGES_PATHNAME}`;



  return (
    <div className="mx-auto px-4 2xl:container xs:px-8">
      <div className="flex justify-end mt-4 mb-4">
        <ImageUpload
          openTrigger={<Button>Dodaj fotografijo</Button>}
          entityType="crag"
          entityId={data.cragBySlug.id}
        />
      </div>
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
