"use client";

import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import IconRoutes from "@/components/ui/icons/routes";
import { Crag, Sector } from "@/graphql/generated";
import { usePathname, useRouter } from "next/navigation";
import ConvertToSectorsManyDialog from "./convert-to-sectors-many-dialog";
import { useState } from "react";
import createSectorAction from "../server-actions/create-sector-action";

type TEditSectorsNoneProps = {
  dummySector: Sector | null;
  crag: Crag;
};

function EditSectorsNone({ dummySector, crag }: TEditSectorsNoneProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [
    convertToSectorsManyDialogIsOpen,
    setConvertToSectorsManyDialogIsOpen,
  ] = useState(false);

  const handleEditRoutesClick = async () => {
    // We have two cases here:
    // 1. Crag has no sector -> a new dummy sector has to be created. then redirect to the routes page.
    // 2. Crag has a (nameless) dummy sector -> just redirect to the routes page.
    if (dummySector === null) {
      const newSectorData = {
        name: "",
        label: "",
        cragId: crag.id,
        position: 0,
        publishStatus: crag.publishStatus,
      };
      const newDummySector = await createSectorAction(newSectorData);

      router.push(`${pathname}/${newDummySector.id}/smeri`);
    } else {
      router.push(`${pathname}/${dummySector.id}/smeri`);
    }
  };

  return (
    <>
      {/* Actions row */}
      <div className="w-full flex justify-between flex-wrap gap-4 items-center py-4">
        <div className="py-1">
          <Checkbox
            label="Plezališče ima več sektorjev"
            checked={false}
            onChange={() => setConvertToSectorsManyDialogIsOpen(true)}
          />
        </div>

        <Button variant="quaternary" onClick={handleEditRoutesClick}>
          <span className="flex">
            <IconRoutes />
            <span className="ml-2">Uredi smeri</span>
          </span>
        </Button>
      </div>

      <ConvertToSectorsManyDialog
        isOpen={convertToSectorsManyDialogIsOpen}
        setIsOpen={setConvertToSectorsManyDialogIsOpen}
        dummySector={dummySector}
        crag={crag}
      />
    </>
  );
}

export default EditSectorsNone;
