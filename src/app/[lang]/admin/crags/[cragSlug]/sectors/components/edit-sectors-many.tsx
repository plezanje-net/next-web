"use client";

import Checkbox from "@/components/ui/checkbox";
import IconPlus from "@/components/ui/icons/plus";
import { Sector } from "@/graphql/generated";
import SectorCard from "./sector-card";
import { Fragment, useEffect, useState } from "react";
import SectorDialog from "./sector-dialog";
import DeleteSectorDialog from "./delete-sector-dialog";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import updateSectorAction from "../server-actions/update-sector-action";
import { useRouter } from "next/navigation";

type TEditCragSectorsManyProps = {
  sectors: Sector[];
  cragId: string;
};

function EditSectorsMany({ sectors, cragId }: TEditCragSectorsManyProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [sectorDialogType, setSectorDialogType] = useState<"new" | "edit">();
  const [sectorDialogIsOpen, setSectorDialogIsOpen] = useState(false);
  const [position, setPosition] = useState(0);
  const [sector, setSector] = useState<Sector>(sectors[0]);
  const [sortedSectors, setSortedSectors] = useState(sectors);
  useEffect(() => {
    setSortedSectors(sectors);
  }, [sectors]);

  const handleCragHasSectorsChange = () => {};

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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLoading(true);

      const droppedSectorIndex = sortedSectors.findIndex(
        (sector) => sector.id === active.id
      );
      const targetSectorIndex = sortedSectors.findIndex(
        (sector) => sector.id === over.id
      );

      const newSortedSectors = arrayMove(
        sortedSectors,
        droppedSectorIndex,
        targetSectorIndex
      );

      setSortedSectors(newSortedSectors);

      const updatedSectorData = {
        id: sortedSectors[droppedSectorIndex].id,
        position:
          droppedSectorIndex > targetSectorIndex
            ? sortedSectors[targetSectorIndex].position
            : sortedSectors[targetSectorIndex].position + 1,
      };

      await updateSectorAction(updatedSectorData);
      router.refresh();
      setLoading(false);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
      <Checkbox
        label="Plezališče ima več sektorjev"
        checked={true}
        disabled={loading}
        onChange={handleCragHasSectorsChange}
      />

      <div className="h-18 flex items-stretch mt-5">
        <button
          disabled={loading}
          className={`w-full flex justify-end items-center border border-dashed rounded-lg px-4 outline-none focus-visible:ring focus-visible:ring-blue-100  ${loading ? "text-neutral-400 border-neutral-300" : "text-neutral-500 hover:border-neutral-500 hover:text-neutral-600 active:text-neutral-700 active:border-neutral-600 border-neutral-400"}`}
          onClick={() => handleAddSectorClick(0)}
        >
          <span className="mr-2">dodaj sektor na začetek</span>
          <IconPlus />
        </button>
      </div>

      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
        modifiers={[restrictToParentElement]}
        sensors={sensors}
        id="sort-sectors-dnd-context-id"
      >
        <SortableContext items={sortedSectors}>
          <div>
            {/* Dep: sector.label is deprecated. remove after api migrates it to name */}
            {sortedSectors.map((sector) => (
              <Fragment key={sector.id}>
                <SectorCard
                  id={sector.id}
                  name={`${sector.label} - ${sector.name}`}
                  disabled={loading}
                  onEditClick={() => handleEditSectorClick(sector)}
                  onAddClick={() => handleAddSectorClick(sector.position + 1)}
                  onDeleteClick={() => handleDeleteSectorClick(sector)}
                />
              </Fragment>
            ))}
          </div>
        </SortableContext>
      </DndContext>

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
