import { Crag, Sector } from "../../../graphql/generated";
import Accordion from "../../ui/accordion";
import CragRouteList from "./crag-route-list";

interface Props {
  crag: Crag;
  sector: Sector;
  ascents: Map<string, string>;
  onToggle: () => void;
  isOpen: boolean;
}

function CragSector({ crag, sector, ascents, isOpen, onToggle }: Props) {
  return (
    <>
      <Accordion
        label={[sector.label, sector.name]
          .filter((part) => part != "")
          .join(" - ")}
        isOpen={isOpen}
        onClick={onToggle}
      >
        <div className="mx-4">
          <CragRouteList routes={sector.routes} crag={crag} ascents={ascents} />
        </div>
      </Accordion>
    </>
  );
}

export default CragSector;
