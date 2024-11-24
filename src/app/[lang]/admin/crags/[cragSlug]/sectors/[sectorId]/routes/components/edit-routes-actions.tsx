import IconMoveRoutes from "@/components/ui/icons/move-routes";
import { Route, Sector } from "@/graphql/generated";
import { useRef, useState } from "react";
import Checkbox from "@/components/ui/checkbox";
import Button from "@/components/ui/button";
import IconSwitchSector from "@/components/ui/icons/switch-sector";
import IconDelete from "@/components/ui/icons/delete";
import IconReturn from "@/components/ui/icons/return";
import { useRouter } from "next/navigation";
import SwitchSectorDialog from "./switch-sector-dialog";
import useIsVisible from "@/hooks/useIsVisible";

type TEditRoutesActionsProps = {
  cragSlug: string;
  sectorId: string;
  checkedRoutes: Route[];
  allSectors: Sector[];
};

function EditRoutesActions({
  allSectors,
  sectorId,
  cragSlug,
  checkedRoutes,
}: TEditRoutesActionsProps) {
  const router = useRouter();

  const [allRoutesSelected, setAllRoutesSelected] = useState(false);
  const handleAllRoutesSelectedChange = (checked: boolean) => {};

  const [switchSectorDialogIsOpen, setSwitchSectorDialogIsOpen] =
    useState(false);

  const dummyRef = useRef(null);
  const sticky = !useIsVisible(dummyRef, true);

  return (
    <>
      {/* A dummy div, for detecting when the 'stickiness' of the actions row starts (when this div dissapears from view) */}
      <div ref={dummyRef}></div>

      {/* actions row */}
      <div
        className={`px-4 xs:px-8 flex items-center justify-between py-4 sticky top-0 bg-white ${sticky ? "shadow-lg" : ""}`}
      >
        <div className="flex items-center">
          <Checkbox
            checked={allRoutesSelected}
            onChange={handleAllRoutesSelectedChange}
            label="Označi vse"
            hideLabel="max-xs:sr-only"
          />

          {/* divider */}
          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

          <Button variant="quaternary">
            <span className="flex">
              <IconMoveRoutes />
              <span className="ml-2 hidden lg:block">Premakni</span>
            </span>
          </Button>

          {/* divider */}
          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

          <Button
            variant="quaternary"
            onClick={() => setSwitchSectorDialogIsOpen(true)}
          >
            <span className="flex">
              <IconSwitchSector />
              <span className="ml-2 hidden lg:block">
                Premakni v drug sektor
              </span>
            </span>
          </Button>

          {/* divider */}
          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

          <Button variant="quaternary">
            <span className="flex">
              <IconDelete />
              <span className="ml-2 hidden lg:block">Izbriši</span>
            </span>
          </Button>
        </div>
        <div>
          <Button
            variant="quaternary"
            onClick={() =>
              router.push(`/urejanje/plezalisca/${cragSlug}/sektorji`)
            }
          >
            <span className="flex">
              <IconReturn />
              <span className="ml-2 hidden lg:block">Nazaj na sektorje</span>
            </span>
          </Button>
        </div>
      </div>

      <SwitchSectorDialog
        isOpen={switchSectorDialogIsOpen}
        setIsOpen={setSwitchSectorDialogIsOpen}
        routes={checkedRoutes}
        targetSectors={allSectors.filter((sector) => sector.id != sectorId)}
      />
    </>
  );
}

export default EditRoutesActions;
