import Button from "@/components/ui/button";
import IconPublish from "@/components/ui/icons/publish";
import { Route } from "@/graphql/generated";
import PublishRouteDialog from "./publish-route-dialog";
import { useState } from "react";
import IconCheck from "@/components/ui/icons/check";
import IconClose from "@/components/ui/icons/close";
import SuggestPublishRouteDialog from "./suggest-publish-route-dialog";
import RejectPublishRouteDialog from "./reject-publish-route-dialog";

type TPublishStatusActionsProps = {
  route: Route;
  loggedInUserIsEditor: boolean;
  disabled: boolean;
};

function PublishStatusActions({
  route,
  loggedInUserIsEditor,
  disabled,
}: TPublishStatusActionsProps) {
  const [publishRouteDialogIsOpen, setPublishRouteDialogIsOpen] =
    useState(false);
  const [suggestPublishRouteDialogIsOpen, setSuggestPublishRouteDialogIsOpen] =
    useState(false);
  const [
    rejectPublishRouteDialogIsOpen,
    setRejectDeclinePublishRouteDialogIsOpen,
  ] = useState(false);

  /**
   * Following cases are possible:
   *
   *  user editor:
   *    route draft:
   *      possible action: publish
   *        next status: published
   *
   *    route in_review:
   *      possible action: approve / reject
   *      next status: published / draft
   *
   *  user regular:
   *    route draft:
   *      possible action: suggest publish
   *      next status: in_review
   *
   *    route in_review:
   *      possible action: none (wait)
   */

  return (
    <>
      {loggedInUserIsEditor ? (
        <>
          {route.publishStatus === "draft" && (
            <>
              {/* publish */}
              <Button
                variant="quaternary"
                disabled={disabled}
                onClick={() => setPublishRouteDialogIsOpen(true)}
              >
                <span className="flex">
                  <IconPublish />
                  <span className="ml-2">Objavi</span>
                </span>
              </Button>
            </>
          )}

          {route.publishStatus === "in_review" && (
            <>
              {/* approve */}
              <Button
                variant="quaternary"
                disabled={disabled}
                onClick={() => setPublishRouteDialogIsOpen(true)}
              >
                <span className="flex">
                  <IconCheck />
                  <span className="ml-2 hidden @3xl:block">Potrdi objavo</span>
                </span>
              </Button>

              {/* divider */}
              <div className="ml-3 h-6 border-l border-neutral-200 pr-3"></div>

              {/* reject */}
              <Button
                variant="quaternary"
                disabled={disabled}
                onClick={() => setRejectDeclinePublishRouteDialogIsOpen(true)}
              >
                <span className="flex">
                  <IconClose />
                  <span className="ml-2 hidden @3xl:block">Zavrni objavo</span>
                </span>
              </Button>

              {/* reject publish */}
              <RejectPublishRouteDialog
                isOpen={rejectPublishRouteDialogIsOpen}
                setIsOpen={setRejectDeclinePublishRouteDialogIsOpen}
                route={route}
              />
            </>
          )}

          {/* publish, approve */}
          <PublishRouteDialog
            isOpen={publishRouteDialogIsOpen}
            setIsOpen={setPublishRouteDialogIsOpen}
            route={route}
          />
        </>
      ) : (
        <>
          {route.publishStatus === "draft" && (
            <>
              {/* suggest publish */}
              <Button
                variant="quaternary"
                disabled={disabled}
                onClick={() => setSuggestPublishRouteDialogIsOpen(true)}
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

          {/* suggest publish */}
          <SuggestPublishRouteDialog
            isOpen={suggestPublishRouteDialogIsOpen}
            setIsOpen={setSuggestPublishRouteDialogIsOpen}
            route={route}
          />
        </>
      )}
    </>
  );
}

export default PublishStatusActions;