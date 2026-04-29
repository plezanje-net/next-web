import { genderizeVerb } from "@/lib/text-helpers";
import getCurrentUser from "@/lib/auth/get-current-user";
import { getBgStyle, TContributable } from "@/lib/contributables-helpers";
import PublishStatusActions from "./publish-status-card/publish-status-actions";

type TPublishStatusCardProps = {
  contributable: TContributable;
  redirectAfterReject?: string;
};

async function PublishStatusCard({
  contributable,
  redirectAfterReject,
}: TPublishStatusCardProps) {
  const currentUser = await getCurrentUser();

  return (
    <div
      className={`@container w-full mx-auto rounded-lg ${getBgStyle(contributable.publishStatus)}`}
    >
      <div className="px-4 py-3">
        {currentUser?.roles.includes("admin") ? (
          <>
            {contributable.publishStatus === "draft" &&
              contributable.__typename === "Crag" && (
                <>
                  Plezališče je v statusu{" "}
                  <span className="font-medium">osnutek</span>. Ko zaključiš z
                  urejanjem plezališča ter sektorjev in smeri v njem, ga objavi.
                </>
              )}
            {contributable.publishStatus === "draft" &&
              contributable.__typename === "Route" && (
                <>
                  Smer je v statusu <span className="font-medium">osnutek</span>
                  . Ko zaključiš z urejanjem smeri, jo objavi.
                </>
              )}

            {contributable.publishStatus === "in_review" &&
              contributable.__typename === "Crag" && (
                <>
                  Plezališče je v statusu{" "}
                  <span className="font-medium">v pregledu</span>. Ko zaključiš
                  s pregledom potrdi ali zavrni objavo.
                </>
              )}
            {contributable.publishStatus === "in_review" &&
              contributable.__typename === "Route" && (
                <>
                  Smer je v statusu{" "}
                  <span className="font-medium">v pregledu</span>. Ko zaključiš
                  s pregledom potrdi ali zavrni objavo.
                </>
              )}
          </>
        ) : (
          <>
            {contributable.publishStatus === "draft" &&
              contributable.__typename === "Crag" && (
                <>
                  Plezališče je v statusu{" "}
                  <span className="font-medium">osnutek</span>. Ko zaključiš z
                  urejanjem plezališča ter sektorjev in smeri v njem, ga pošlji
                  uredništvu v pregled in objavo.
                </>
              )}
            {contributable.publishStatus === "draft" &&
              contributable.__typename === "Route" && (
                <>
                  Smer je v statusu <span className="font-medium">osnutek</span>
                  . Ko zaključiš z urejanjem smeri, jo pošlji uredništvu v
                  pregled in objavo.
                </>
              )}

            {contributable.publishStatus === "in_review" &&
              contributable.__typename === "Crag" && (
                <>
                  Plezališče je v statusu{" "}
                  <span className="font-medium">v pregledu</span>. Prispevek bo
                  objavljen ko bo pregledan s strani uredništva.
                </>
              )}
            {contributable.publishStatus === "in_review" &&
              contributable.__typename === "Route" && (
                <>
                  Smer je v statusu{" "}
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
          {currentUser && currentUser.id === contributable.user?.id ? (
            "Tvoj prispevek"
          ) : (
            <>
              <span className="hidden @sm:block">
                {genderizeVerb("Prispeval", "M")}:&nbsp;
              </span>
              {contributable.user?.fullName}
            </>
          )}
        </div>

        <PublishStatusActions
          contributable={contributable}
          disabled={false}
          redirectAfterReject={redirectAfterReject}
        />
      </div>
    </div>
  );
}

export default PublishStatusCard;
