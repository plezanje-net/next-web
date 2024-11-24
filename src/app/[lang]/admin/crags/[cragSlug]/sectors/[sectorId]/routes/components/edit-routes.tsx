"use client";

import { Route, Sector } from "@/graphql/generated";
import { Fragment, useEffect, useState } from "react";
import RouteCard from "./route-card";
import IconPlus from "@/components/ui/icons/plus";
import RouteDialog from "./route-dialog";
import { useRouter } from "next/navigation";
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
import EditRoutesActions from "./edit-routes-actions";

type TEditRoutesProps = {
  routes: Route[];
  cragSlug: string;
  sectorId: string;
  allSectors: Sector[];
};

function EditRoutes({
  routes,
  cragSlug,
  sectorId,
  allSectors,
}: TEditRoutesProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [sortedRoutes, setSortedRoutes] = useState(routes);
  useEffect(() => {
    setSortedRoutes(routes);
  }, [routes]);

  const [newRouteDialogIsOpen, setNewRouteDialogIsOpen] = useState(false);

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

  const [checkedRoutes, setCheckedRoutes] = useState<Route[]>([]);
  const handleOnCheckedChange = (checked: boolean, route: Route) => {
    if (checked) {
      setCheckedRoutes([...checkedRoutes, route]);
    } else {
      setCheckedRoutes(checkedRoutes.filter((r) => r !== route));
    }
  };

  return (
    <div>
      <EditRoutesActions
        allSectors={allSectors}
        sectorId={sectorId}
        cragSlug={cragSlug}
        checkedRoutes={checkedRoutes}
      />

      <div className="px-4 xs:px-8">
        {/* new route button */}
        <div className="h-12 flex items-stretch">
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
      </div>
    </div>
  );
}

export default EditRoutes;
