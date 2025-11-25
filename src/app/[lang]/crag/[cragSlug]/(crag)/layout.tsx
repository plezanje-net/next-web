import { CragHeaderDocument, type Crag } from "@/graphql/generated";
import { gqlRequest } from "@/lib/graphql-client";
import CragHeader from "./components/crag-header";

interface Params {
  cragSlug: string;
}

interface Props {
  children: React.ReactNode;
  params: Promise<Params>;
}

async function CragLayout({ children, params }: Props) {
  const { cragSlug } = await params;

  const { cragBySlug } = await gqlRequest(CragHeaderDocument, {
    crag: cragSlug,
  });

  const crag = cragBySlug as Crag;

  return (
    <>
      <CragHeader crag={crag} />
      <div>{children}</div>
    </>
  );
}

export default CragLayout;
