import { Crag, User } from "@/graphql/generated";
import PublishStatusActions from "../../../components/publish-status-actions";
import { genderizeVerb } from "@/utils/text-helpers";

type TCragPublishStatusCard = {
  crag: Crag;
  loggedInUserIsEditor: boolean;
  loggedInUser: User | undefined;
};

function CragPublishStatusCard({
  crag,
  loggedInUserIsEditor,
  loggedInUser,
}: TCragPublishStatusCard) {
  // TODO: export to helper
  let publishStatusBgStyle;
  switch (crag.publishStatus) {
    case "draft":
      publishStatusBgStyle = "bg-red-25";
      break;
    case "in_review":
      publishStatusBgStyle = "bg-amber-25";
      break;
    case "published":
    default:
      publishStatusBgStyle = "bg-neutral-100";
  }

  return (
    <div className="flex justify-center px-4 xs:px-8 mt-7 mb-8">
      <div
        className={`@container max-w-2xl w-full mx-auto rounded-lg ${publishStatusBgStyle}`}
      >
        <div className="px-4 py-3">
          {loggedInUserIsEditor ? (
            <>
              {crag.publishStatus === "draft" && (
                <>
                  Plezališče je v statusu{" "}
                  <span className="font-medium">osnutek</span>. Ko zaključiš z
                  urejanjem plezališča ter sektorjev in smeri v njem, ga objavi.
                </>
              )}

              {crag.publishStatus === "in_review" && (
                <>
                  Plezališče je v statusu{" "}
                  <span className="font-medium">v pregledu</span>. Ko zaključiš
                  s pregledom potrdi ali zavrni objavo.
                </>
              )}
            </>
          ) : (
            <>
              {crag.publishStatus === "draft" && (
                <>
                  Plezališče je v statusu{" "}
                  <span className="font-medium">osnutek</span>. Ko zaključiš z
                  urejanjem plezališča ter sektorjev in smeri v njem, ga pošlji
                  uredništvu v pregled in objavo.
                </>
              )}

              {crag.publishStatus === "in_review" && (
                <>
                  Plezališče je v statusu{" "}
                  <span className="font-medium">v pregledu</span>. Prispevek bo
                  objavljen ko bo pregledan s strani uredništva.
                </>
              )}
            </>
          )}
        </div>

        <div className="px-4 py-2 border-t border-neutral-200 flex justify-between items-center">
          {/* contributor */}
          <div className="flex text-neutral-500 py-1">
            {loggedInUser && loggedInUser.id === crag.user?.id ? (
              "Tvoj prispevek"
            ) : (
              <>
                <span className="hidden @sm:block">
                  {genderizeVerb("Prispeval", "M")}:&nbsp;
                </span>
                {crag.user?.fullName}
              </>
            )}
          </div>

          <PublishStatusActions
            contributable={crag}
            loggedInUserIsEditor={loggedInUserIsEditor}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
}

export default CragPublishStatusCard;
