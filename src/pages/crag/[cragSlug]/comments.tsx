import { useRouter } from "next/router";
import { gql, useQuery } from "urql";
import { Crag, CragCommentsDocument } from "../../../graphql/generated";
import Spinner from "../../../components/ui/spinner";
import CragHeader from "../../../components/crag/crag-header";

type Params = {
  cragSlug: string;
};

function CragCommentsPage() {
  const { query } = useRouter();

  return (
    <>
      <CragHeader cragSlug={(query as Params).cragSlug} activeTab="comments" />
    </>
  );
}

gql`
  query CragComments($crag: String!) {
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
      comments {
        id
        content
        created
        updated
        type
        exposedUntil
        user {
          id
          fullName
        }
      }
      user {
        id
      }
    }
  }
`;

export default CragCommentsPage;
