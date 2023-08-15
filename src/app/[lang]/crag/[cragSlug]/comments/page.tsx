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
    <div className="mt-18 px-4 xs:px-8">
      <div className="mx-auto max-w-lg">
        <AddCommentForm cragId={crag.id} currentUser={currentUser} />

        <div className="mt-18">
          {crag.comments.map((comment) => (
            <div
              key={comment.id}
              className="border-t border-neutral-200 py-8 first:border-none"
            >
              <Comment
                commentId={comment.id}
                updated={comment.updated}
                created={comment.created}
                content={comment.content}
                type={comment.type as CommentType}
                author={comment.user}
                currentUser={currentUser}
              />
            </div>
          ))}
        </div>
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
