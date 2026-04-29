import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import { CragCommentsDocument } from "@/graphql/generated";
import Comment, { CommentType } from "./components/comment";
import AddCommentForm from "./components/add-comment-form";
import PublishStatusCard from "../../../../components/publish-status-card";

interface Params {
  cragSlug: string;
}

async function CragComments(props: { params: Promise<Params> }) {
  const params = await props.params;
  const { data } = await gqlRequest(CragCommentsDocument, {
    crag: params.cragSlug,
  });
  const crag = data.cragBySlug;

  return (
    <div>
      {/* Possible publish status card */}
      {crag.publishStatus !== "published" && (
        <div className="px-4 xs:px-8 2xl:container mx-auto mt-7 mb-3">
          <div className="mx-auto max-w-lg">
            <PublishStatusCard contributable={crag} />
          </div>
        </div>
      )}

      <div className="mt-7 px-4 xs:px-8">
        <div className="mx-auto max-w-lg">
          <AddCommentForm cragId={crag.id} />

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
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CragComments;

gql`
  query CragComments($crag: String!) {
    cragBySlug(slug: $crag) {
      __typename
      id
      slug
      publishStatus
      name
      sectors {
        id
        name
        label
        routes {
          id
        }
      }
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
      user {
        id
        fullName
      }
    }
  }
`;
