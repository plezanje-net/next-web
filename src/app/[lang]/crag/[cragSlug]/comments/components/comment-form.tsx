"use client";

import { useState } from "react";
import Button from "../../../../../../components/ui/button";
import TextArea from "../../../../../../components/ui/text-area";
import { Radio, RadioGroup } from "../../../../../../components/ui/radio-group";
import { createComment } from "./create-comment-action";
import { useRouter } from "next/navigation";

interface Props {
  cragId: string;
}

enum CommentType {
  COMMENT = "comment",
  WARNING = "warning",
}

function CommentForm({ cragId }: Props) {
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
    await createComment(formData);
    router.refresh();
  };

  return (
    <div>
      <form action={handleFormAction}>
        <input type="hidden" name="cragId" value={cragId} />
        <TextArea
          name="commentContent"
          onChange={setCommentContent}
          placeholder="Vnesi komentar ali opozorilo..."
          aria-label="Vnesi komentar ali opozorilo"
        />

        <div className="mt-4 flex items-start justify-between">
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
          <Button
            isDisabled={!commentContent}
          >{`Objavi ${buttonLabel[commentType]}`}</Button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
