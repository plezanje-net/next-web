import { useRouter } from "next/router";
import { gql } from "urql";
import CragHeader from "../../../components/crag/crag-header";
import CragComments from "../../../components/crag/crag-comments";

type Params = {
  cragSlug: string;
};

function CragCommentsPage() {
  const { query } = useRouter();

  return (
    <>
      <CragHeader cragSlug={(query as Params).cragSlug} activeTab="comments" />
      <CragComments />
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
