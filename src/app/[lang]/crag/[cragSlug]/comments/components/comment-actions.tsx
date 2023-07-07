"use client";

import { useRouter } from "next/navigation";
import Dialog from "../../../../../../components/ui/dialog";
import Link from "../../../../../../components/ui/link";
import { deleteComment } from "./delete-comment-action";

interface Props {
  commentId: string;
}

function CommentActions({ commentId }: Props) {
  const router = useRouter();

  const handleConfirmDelete = async () => {
    // Comment deletion has been confirmed. Delete the comment.
    await deleteComment(commentId);
    router.refresh();
  };

  return (
    <div className="text-sm">
      <Link href="#" variant="tertiary">
        uredi
      </Link>

      <Dialog
        title="Izbriši komentar?"
        openTrigger={
          <Link variant="tertiary" className="ml-2">
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
