import { User } from "../../../../../../graphql/generated";
import CommentActions from "./comment-actions";

interface CommentProps {
  commentId: string;
  updated: string;
  created: string;
  content: string | null | undefined; // TODO: fix type when BE marks this field as non nullable
  type: CommentType;
  author: User | null | undefined; // TODO: fix type when BE marks this field as non nullable
  currentUser: User | undefined;
}

enum CommentType {
  COMMENT = "comment",
  WARNING = "warning",
}

function Comment({
  commentId,
  updated,
  created,
  content,
  type,
  author,
  currentUser,
}: CommentProps) {
  return (
    <div
      className={`${
        type == CommentType.WARNING
          ? "rounded-lg border border-red-500 bg-red-25 px-6 py-4"
          : ""
      }`}
    >
      <div className="flex items-end justify-between text-neutral-500">
        <div>
          <div>{formatDatetime(created)}</div>
          {updated != created && (
            <div>{`Posodobljeno: ${formatDatetime(updated)}`}</div>
          )}
        </div>
        {currentUser && currentUser.id === author?.id && (
          <CommentActions
            commentId={commentId}
            commentContent={content || ""} // TODO: remove when BE marks this field as non nullable
            commentType={type}
          />
        )}
      </div>
      {/* TODO: will be ok, after BE migrates comment contents to strip html tags. But links will have to be detected and properly rendered here */}
      <p className="mt-2">{content}</p>
      <div className="mt-2 text-right font-medium">{author?.fullName}</div>
    </div>
  );
}

function formatDatetime(datetime: string) {
  const monthNames = [
    "januar",
    "februar",
    "marec",
    "april",
    "maj",
    "junij",
    "julij",
    "avgust",
    "septebmer",
    "oktober",
    "november",
    "december",
  ];

  const date = new Date(datetime);

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes =
    date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes();

  return `${day}. ${month} ${year} ob ${hour}:${minutes}`;
}

export default Comment;
export { CommentType };
