import { useContext } from "react";
import { Crag, Sector } from "../../graphql/generated";
import Accordion from "../ui/accordion";
import CragRoute, { CragRouteCompact } from "./crag-route";
import CragRoutes from "./crag-routes";
import { CragTableColumns, CragTableContext } from "./crag-table";

interface Props {
  crag: Crag;
  sector: Sector;
  onToggle: () => void;
  isOpen: boolean;
}

function CragSector({ crag, sector, isOpen, onToggle }: Props) {
  return (
    <Accordion
      label={[sector.label, sector.name]
        .filter((part) => part != "")
        .join(" - ")}
      isOpen={isOpen}
      onClick={onToggle}
    >
      <div className="md:mx-4">
        <CragRoutes routes={sector.routes} crag={crag} />
      </div>
    </Accordion>
  );
}

export default CragSector;
