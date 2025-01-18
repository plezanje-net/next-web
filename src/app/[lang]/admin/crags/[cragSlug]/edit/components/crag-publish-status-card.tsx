import { Crag } from "@/graphql/generated";
import PublishStatusActions from "../../../components/publish-status-actions";
import { genderizeVerb } from "@/utils/text-helpers";
import getCurrentUser from "@/utils/auth/get-current-user";
import { getBgStyle } from "@/utils/contributables-helpers";

type TCragPublishStatusCard = {
  crag: Crag;
};

async function CragPublishStatusCard({ crag }: TCragPublishStatusCard) {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex justify-center px-4 xs:px-8 mt-7 mb-8">
      <div
        className={`@container max-w-2xl w-full mx-auto rounded-lg ${getBgStyle(crag.publishStatus)}`}
      >
        <div className="px-4 py-3">
          {currentUser?.roles.includes("admin") ? (
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
            {currentUser && currentUser.id === crag.user?.id ? (
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

          <PublishStatusActions contributable={crag} disabled={false} />
        </div>
      </div>
    </div>
  );
}

export default CragPublishStatusCard;
