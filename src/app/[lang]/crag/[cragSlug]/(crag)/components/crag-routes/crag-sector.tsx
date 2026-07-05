import { CragSectorsQuery } from "@/graphql/generated";
import Accordion from "@/components/ui/accordion";
import CragRouteList from "./crag-route-list";
import PublishStatusCard from "../../../../../components/publish-status-card";
import { useAuthContext } from "@/lib/auth/auth-context";

type TCragSectorProps = {
  crag: CragSectorsQuery["cragBySlug"];
  sector: CragSectorsQuery["cragBySlug"]["sectors"][number];
  ascents: Map<string, string>;
  onToggle: () => void;
  isOpen: boolean;
  first?: boolean;
  last?: boolean;
};

function CragSector({
  crag,
  sector,
  ascents,
  isOpen,
  onToggle,
  first,
  last,
}: TCragSectorProps) {
  const sectorStatus =
    sector.publishStatus === "draft"
      ? "draft"
      : sector.publishStatus === "in_review"
        ? "in_review"
        : "default";

  const { currentUser } = useAuthContext();

  return (
    <>
      <Accordion
        label={[sector.label, sector.name]
          .filter((part) => part != "")
          .join(" - ")}
        isOpen={isOpen}
        onClick={onToggle}
        first={first}
        last={last}
        status={sectorStatus}
      >
        <div className="mx-4">
          {sectorStatus !== "default" && (
            <div className="my-2 text-left">
              <PublishStatusCard
                contributable={sector}
                currentUser={currentUser}
              />
            </div>
          )}
          <CragRouteList routes={sector.routes} crag={crag} ascents={ascents} />
        </div>
      </Accordion>
    </>
  );
}

export default CragSector;
