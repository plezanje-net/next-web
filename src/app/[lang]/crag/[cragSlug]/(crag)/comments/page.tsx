import { gql } from "urql/core";
import urqlServer from "@/graphql/urql-server";
import { Crag, CragCommentsDocument } from "@/graphql/generated";
import Comments from "@/components/comments/comments";

interface Params {
  cragSlug: string;
}

async function CragComments({ params }: { params: Params }) {
  const { data } = await urqlServer().query(CragCommentsDocument, {
    crag: params.cragSlug,
  });
  const crag = data.cragBySlug as Crag;

  return (
    <div className="mt-18 px-4 xs:px-8">
      <Comments comments={crag.comments} crag={crag} />
    </div>
  );
}

export default CragComments;

gql`
  query CragComments($crag: String!) {
    cragBySlug(slug: $crag) {
      id
      slug
      comments {
        id
        content
        type
        created
        updated
        user {
          id
          fullName
        }
      }
    }
  }
`;
