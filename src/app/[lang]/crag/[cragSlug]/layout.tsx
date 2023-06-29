import { gql } from "@urql/core";
import CragHeader from "../../../../components/crag/crag-header";
import { Crag, CragHeaderDocument } from "../../../../graphql/generated";
import urqlServer from "../../../../graphql/urql-server";

interface Params {
  cragSlug: string;
}

interface Props {
  children: React.ReactNode;
  params: Params;
}

async function CragLayout({ children, params: { cragSlug } }: Props) {
  const { data } = await urqlServer().query(CragHeaderDocument, {
    crag: cragSlug,
  });

  const crag = data.cragBySlug as Crag;

  return (
    <>
      <CragHeader crag={crag} />
      <div>{children}</div>
    </>
  );
}

export default CragLayout;

gql`
  query CragHeader($crag: String!) {
    cragBySlug(slug: $crag) {
      id
      slug
      status
      name
      publishStatus
      country {
        id
        name
        slug
      }
      user {
        id
      }
    }
  }
`;
