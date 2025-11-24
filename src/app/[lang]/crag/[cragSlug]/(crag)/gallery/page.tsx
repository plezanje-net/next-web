import { CragGalleryDocument, Image } from "@/graphql/generated";
import ImageList from "./components/image-list";
import { gqlRequest } from "@/lib/graphql-client";

type TCragGalleryPageParams = {
  cragSlug: string;
};

async function CragGalleryPage({ params }: { params: Promise<TCragGalleryPageParams> }) {
  const { cragSlug } = await params;

  const { cragBySlug } = await gqlRequest(CragGalleryDocument, {
    crag: cragSlug,
  });

  const images = cragBySlug.images as Image[];
  const imagesBaseUrl = `${process.env.IMAGES_PROTOCOL}://${process.env.IMAGES_HOSTNAME}${process.env.IMAGES_PATHNAME}`;

  return (
    <div className="mx-auto mt-18 px-4 2xl:container xs:px-8">
      <ImageList images={images} baseUrl={imagesBaseUrl} />
    </div>
  );
}

export default CragGalleryPage;
