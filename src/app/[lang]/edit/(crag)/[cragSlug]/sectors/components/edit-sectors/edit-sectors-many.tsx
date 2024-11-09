"use client";

import Checkbox from "@/components/ui/checkbox";
import IconPlus from "@/components/ui/icons/plus";
import { Sector } from "@/graphql/generated";
import SectorCard from "./sector-card";
import { useState } from "react";
import SectorDialog from "./sector-dialog";

type TEditCragSectorsManyProps = {
  sectors: Sector[];
  cragId: string;
};

function EditSectorsMany({ sectors, cragId }: TEditCragSectorsManyProps) {
  const handleCragHasSectorsChange = () => {};

  const [sectorDialogType, setSectorDialogType] = useState<"edit" | "new">(
    "new"
  );
  const [sectorDialogIsOpen, setSectorDialogIsOpen] = useState(false);
  const [position, setPosition] = useState<number>();
  const [sector, setSector] = useState<Sector>();

  const handleAddSectorClick = (position: number) => {
    setSectorDialogType("new");
    setPosition(position);
    setSectorDialogIsOpen(true);
  };

  const handleEditSectorClick = (sector: Sector) => {
    setSectorDialogType("edit");
    setSector(sector);
    setSectorDialogIsOpen(true);
  };

  return (
    <>
      <Checkbox
        label="Plezališče ima več sektorjev"
        checked={true}
        onChange={handleCragHasSectorsChange}
      />

      <div className="h-18 flex items-stretch mt-5">
        <button
          className="w-full flex justify-end items-center border-neutral-400 border border-dashed rounded-lg px-4  text-neutral-500 outline-none focus-visible:ring focus-visible:ring-blue-100 hover:border-neutral-500 hover:text-neutral-600 active:text-neutral-700 active:border-neutral-600"
          onClick={() => handleAddSectorClick(0)}
        >
          <span className="mr-2">dodaj sektor na začetek</span>
          <IconPlus />
        </button>
      </div>

      {/* Dep: sector.label is deprecated. remove after api migrates it to name */}
      {sectors.map((sector) => (
        <div key={sector.id} className="mt-2">
          <SectorCard
            name={`${sector.label} - ${sector.name}`}
            onEditSectorClick={() => handleEditSectorClick(sector)}
            onAddSectorClick={() => handleAddSectorClick(sector.position + 1)}
          />
        </div>
      ))}

      <SectorDialog
        formType={sectorDialogType}
        isOpen={sectorDialogIsOpen}
        setIsOpen={setSectorDialogIsOpen}
        position={position}
        cragId={cragId}
        sector={sector}
      />
    </>
  );
}

export default EditSectorsMany;
