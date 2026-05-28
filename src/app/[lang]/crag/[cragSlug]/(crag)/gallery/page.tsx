import { gqlRequest } from "@/lib/gql-request";
import { gql } from "graphql-request";
import ImageList from "@/components/image-list/image-list";
import { CragGalleryDocument, Image } from "@/graphql/generated";
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

  const currentUser = await getCurrentUser();
  const authToken = await getAuthToken();
  const loggedIn = currentUser !== null && authToken !== null; // checking auth token only to make ts happy

  const images = data.cragBySlug.images as Image[];
  const imagesBaseUrl = `${process.env.NEXT_PUBLIC_IMAGES_BASEURL}`;

  return (
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
