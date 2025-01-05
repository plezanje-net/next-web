"use client";

import Checkbox from "@/components/ui/checkbox";
import { Sector, User } from "@/graphql/generated";
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import updateSectorAction from "../server-actions/update-sector-action";
import { useRouter } from "next/navigation";
import NewFirstSectorButton from "./new-first-sector-button";
import ConvertToSectorsNoneDialog from "./convert-to-sectors-none-dialog";

type TEditCragSectorsManyProps = {
  sectors: Sector[];
  cragId: string;
  loggedInUserIsEditor: boolean;
  loggedInUser: User | undefined;
};

function EditSectorsMany({
  sectors,
  cragId,
  loggedInUser,
  loggedInUserIsEditor,
}: TEditCragSectorsManyProps) {
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

  const [
    convertToSectorsNoneDialogIsOpen,
    setConvertToSectorsNoneDialogIsOpen,
  ] = useState(false);

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
      {/* Actions row */}
      <div className="h-16 flex items-center">
        <Checkbox
          label="Plezališče ima več sektorjev"
          checked={true}
          disabled={loading}
          onChange={() => setConvertToSectorsNoneDialogIsOpen(true)}
        />
      </div>

      <NewFirstSectorButton cragId={cragId} disabled={loading} />

      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
        modifiers={[restrictToParentElement]}
        sensors={sensors}
        id="sort-sectors-dnd-context-id"
      >
        <SortableContext
          items={sortedSectors}
          strategy={verticalListSortingStrategy}
        >
          <div>
            {/* Dep: sector.label is deprecated. remove after api migrates it to name */}
            {sortedSectors.map((sector) => (
              <Fragment key={sector.id}>
                <SectorCard
                  sector={sector}
                  disabled={loading}
                  onEditClick={() => handleEditSectorClick(sector)}
                  onAddClick={() => handleAddSectorClick(sector.position + 1)}
                  onDeleteClick={() => handleDeleteSectorClick(sector)}
                  loggedInUserIsEditor={loggedInUserIsEditor}
                  loggedInUser={loggedInUser}
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

      <ConvertToSectorsNoneDialog
        isOpen={convertToSectorsNoneDialogIsOpen}
        setIsOpen={setConvertToSectorsNoneDialogIsOpen}
        cragId={cragId}
      />
    </>
  );
}

export default EditSectorsMany;
