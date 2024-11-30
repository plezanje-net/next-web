"use client";

import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import IconRoutes from "@/components/ui/icons/routes";
import { Sector } from "@/graphql/generated";
import { usePathname, useRouter } from "next/navigation";

type TEditSectorsNoneProps = {
  dummySector: Sector;
};

function EditSectorsNone({ dummySector }: TEditSectorsNoneProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleCragHasSectorsChange = () => {};

  return (
    <div className="w-full flex justify-between flex-wrap gap-4">
      <Checkbox
        label="Plezališče ima več sektorjev"
        checked={false}
        onChange={handleCragHasSectorsChange}
      />

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
  );
}

export default EditSectorsNone;
