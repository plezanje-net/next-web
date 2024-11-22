"use client";

import { Route, Sector } from "@/graphql/generated";
import { Fragment, useEffect, useState } from "react";
import RouteCard from "./route-card";
import Checkbox from "@/components/ui/checkbox";
import Button from "@/components/ui/button";
import IconMoveRoutes from "@/components/ui/icons/move-routes";
import IconSwitchSector from "@/components/ui/icons/switch-sector";
import IconDelete from "@/components/ui/icons/delete";
import IconReturn from "@/components/ui/icons/return";
import IconPlus from "@/components/ui/icons/plus";
import RouteDialog from "./route-dialog";
import { useRouter } from "next/navigation";
import Link from "@/components/ui/link";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import updateRouteAction from "../server-actions/update-route-action";
import SwitchSectorDialog from "./switch-sector-dialog";

type TEditRoutesProps = {
  routes: Route[];
  cragSlug: string;
  sectorId: string;
  sectors: Sector[];
};

function EditRoutes({ routes, cragSlug, sectorId, sectors }: TEditRoutesProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [sortedRoutes, setSortedRoutes] = useState(routes);
  useEffect(() => {
    setSortedRoutes(routes);
  }, [routes]);

  const [allRoutesSelected, setAllRoutesSelected] = useState(false);
  const [newRouteDialogIsOpen, setNewRouteDialogIsOpen] = useState(false);
  const [checkedRoutes, setCheckedRoutes] = useState<Route[]>([]);
  const [switchSectorDialogIsOpen, setSwitchSectorDialogIsOpen] =
    useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setLoading(true);
      const droppedRouteIndex = sortedRoutes.findIndex(
        (route) => route.id === active.id
      );
      const targetRouteIndex = sortedRoutes.findIndex(
        (route) => route.id === over.id
      );
      const newSortedRoutes = arrayMove(
        sortedRoutes,
        droppedRouteIndex,
        targetRouteIndex
      );
      setSortedRoutes(newSortedRoutes);
      const updatedRouteData = {
        id: sortedRoutes[droppedRouteIndex].id,
        position:
          droppedRouteIndex > targetRouteIndex
            ? sortedRoutes[targetRouteIndex].position
            : sortedRoutes[targetRouteIndex].position + 1,
      };
      await updateRouteAction(updatedRouteData);
      router.refresh();
      setLoading(false);
    }
  };

  const handleAllRoutesSelectedChange = (checked: boolean) => {};

  const handleOnCheckedChange = (checked: boolean, route: Route) => {
    if (checked) {
      setCheckedRoutes([...checkedRoutes, route]);
    } else {
      setCheckedRoutes(checkedRoutes.filter((r) => r !== route));
    }
  };

  return (
    <div className="px-4 xs:px-8">
      {/* actions row */}
      {/* TODO: export to another component? */}
      <div className="flex items-center justify-between my-5">
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

      {/* new route button */}
      <div className="h-12 flex items-stretch mt-5">
        <button
          disabled={false}
          className={`w-full flex justify-end items-center border border-dashed rounded-lg px-4 outline-none focus-visible:ring focus-visible:ring-blue-100  ${loading ? "text-neutral-400 border-neutral-300" : "text-neutral-500 hover:border-neutral-500 hover:text-neutral-600 active:text-neutral-700 active:border-neutral-600 border-neutral-400"}`}
          onClick={() => setNewRouteDialogIsOpen(true)}
        >
          <span className="mr-2">dodaj smer na začetek</span>
          <IconPlus />
        </button>
      </div>

      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
        modifiers={[restrictToParentElement]}
        sensors={sensors}
        id="sort-routes-dnd-context-id"
      >
        <SortableContext items={sortedRoutes}>
          <div>
            {sortedRoutes.map((route) => (
              <Fragment key={route.id}>
                <RouteCard
                  route={route}
                  sectorId={sectorId}
                  disabled={loading}
                  checked={checkedRoutes.includes(route)}
                  onCheckedChange={handleOnCheckedChange}
                />
              </Fragment>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <RouteDialog
        formType="new"
        isOpen={newRouteDialogIsOpen}
        setIsOpen={setNewRouteDialogIsOpen}
        position={0}
        sectorId={sectorId}
      />

      <SwitchSectorDialog
        isOpen={switchSectorDialogIsOpen}
        setIsOpen={setSwitchSectorDialogIsOpen}
        routes={checkedRoutes}
        sectors={sectors.filter((sector) => sector.id != sectorId)}
      />
    </div>
  );
}

export default EditRoutes;
