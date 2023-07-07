import { gql } from "urql/core";
import urqlServer from "../../../../../graphql/urql-server";
import { Crag, CragCommentsDocument } from "../../../../../graphql/generated";
import Comment, { CommentType } from "./components/comment";
import AddCommentForm from "./components/add-comment-form";
import authStatus from "../../../../../utils/auth/auth-status";

interface Params {
  cragSlug: string;
}

async function CragComments({ params }: { params: Params }) {
  const { data } = await urqlServer().query(CragCommentsDocument, {
    crag: params.cragSlug,
  });
  const crag = data.cragBySlug as Crag;
  const currentUser = (await authStatus())?.user;

  return (
    <div className="mx-auto mt-18 max-w-120">
      <AddCommentForm cragId={crag.id} currentUser={currentUser} />

      <div className="mt-12">
        {crag.comments.map((comment) => (
          <div
            key={comment.id}
            className="border-t border-t-neutral-200 py-8 first:border-none"
          >
            <Comment
              commentId={comment.id}
              datetime={comment.updated}
              content={comment.content}
              type={comment.type as CommentType}
              author={comment.user}
              currentUser={currentUser}
            />
          </div>
        ))}
      </div>
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
        updated
        user {
          id
          fullName
        }
      }
    }
  }
`;
