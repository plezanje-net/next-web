import { gqlRequest } from "@/lib/gql-request";
import ImageList from "@/components/image-list/image-list";
import { CragGalleryDocument, Image } from "@/graphql/generated";
import { gql } from "graphql-request";
import PublishStatusCard from "../../../../components/publish-status-card";

type TCragGalleryPageParams = {
  cragSlug: string;
};

async function CragGalleryPage(props: {
  params: Promise<TCragGalleryPageParams>;
}) {
  const params = await props.params;
  const { data } = await gqlRequest(CragGalleryDocument, {
    crag: params.cragSlug,
  });

  const crag = data.cragBySlug;
  const images = crag.images as Image[];
  const imagesBaseUrl = `${process.env.NEXT_PUBLIC_IMAGES_BASEURL}`;

  return (
    <>
      {/* Possible publish status card */}
      {crag.publishStatus !== "published" && (
        <div className="px-4 xs:px-8 2xl:container mx-auto mt-7 mb-3">
          <PublishStatusCard contributable={crag} />
        </div>
      )}

      <div className="mx-auto mt-18 px-4 2xl:container xs:px-8">
        <ImageList images={images} baseUrl={imagesBaseUrl} />
      </div>
    </>
  );
}

gql`
  query CragGallery($crag: String!) {
    cragBySlug(slug: $crag) {
      __typename
      id
      name
      slug
      publishStatus
      sectors {
        id
        name
        label
        routes {
          id
        }
      }
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
      user {
        id
        fullName
      }
    }
  }
`;

export default CragGalleryPage;
