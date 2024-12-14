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
import DeleteRoutesDialog from "./delete-routes-dialog";
import IconMergeRoutes from "@/components/ui/icons/merge-routes";
import MergeRoutesDialog from "./merge-routes-dialog";
import ConvertToSectorsManyDialog from "../../../components/convert-to-sectors-many-dialog";

type TEditRoutesActionsProps = {
  cragSlug: string;
  sector: Sector;
  checkedRoutes: Route[];
  allSectors: Sector[];
  allRoutes: Route[];
  onCheckAll: () => void;
  loggedInUserIsEditor: boolean;
};

function EditRoutesActions({
  allSectors,
  sector,
  cragSlug,
  checkedRoutes,
  allRoutes,
  onCheckAll,
  loggedInUserIsEditor,
}: TEditRoutesActionsProps) {
  const router = useRouter();

  const [moveRoutesDialogIsOpen, setMoveRoutesDialogIsOpen] = useState(false);
  const [switchSectorDialogIsOpen, setSwitchSectorDialogIsOpen] =
    useState(false);
  const [mergeRoutesDialogIsOpen, setMergeRoutesDialogIsOpen] = useState(false);
  const [deleteRoutesDialogIsOpen, setDeleteRoutesDialogIsOpen] =
    useState(false);
  const [
    convertToSectorsManyDialogIsOpen,
    setConvertToSectorsManyDialogIsOpen,
  ] = useState(false);

  const dummyRef = useRef(null);
  const sticky = !useIsVisible(dummyRef, true);

  const noSectorsCrag =
    allSectors.length === 1 && sector.name === "" && sector.label === "";

  return (
    <>
      {/* A dummy div, for detecting when the 'stickiness' of the actions row starts (when this div dissapears from view) */}
      <div ref={dummyRef}></div>

      {/* actions row */}
      <div
        className={`px-4 xs:px-8 flex items-center justify-between top-0 sticky h-16 bg-white ${sticky ? "shadow-lg z-10" : ""}`}
      >
        {/* check all */}
        <div className="flex items-center">
          <Checkbox
            checked={checkedRoutes.length > 0}
            indeterminate={
              checkedRoutes.length <
              allRoutes.filter(
                (route) =>
                  loggedInUserIsEditor || route.publishStatus === "draft"
              ).length
            }
            onChange={onCheckAll}
            label="Označi vse"
            hideLabel="max-xs:sr-only"
          />

          {checkedRoutes.length > 0 && (
            <>
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
            </>
          )}

          {/* move checked routes into another sector */}
          {checkedRoutes.length > 0 && allSectors.length > 1 && (
            <>
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
            </>
          )}

          {/* merge two routes */}
          {checkedRoutes.length == 2 && (
            <>
              {/* divider */}
              <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

              <Button
                variant="quaternary"
                onClick={() => setMergeRoutesDialogIsOpen(true)}
              >
                <span className="flex">
                  <IconMergeRoutes />
                  <span className="ml-2 hidden lg:block">Združi</span>
                </span>
              </Button>
            </>
          )}

          {checkedRoutes.length > 0 && (
            <>
              {/* divider */}
              <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

              {/* delete checked routes */}
              <Button
                variant="quaternary"
                onClick={() => setDeleteRoutesDialogIsOpen(true)}
              >
                <span className="flex">
                  <IconDelete />
                  <span className="ml-2 hidden lg:block">Izbriši</span>
                </span>
              </Button>
            </>
          )}
        </div>

        {/* back to crag sectors or make into crag with sectors */}
        <div>
          {noSectorsCrag ? (
            <Checkbox
              label="Plezališče ima več sektorjev"
              checked={false}
              onChange={() => setConvertToSectorsManyDialogIsOpen(true)}
            />
          ) : (
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
          )}
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
        targetSectors={allSectors.filter((s) => s.id != sector.id)}
      />

      <MergeRoutesDialog
        isOpen={mergeRoutesDialogIsOpen}
        setIsOpen={setMergeRoutesDialogIsOpen}
        routes={checkedRoutes}
      />

      <DeleteRoutesDialog
        isOpen={deleteRoutesDialogIsOpen}
        setIsOpen={setDeleteRoutesDialogIsOpen}
        routes={checkedRoutes}
      />

      <ConvertToSectorsManyDialog
        isOpen={convertToSectorsManyDialogIsOpen}
        setIsOpen={setConvertToSectorsManyDialogIsOpen}
        sector={sector}
      />
    </>
  );
}

export default EditRoutesActions;
