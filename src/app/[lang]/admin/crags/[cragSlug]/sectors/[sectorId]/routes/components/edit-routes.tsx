"use client";

import { Crag, Route, Sector } from "@/graphql/generated";
import { Fragment, useEffect, useState } from "react";
import RouteCard from "./route-card/route-card";
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import updateRouteAction from "../lib/update-route-action";
import EditRoutesActions from "./edit-routes-actions";
import NewFirstRouteButton from "./new-first-route-button";
import { useAuthContext } from "@/lib/auth/auth-context";

type TEditRoutesProps = {
  routes: Route[];
  crag: Crag;
  sector: Sector;
  allSectors: Sector[];
};

function EditRoutes({ routes, crag, sector, allSectors }: TEditRoutesProps) {
  const { currentUser } = useAuthContext();

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

  const handleCheckAll = () => {
    if (
      checkedRouteIds.length ===
      sortedRoutes.filter(
        (route) =>
          currentUser?.roles.includes("admin") ||
          route.publishStatus === "draft"
      ).length
    ) {
      setCheckedRouteIds([]);
    } else {
      setCheckedRouteIds(
        sortedRoutes
          .filter(
            (route) =>
              currentUser?.roles.includes("admin") ||
              route.publishStatus === "draft"
          )
          .map((route) => route.id)
      );
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
    <div className="2xl:container mx-auto">
      <EditRoutesActions
        allSectors={allSectors}
        sector={sector}
        crag={crag}
        checkedRoutes={sortedRoutes.filter((route) =>
          checkedRouteIds.includes(route.id)
        )}
        allRoutes={sortedRoutes}
        onCheckAll={handleCheckAll}
      />

      <div className="px-4 xs:px-8 relative">
        <NewFirstRouteButton sectorId={sector.id} disabled={loading} />
      </div>

      <div className="px-4 xs:px-8">
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
          modifiers={[restrictToParentElement]}
          sensors={sensors}
          id="sort-routes-dnd-context-id"
        >
          <SortableContext
            items={sortedRoutes}
            strategy={verticalListSortingStrategy}
          >
            <div>
              {sortedRoutes.map((route) => (
                <Fragment key={route.id}>
                  <RouteCard
                    route={route}
                    sectorId={sector.id}
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
    </div>
  );
}

export default EditRoutes;
