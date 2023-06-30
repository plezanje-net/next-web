import { Crag, Sector } from "../../../../../../graphql/generated";
import Accordion from "../../../../../../components/ui/accordion";
import CragRouteList from "./crag-route-list";

interface Props {
  crag: Crag;
  sector: Sector;
  ascents: Map<string, string>;
  onToggle: () => void;
  isOpen: boolean;
  first?: boolean;
  last?: boolean;
}

function CragSector({
  crag,
  sector,
  ascents,
  isOpen,
  onToggle,
  first,
  last,
}: Props) {
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
      >
        <div className="mx-4">
          <CragRouteList routes={sector.routes} crag={crag} ascents={ascents} />
        </div>
      </Accordion>
    </>
  );
}

export default CragSector;
