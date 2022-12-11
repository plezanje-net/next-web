import { useRouter } from "next/router";
import { useState } from "react";
import { Sector } from "../../graphql/generated";
import Accordion from "../ui/accordion";

interface Props {
  sector: Sector;
  onToggle: () => void;
  isOpen: boolean;
}

function CragSector({ sector, isOpen, onToggle }: Props) {
  return (
    <Accordion
      label={[sector.label, sector.name]
        .filter((part) => part != "")
        .join(" - ")}
      isOpen={isOpen}
      onClick={onToggle}
    >
      {sector.routes.map((route) => (
        <div key={route.id} className="px-4 py-5">
          {route.name}
        </div>
      ))}
    </Accordion>
  );
}

export default CragSector;
