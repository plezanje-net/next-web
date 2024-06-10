import { Comment, Crag, Route } from "@/graphql/generated";
import AddCommentForm from "./add-comment-form";
import authStatus from "@/utils/auth/auth-status";
import CommentComponent, { CommentType } from "./comment";

type TCommentProps = {
  comments: Comment[];
  crag?: Crag;
  route?: Route;
};

async function Comments({ comments, crag, route }: TCommentProps) {
  const currentUser = (await authStatus())?.user;
  return (
    <div className="mx-auto max-w-lg">
      <AddCommentForm
        routeId={route?.id}
        cragId={crag?.id}
        currentUser={currentUser}
      />

      <div className="mt-18">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border-t border-neutral-200 py-8 first:border-none"
          >
            <CommentComponent
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
  );
}

export default Comments;
