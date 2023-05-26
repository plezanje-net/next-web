import { useRouter } from "next/router";
import CragHeader from "../../../components/crag/crag-header";
import CragInfo from "../../../components/crag/crag-info";

type Params = {
  cragSlug: string;
};

function CragGalleryPage() {
  const { query } = useRouter();

  return (
    <>
      <CragHeader cragSlug={(query as Params).cragSlug} activeTab="info" />
      <CragInfo />
    </>
  );
}

export default CragGalleryPage;
