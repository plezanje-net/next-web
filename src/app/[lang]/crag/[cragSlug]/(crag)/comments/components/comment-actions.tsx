"use client";

import { useRouter } from "next/navigation";
import Dialog, { DialogSize } from "@/components/ui/dialog";
import Link from "@/components/ui/link";
import updateCommentAction from "./lib/update-comment-action";
import deleteCommentAction from "./lib/delete-comment-action";
import TextArea from "@/components/ui/text-area";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { useState } from "react";
import { CommentType } from "./comment";

interface Props {
  commentId: string;
  commentContent: string;
  commentType: CommentType;
}

function CommentActions({ commentId, commentContent, commentType }: Props) {
  const router = useRouter();
  const [editedCommentContent, setEditedCommentContent] =
    useState(commentContent);
  const [editedCommentType, setEditedCommentType] =
    useState<CommentType>(commentType);

  const handleConfirmEdit = async () => {
    // Comment has been edited. Update comment.
    await updateCommentAction(
      commentId,
      editedCommentContent,
      editedCommentType
    );
    router.refresh();
  };

  const handleCancelEdit = () => {
    setEditedCommentContent(commentContent);
    setEditedCommentType(commentType);
  };

  const handleConfirmDelete = async () => {
    // Comment deletion has been confirmed. Delete the comment.
    await deleteCommentAction(commentId);
    router.refresh();
  };

  return (
    <div>
      {/* Edit */}
      <Dialog
        title="Uredi komentar"
        openTrigger={
          <Link variant="tertiary" className="ml-2 text-sm">
            uredi
          </Link>
        }
        confirm={{ label: "Shrani", callback: handleConfirmEdit }}
        cancel={{ label: "Prekliči", callback: handleCancelEdit }}
        dialogSize={DialogSize.medium}
      >
        <div className="">
          <TextArea
            name="commentContent"
            aria-label="Vnesi komentar ali opozorilo"
            onChange={setEditedCommentContent}
            value={editedCommentContent}
          />

          <div className="mt-4 flex items-start justify-between">
            <RadioGroup
              name="commentType"
              inline
              value={editedCommentType}
              onChange={(value) => setEditedCommentType(value as CommentType)}
            >
              <Radio value={CommentType.COMMENT}>komentar</Radio>
              <Radio value={CommentType.WARNING}>opozorilo</Radio>
            </RadioGroup>
          </div>
        </div>
      </Dialog>

      {/* Delete */}
      <Dialog
        title="Izbriši komentar?"
        openTrigger={
          <Link variant="tertiary" className="ml-2 text-sm">
            izbriši
          </Link>
        }
        confirm={{ label: "Izbriši", callback: handleConfirmDelete }}
        cancel={{ label: "Prekliči" }}
      >
        <div>Si prepričan_a da želiš izbrisati komentar?</div>
      </Dialog>
    </div>
  );
}

export default CommentActions;
