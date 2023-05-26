import { useRouter } from "next/router";
import CragHeader from "../../../components/crag/crag-header";
import CragGallery from "../../../components/crag/crag-gallery";

type Params = {
  cragSlug: string;
};

function CragGalleryPage() {
  const { query } = useRouter();

  return (
    <>
      <CragHeader cragSlug={(query as Params).cragSlug} activeTab="gallery" />
      <CragGallery />
    </>
  );
}

export default CragGalleryPage;
