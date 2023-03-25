import { useEffect, useRef } from "react";
import { Crag, Sector } from "../../graphql/generated";
import Accordion from "../ui/accordion";
import CragRoutes from "./crag-routes";

interface Props {
  crag: Crag;
  sector: Sector;
  ascents: Map<string, string>;
  onToggle: () => void;
  isOpen: boolean;
}

function CragSector({ crag, sector, ascents, isOpen, onToggle }: Props) {
  const sectorRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && sectorRef.current) {
      sectorRef.current.scrollIntoView();
    }
  }, [isOpen]);
  return (
    <>
      <div ref={sectorRef} />
      <Accordion
        label={[sector.label, sector.name]
          .filter((part) => part != "")
          .join(" - ")}
        isOpen={isOpen}
        onClick={onToggle}
      >
        <div className="md:mx-4">
          <CragRoutes routes={sector.routes} crag={crag} ascents={ascents} />
        </div>
      </Accordion>
    </>
  );
}

export default CragSector;
