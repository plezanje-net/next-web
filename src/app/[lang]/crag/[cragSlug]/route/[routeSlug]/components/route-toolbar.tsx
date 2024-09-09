"use client";

import Button from "@/components/ui/button";
import IconAdd from "@/components/ui/icons/add";
import IconLeft from "@/components/ui/icons/left";
import IconMore from "@/components/ui/icons/more";
import IconRight from "@/components/ui/icons/right";
import { Route } from "@/graphql/generated";
import { useRouter } from "next/navigation";

type TRouteToolbarProps = {
  route: Route;
};

function RouteToolbar({ route }: TRouteToolbarProps) {
  const router = useRouter();

  const sectorRoutes = route.sector.routes;
  const routeIndex = sectorRoutes.findIndex((r) => r.id === route.id);
  const previousRoute = sectorRoutes[routeIndex - 1] ?? null;
  const nextRoute = sectorRoutes[routeIndex + 1] ?? null;

  return (
    <div className="border-b border-b-neutral-200">
      <div className="mx-auto flex items-center justify-between px-4 py-3 2xl:container xs:px-8">
        <div className="flex items-center">
          <Button variant="quaternary">
            <span className="flex">
              <IconAdd />
              <span className="ml-2 max-md:hidden">Dodaj vzpon</span>
            </span>
          </Button>
          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>
          <Button variant="quaternary">
            <IconMore />
          </Button>
        </div>
        <div className="flex items-center">
          {previousRoute && (
            <Button
              variant="quaternary"
              onClick={() =>
                router.push(
                  `/plezalisce/${route.crag.slug}/smer/${previousRoute.slug}`
                )
              }
            >
              <span className="flex">
                <IconLeft />
                <span className="max-w-16 xs:max-w-32 sm:max-w-52	 ml-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  {previousRoute.name}
                </span>
              </span>
            </Button>
          )}
          {previousRoute && nextRoute && (
            <div className="ml-4 h-6 border-l border-neutral-300 pr-4"></div>
          )}
          {nextRoute && (
            <Button
              variant="quaternary"
              onClick={() =>
                router.push(
                  `/plezalisce/${route.crag.slug}/smer/${nextRoute.slug}`
                )
              }
            >
              <span className="flex">
                <span className="max-w-16 xs:max-w-32 sm:max-w-52	 mr-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  {nextRoute.name}
                </span>
                <IconRight />
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RouteToolbar;
