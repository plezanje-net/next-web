import Link from "@/components/ui/link";
import IconReview from "@/components/ui/icons/review";
import PublishStatusChip from "@/components/ui/publish-status-chip";
import { genderizeVerb, pluralizeNoun } from "@/lib/text-helpers";
import { TContribution, TContributionsGroup } from "../page";
import { User } from "@/graphql/generated";

type TContributionsGroupProps = {
  contributionsGroup: TContributionsGroup;
  currentUser: User | null;
};

function ContributionsGroup({
  contributionsGroup,
  currentUser,
}: TContributionsGroupProps) {
  const { crag, childContributions } = contributionsGroup;

  // generate such crag link that all contributions sectors are opened and also all sectors that have some contributions routes are opened
  let openSectorsPositions: number[] = [];
  Object.values(childContributions).forEach((childContributionsGroup) => {
    if (
      childContributionsGroup[0].entity === "route" &&
      childContributionsGroup[0].route?.sector?.name === "" &&
      childContributionsGroup[0].route?.sector?.label === ""
    ) {
      // skip opening sectors for routes in a dummy sector (sectorless crag)
      return;
    }

    childContributionsGroup.forEach((contribution) => {
      if (contribution?.sector?.position !== undefined) {
        openSectorsPositions.push(contribution.sector.position);
      }
      if (contribution?.route?.sector?.position !== undefined) {
        openSectorsPositions.push(contribution.route.sector.position);
      }
    });
  });

  openSectorsPositions = Array.from(new Set(openSectorsPositions)); // remove duplicates

  let linkHref = `/plezalisce/${crag.slug}`;
  if (openSectorsPositions.length > 0) {
    linkHref += `?sectors=${openSectorsPositions.join(",")}`;
  }

  return (
    <div className="mt-4 pb-4 border-b border-neutral-200">
      <div className="flex items-start justify-between gap-8">
        {/* Crag where this group of contributions is in */}
        <div>
          {crag.publishStatus && crag.publishStatus !== "published" ? (
            <span>
              Novo plezališče{" "}
              <Link href={linkHref} variant="secondary" className="font-medium">
                {crag.name}
              </Link>
              <Contributor
                currentUser={currentUser}
                groupUser={
                  Object.values(childContributions).filter(
                    (group) => group[0].entity === "crag"
                  )[0]?.[0]?.user
                }
              />
              , v statusu
              <PublishStatusChip
                publishStatus={crag.publishStatus}
                className="ml-2"
              />
            </span>
          ) : (
            <span>
              V plezališču{" "}
              <Link href={linkHref} variant="secondary" className="font-medium">
                {crag.name}
              </Link>
            </span>
          )}
        </div>
        <div>
          {(currentUser?.roles.includes("admin") ||
            Object.values(childContributions).some(
              (group) => group[0].publishStatus === "draft"
            )) && (
            <Link
              href={linkHref}
              variant="secondary"
              className="flex gap-2 items-center justify-end"
            >
              <IconReview />
              Preglej
            </Link>
          )}
        </div>
      </div>

      {/* Contributed sectors and routes in this crag */}
      {Object.entries(childContributions)
        .filter(([_key, group]) => group[0].entity !== "crag")
        .map(([key, group]: [string, TContribution[]]) => (
          <div key={key} className="mt-2 ml-10">
            <div>
              <span>
                {pluralizeNoun(
                  group[0].entity == "sector" ? "nov sektor" : "nova smer",
                  group.length
                )}
              </span>
              <Contributor
                currentUser={currentUser}
                groupUser={group[0]?.user}
              />
              <span className="mr-2">, v statusu</span>
              <PublishStatusChip publishStatus={group[0]?.publishStatus} />
            </div>
          </div>
        ))}
    </div>
  );
}

function Contributor({
  currentUser,
  groupUser,
}: {
  currentUser: User | null;
  groupUser: TContribution["user"];
}) {
  if (!currentUser?.roles.includes("admin")) {
    return "";
  }

  if (currentUser && currentUser.id === groupUser?.id) {
    return ", tvoj prispevek";
  }

  return (
    <>
      , <span>{genderizeVerb("prispeval", groupUser?.gender)}</span>{" "}
      {groupUser?.fullName}
    </>
  );
}

export default ContributionsGroup;
