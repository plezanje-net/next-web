"use client";

import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import IconRoutes from "@/components/ui/icons/routes";
import { Sector } from "@/graphql/generated";
import { usePathname, useRouter } from "next/navigation";
import ConvertToSectorsManyDialog from "./convert-to-sectors-many-dialog";
import { useState } from "react";

type TEditSectorsNoneProps = {
  dummySector: Sector;
};

function EditSectorsNone({ dummySector }: TEditSectorsNoneProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [
    convertToSectorsManyDialogIsOpen,
    setConvertToSectorsManyDialogIsOpen,
  ] = useState(false);

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

        <Button
          variant="quaternary"
          onClick={() => {
            router.push(`${pathname}/${dummySector.id}/smeri`);
          }}
        >
          <span className="flex">
            <IconRoutes />
            <span className="ml-2">Uredi smeri</span>
          </span>
        </Button>
      </div>

      <ConvertToSectorsManyDialog
        isOpen={convertToSectorsManyDialogIsOpen}
        setIsOpen={setConvertToSectorsManyDialogIsOpen}
        sector={dummySector}
      />
    </>
  );
}

export default EditSectorsNone;
