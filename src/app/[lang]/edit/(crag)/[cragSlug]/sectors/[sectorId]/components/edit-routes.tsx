"use client";

import { Route } from "@/graphql/generated";
import { Fragment, useState } from "react";
import RouteCard from "./route-card";
import Checkbox from "@/components/ui/checkbox";
import Button from "@/components/ui/button";
import IconMoveRoutes from "@/components/ui/icons/move-routes";
import IconSwitchSector from "@/components/ui/icons/switch-sector";
import IconDelete from "@/components/ui/icons/delete";
import IconReturn from "@/components/ui/icons/return";
import IconPlus from "@/components/ui/icons/plus";

type TEditRoutesProps = {
  routes: Route[];
};

function EditRoutes({ routes }: TEditRoutesProps) {
  const [allRoutesSelected, setAllRoutesSelected] = useState(false);

  const handleAllRoutesSelectedChange = (checked: boolean) => {};

  const loading = false;

  const handleAddRouteClick = (position: number) => {};

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

          <Button variant="quaternary">
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
          <Button variant="quaternary">
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
          onClick={() => handleAddRouteClick(0)}
        >
          <span className="mr-2">dodaj smer na začetek</span>
          <IconPlus />
        </button>
      </div>

      {routes.map((route) => (
        <Fragment key={route.id}>
          <RouteCard route={route} />
        </Fragment>
      ))}
    </div>
  );
}

export default EditRoutes;
