"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import TextArea from "@/components/ui/text-area";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import createCommentAction from "./lib/create-comment-action";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/auth/auth-context";

interface Props {
  cragId: string;
}

enum CommentType {
  COMMENT = "comment",
  WARNING = "warning",
}

function AddCommentForm({ cragId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { currentUser } = useAuthContext();

  const [commentType, setCommentType] = useState<CommentType>(
    CommentType.COMMENT
  );
  const [commentContent, setCommentContent] = useState<string>("");

  const buttonLabel = { comment: "komentar", warning: "opozorilo" };

  const handleCommentInputFocus = () => {
    // check if user is logged in, if not redirect to login page
    if (!currentUser) {
      router.push(`/prijava?returnTo=${encodeURIComponent(pathname)}`);
    }
  };

  const handleFormAction = async (formData: FormData) => {
    if (!commentContent) {
      return;
    }

    // should never happen, but just in case...
    if (!currentUser) {
      router.push(`/prijava?returnTo=${encodeURIComponent(pathname)}`);
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
          onFocus={handleCommentInputFocus}
          placeholder="Vnesi komentar ali opozorilo..."
          aria-label="Vnesi komentar ali opozorilo"
          readOnly={!currentUser}
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
              type="submit"
              disabled={!commentContent}
            >{`Objavi ${buttonLabel[commentType]}`}</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddCommentForm;
