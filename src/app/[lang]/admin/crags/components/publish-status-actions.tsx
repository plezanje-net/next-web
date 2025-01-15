"use client";

import Button from "@/components/ui/button";
import IconPublish from "@/components/ui/icons/publish";
import { Crag, Route, Sector } from "@/graphql/generated";
import { useState } from "react";
import IconCheck from "@/components/ui/icons/check";
import IconClose from "@/components/ui/icons/close";
import PublishDialog from "./publish-dialog";
import SuggestPublishDialog from "./suggest-publish-dialog";
import RejectDialog from "./reject-dialog";
import { useAuthContext } from "../../../../components/auth-context";

type TPublishStatusActionsProps = {
  contributable: Route | Sector | Crag;
  disabled: boolean;
};

function PublishStatusActions({
  contributable,
  disabled,
}: TPublishStatusActionsProps) {
  const { currentUser } = useAuthContext();

  const [publishDialogIsOpen, setPublishDialogIsOpen] = useState(false);
  const [suggestPublishDialogIsOpen, setSuggestPublishDialogIsOpen] =
    useState(false);
  const [rejectDialogIsOpen, setRejectDialogIsOpen] = useState(false);

  /**
   * Following cases are possible:
   *
   *  user editor:
   *    status draft:
   *      possible action: publish
   *        next status: published
   *
   *    status in_review:
   *      possible action: approve / reject
   *      next status: published / draft
   *
   *  user regular:
   *    status draft:
   *      possible action: suggest publish
   *      next status: in_review
   *
   *    status in_review:
   *      possible action: none (wait)
   */

  let approveRejectClass = "";
  let parentStatus = null;
  let hasParent = false;
  switch (contributable.__typename) {
    case "Route":
      hasParent = true;
      parentStatus = contributable.sector.publishStatus;
      approveRejectClass = "hidden @3xl:block";
      break;
    case "Sector":
      hasParent = true;
      parentStatus = contributable.crag.publishStatus;
      approveRejectClass = "hidden @2xl:block";
      break;
    case "Crag":
      approveRejectClass = "hidden @2xl:block";
      break;
  }

  return (
    <div className="flex items-center ml-4">
      {currentUser?.roles.includes("admin") ? (
        <>
          {/* editor user */}
          {contributable.publishStatus === "draft" && (
            <>
              {/* publish */}
              <Button
                variant="quaternary"
                disabled={
                  disabled || (hasParent && parentStatus !== "published")
                }
                onClick={() => setPublishDialogIsOpen(true)}
              >
                <span className="flex">
                  <IconPublish />
                  <span className="ml-2">Objavi</span>
                </span>
              </Button>
            </>
          )}

          {contributable.publishStatus === "in_review" && (
            <>
              {/* approve */}
              <Button
                variant="quaternary"
                disabled={
                  disabled || (hasParent && parentStatus !== "published")
                }
                onClick={() => setPublishDialogIsOpen(true)}
              >
                <span className="flex">
                  <IconCheck />
                  <span className={`ml-2 hidden ${approveRejectClass}`}>
                    Potrdi objavo
                  </span>
                </span>
              </Button>

              {/* divider */}
              <div className="ml-3 h-6 border-l border-neutral-200 pr-3"></div>

              {/* reject */}
              <Button
                variant="quaternary"
                disabled={disabled}
                onClick={() => setRejectDialogIsOpen(true)}
              >
                <span className="flex">
                  <IconClose />
                  <span className={`ml-2 hidden ${approveRejectClass}`}>
                    Zavrni objavo
                  </span>
                </span>
              </Button>

              {/* reject publish dialog */}
              <RejectDialog
                isOpen={rejectDialogIsOpen}
                setIsOpen={setRejectDialogIsOpen}
                contributable={contributable}
              />
            </>
          )}

          {/* publish / approve dialog */}
          <PublishDialog
            isOpen={publishDialogIsOpen}
            setIsOpen={setPublishDialogIsOpen}
            contributable={contributable}
          />
        </>
      ) : (
        <>
          {/* regular user */}
          {contributable.publishStatus === "draft" && (
            <>
              {/* suggest publish */}
              <Button
                variant="quaternary"
                disabled={
                  disabled ||
                  (hasParent &&
                    parentStatus !== "in_review" &&
                    parentStatus !== "published")
                }
                onClick={() => setSuggestPublishDialogIsOpen(true)}
              >
                <span className="flex">
                  <IconPublish />
                  <span className="ml-2 hidden @sm:block">
                    Predlagaj objavo
                  </span>
                </span>
              </Button>
            </>
          )}

          {/* suggest publish dialog */}
          <SuggestPublishDialog
            isOpen={suggestPublishDialogIsOpen}
            setIsOpen={setSuggestPublishDialogIsOpen}
            contributable={contributable}
          />
        </>
      )}
    </div>
  );
}

export default PublishStatusActions;
