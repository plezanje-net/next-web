"use client";

import Checkbox from "@/components/ui/checkbox";
import IconPlus from "@/components/ui/icons/plus";
import { Sector } from "@/graphql/generated";
import SectorCard from "./sector-card";
import { useState } from "react";
import SectorDialog from "./sector-dialog";
import DeleteSectorDialog from "./delete-sector-dialog";

type TEditCragSectorsManyProps = {
  sectors: Sector[];
  cragId: string;
};

function EditSectorsMany({ sectors, cragId }: TEditCragSectorsManyProps) {
  const handleCragHasSectorsChange = () => {};

  const [sectorDialogType, setSectorDialogType] = useState<"new" | "edit">();
  const [sectorDialogIsOpen, setSectorDialogIsOpen] = useState(false);
  const [position, setPosition] = useState(0);
  const [sector, setSector] = useState<Sector>(sectors[0]);

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

  const [deleteSectorDialogIsOpen, setDeleteSectorDialogIsOpen] =
    useState(false);
  const handleDeleteSectorClick = (sector: Sector) => {
    setSector(sector);
    setDeleteSectorDialogIsOpen(true);
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
            onEditClick={() => handleEditSectorClick(sector)}
            onAddClick={() => handleAddSectorClick(sector.position + 1)}
            onDeleteClick={() => handleDeleteSectorClick(sector)}
          />
        </div>
      ))}

      {sectorDialogType === "new" ? (
        <SectorDialog
          formType="new"
          isOpen={sectorDialogIsOpen}
          setIsOpen={setSectorDialogIsOpen}
          position={position}
          cragId={cragId}
        />
      ) : (
        <SectorDialog
          formType="edit"
          isOpen={sectorDialogIsOpen}
          setIsOpen={setSectorDialogIsOpen}
          sector={sector}
        />
      )}

      <DeleteSectorDialog
        isOpen={deleteSectorDialogIsOpen}
        setIsOpen={setDeleteSectorDialogIsOpen}
        sector={sector}
      />
    </>
  );
}

export default EditSectorsMany;
