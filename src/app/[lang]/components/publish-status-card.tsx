import { genderizeVerb } from "@/lib/text-helpers";
import { getBgStyle, TContributable } from "@/lib/contributables-helpers";
import PublishStatusActions from "./publish-status-card/publish-status-actions";
import { User } from "@/graphql/generated";

type TPublishStatusCardProps = {
  contributable: TContributable;
  redirectAfterReject?: string;
  currentUser?: User | null;
};

function PublishStatusCard({
  contributable,
  redirectAfterReject,
  currentUser,
}: TPublishStatusCardProps) {
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
                  <span className="font-medium">Osnutek</span>. Ko zaključiš z
                  urejanjem plezališča ter sektorjev in smeri v njem, ga objavi.
                </>
              )}
            {contributable.publishStatus === "draft" &&
              contributable.__typename === "Sector" && (
                <>
                  Sektor je v statusu{" "}
                  <span className="font-medium">Osnutek</span>. Ko zaključiš z
                  urejanjem sektorja, ga objavi.
                </>
              )}
            {contributable.publishStatus === "draft" &&
              contributable.__typename === "Route" && (
                <>
                  Smer je v statusu <span className="font-medium">Osnutek</span>
                  . Ko zaključiš z urejanjem smeri, jo objavi.
                </>
              )}

            {contributable.publishStatus === "in_review" &&
              contributable.__typename === "Crag" && (
                <>
                  Plezališče je v statusu{" "}
                  <span className="font-medium">V pregledu</span>. Ko zaključiš
                  s pregledom potrdi ali zavrni objavo.
                </>
              )}
            {contributable.publishStatus === "in_review" &&
              contributable.__typename === "Sector" && (
                <>
                  Sektor je v statusu{" "}
                  <span className="font-medium">V pregledu</span>. Ko zaključiš
                  s pregledom potrdi ali zavrni objavo.
                </>
              )}
            {contributable.publishStatus === "in_review" &&
              contributable.__typename === "Route" && (
                <>
                  Smer je v statusu{" "}
                  <span className="font-medium">V pregledu</span>. Ko zaključiš
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
                  <span className="font-medium">Osnutek</span>. Ko zaključiš z
                  urejanjem plezališča ter sektorjev in smeri v njem, ga pošlji
                  uredništvu v pregled in objavo.
                </>
              )}
            {contributable.publishStatus === "draft" &&
              contributable.__typename === "Sector" && (
                <>
                  Sektor je v statusu{" "}
                  <span className="font-medium">Osnutek</span>. Ko zaključiš z
                  urejanjem sektorja, ga pošlji uredništvu v pregled in objavo.
                </>
              )}
            {contributable.publishStatus === "draft" &&
              contributable.__typename === "Route" && (
                <>
                  Smer je v statusu <span className="font-medium">Osnutek</span>
                  . Ko zaključiš z urejanjem smeri, jo pošlji uredništvu v
                  pregled in objavo.
                </>
              )}

            {contributable.publishStatus === "in_review" &&
              contributable.__typename === "Crag" && (
                <>
                  Plezališče je v statusu{" "}
                  <span className="font-medium">V pregledu</span>. Prispevek bo
                  objavljen ko bo pregledan s strani uredništva.
                </>
              )}
            {contributable.publishStatus === "in_review" &&
              contributable.__typename === "Sector" && (
                <>
                  Sektor je v statusu{" "}
                  <span className="font-medium">V pregledu</span>. Prispevek bo
                  objavljen ko bo pregledan s strani uredništva.
                </>
              )}
            {contributable.publishStatus === "in_review" &&
              contributable.__typename === "Route" && (
                <>
                  Smer je v statusu{" "}
                  <span className="font-medium">V pregledu</span>. Prispevek bo
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
