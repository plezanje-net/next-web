import ImageList from "@/components/image-list/image-list";
import { CragGalleryDocument, Image } from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";
import { gql } from "urql/core";

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
