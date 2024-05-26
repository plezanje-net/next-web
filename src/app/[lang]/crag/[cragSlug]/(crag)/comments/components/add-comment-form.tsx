"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import TextArea from "@/components/ui/text-area";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import createCommentAction from "./server-actions/create-comment-action";
import { useRouter } from "next/navigation";
import { User } from "../../../../../../../graphql/generated";

interface Props {
  cragId: string;
  currentUser: User | null | undefined;
}

enum CommentType {
  COMMENT = "comment",
  WARNING = "warning",
}

function AddCommentForm({ cragId, currentUser }: Props) {
  const router = useRouter();

  const [commentType, setCommentType] = useState<CommentType>(
    CommentType.COMMENT
  );
  const [commentContent, setCommentContent] = useState<string>("");

  const buttonLabel = { comment: "komentar", warning: "opozorilo" };

  const handleFormAction = async (formData: FormData) => {
    if (!commentContent) {
      return;
    }

    if (!currentUser) {
      console.log("Prijavi se za oddajo komentarja.");
      // TODO: open login modal dialog, when such dialog is implemented
      return;
    }

    await createCommentAction(formData);

    // clear form
    setCommentContent("");
    setCommentType(CommentType.COMMENT);

    router.refresh();
  };

  return (
    <div>
      <form action={handleFormAction}>
        <input type="hidden" name="cragId" value={cragId} />

        <TextArea
          name="commentContent"
          value={commentContent}
          onChange={setCommentContent}
          placeholder="Vnesi komentar ali opozorilo..."
          aria-label="Vnesi komentar ali opozorilo"
        />

        <div className="flex-wrap xs:flex xs:items-start xs:justify-between">
          <div className="mt-4">
            <RadioGroup
              name="commentType"
              inline
              value={commentType}
              onChange={(value) => setCommentType(value as CommentType)}
              defaultValue={CommentType.COMMENT}
            >
              <Radio value={CommentType.COMMENT}>komentar</Radio>
              <Radio value={CommentType.WARNING}>opozorilo</Radio>
            </RadioGroup>
          </div>
          <div className="ml-auto mt-4 w-fit">
            <Button
              disabled={!commentContent}
            >{`Objavi ${buttonLabel[commentType]}`}</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddCommentForm;
