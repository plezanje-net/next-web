"use client";

import { Route, Sector } from "@/graphql/generated";
import { Fragment, useEffect, useState } from "react";
import RouteCard from "./route-card";
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
import NewFirstRouteButton from "./new-first-route-button";

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

  const [checkedRouteIds, setCheckedRouteIds] = useState<string[]>([]);
  const handleOnCheckedChange = (checked: boolean, routeId: string) => {
    if (checked) {
      setCheckedRouteIds([...checkedRouteIds, routeId]);
    } else {
      setCheckedRouteIds(checkedRouteIds.filter((rId) => rId !== routeId));
    }
  };

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

  return (
    <>
      <EditRoutesActions
        allSectors={allSectors}
        sectorId={sectorId}
        cragSlug={cragSlug}
        checkedRoutes={sortedRoutes.filter((route) =>
          checkedRouteIds.includes(route.id)
        )}
        allRoutes={sortedRoutes}
      />

      <div className="px-4 xs:px-8 relative">
        <NewFirstRouteButton sectorId={sectorId} disabled={loading} />
      </div>

      <div className="px-4 xs:px-8">
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
                    checked={checkedRouteIds.includes(route.id)}
                    onCheckedChange={handleOnCheckedChange}
                  />
                </Fragment>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
}

export default EditRoutes;
