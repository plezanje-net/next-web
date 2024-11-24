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
import MoveRoutesDialog from "./move-routes-dialog";

type TEditRoutesActionsProps = {
  cragSlug: string;
  sectorId: string;
  checkedRoutes: Route[];
  allSectors: Sector[];
  allRoutes: Route[];
};

function EditRoutesActions({
  allSectors,
  sectorId,
  cragSlug,
  checkedRoutes,
  allRoutes,
}: TEditRoutesActionsProps) {
  const router = useRouter();

  // TODO: wire up check all checkbox
  const [allRoutesChecked, setAllRoutesChecked] = useState(false);
  const handleAllRoutesCheckedChange = (checked: boolean) => {};

  const [moveRoutesDialogIsOpen, setMoveRoutesDialogIsOpen] = useState(false);
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
        className={`px-4 xs:px-8 flex items-center justify-between top-0 sticky py-4 bg-white ${sticky ? "shadow-lg z-10" : ""}`}
      >
        {/* check all */}
        <div className="flex items-center">
          <Checkbox
            checked={allRoutesChecked}
            onChange={handleAllRoutesCheckedChange}
            label="Označi vse"
            hideLabel="max-xs:sr-only"
          />

          {/* divider */}
          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

          {/* change position of all checked routes */}
          <Button
            variant="quaternary"
            onClick={() => setMoveRoutesDialogIsOpen(true)}
          >
            <span className="flex">
              <IconMoveRoutes />
              <span className="ml-2 hidden lg:block">Premakni</span>
            </span>
          </Button>

          {/* divider */}
          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

          {/* move checked routes into another sector */}
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

          {/* delete checked routes */}
          <Button variant="quaternary">
            <span className="flex">
              <IconDelete />
              <span className="ml-2 hidden lg:block">Izbriši</span>
            </span>
          </Button>
        </div>

        {/* back to crag sectors */}
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

      <MoveRoutesDialog
        isOpen={moveRoutesDialogIsOpen}
        setIsOpen={setMoveRoutesDialogIsOpen}
        routes={checkedRoutes}
        targetRoutes={allRoutes.filter(
          (route) =>
            !checkedRoutes.find((checkedRoute) => checkedRoute.id == route.id)
        )}
      />

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
