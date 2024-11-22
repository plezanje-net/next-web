"use client";

import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import IconRoutes from "@/components/ui/icons/routes";

function EditSectorsNone() {
  const handleCragHasSectorsChange = () => {};
  const handleEditRoutesButtonClick = () => {};

  return (
    <div className="w-full flex justify-between flex-wrap gap-4">
      <Checkbox
        label="Plezališče ima več sektorjev"
        checked={false}
        onChange={handleCragHasSectorsChange}
      />

      <Button variant="quaternary" onClick={handleEditRoutesButtonClick}>
        <span className="flex">
          <IconRoutes />
          <span className="ml-2">Uredi smeri</span>
        </span>
      </Button>
    </div>
  );
}

export default EditSectorsNone;
