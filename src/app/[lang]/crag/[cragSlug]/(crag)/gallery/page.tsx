import { gqlRequest } from "@/lib/gql-request";
import { gql } from "graphql-request";
import ImageList from "@/components/image-list/image-list";
import { CragGalleryDocument, Image } from "@/graphql/generated";
import PublishStatusCard from "../../../../components/publish-status-card";
import getCurrentUser from "@/lib/auth/get-current-user";
import getAuthToken from "@/lib/auth/auth-token";
import ImageUploadDialog from "@/components/image-upload/image-upload-dialog";

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
  const currentUser = await getCurrentUser();
  const authToken = await getAuthToken();
  const loggedIn = currentUser !== null && authToken !== null; // checking auth token only to make ts happy

  const imagesBaseUrl = `${process.env.NEXT_PUBLIC_IMAGES_BASEURL}`;

  return (
    <>
      {/* Possible publish status card */}
      {crag.publishStatus !== "published" && (
        <div className="px-4 xs:px-8 2xl:container mx-auto mt-7 mb-3">
          <PublishStatusCard contributable={crag} currentUser={currentUser} />
        </div>
      )}

      <div className="mx-auto mt-4 px-4 2xl:container xs:px-8">
        {loggedIn && (
          <div className="flex justify-end mb-4">
            <ImageUploadDialog
              authToken={authToken}
              entityId={data.cragBySlug.id}
              entityType="crag"
            />
          </div>
        )}
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
