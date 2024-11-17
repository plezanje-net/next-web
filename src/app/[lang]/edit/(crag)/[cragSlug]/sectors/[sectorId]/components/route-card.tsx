"use client";

import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import IconDelete from "@/components/ui/icons/delete";
import IconDrag from "@/components/ui/icons/drag";
import IconEdit from "@/components/ui/icons/edit";
import IconPlus from "@/components/ui/icons/plus";
import { Route } from "@/graphql/generated";
import { difficultyToGrade } from "@/utils/grade-helpers";
import { useState } from "react";

type TRouteCardProps = {
  route: Route;
};

function RouteCard({ route }: TRouteCardProps) {
  const [checked, setChecked] = useState(false);

  const grade = difficultyToGrade(
    route.difficulty || null,
    route.defaultGradingSystem.id
  );

  return (
    <div className="bg-neutral-100 rounded-lg flex mt-2 md:gap-2 md:items-center flex-col md:flex-row">
      {/* drag handle, checkbox, name, grade, length and other info if space allows */}
      <div className="flex flex-1 items-center px-4 py-2">
        <div>
          <Button disabled={false} variant="quaternary">
            <IconDrag />
          </Button>
        </div>
        <div className="ml-4">
          <Checkbox
            label={route.name}
            hideLabel
            checked={checked}
            onChange={setChecked}
          />
        </div>

        <div className="ml-4 flex-1 md:max-w-80 truncate">{route.name}</div>
        <div className="ml-4 min-w-10 lg:min-w-30">{grade?.name}</div>
        <div className="ml-4 min-w-12 text-right md:text-left">
          {route.length} m
        </div>
      </div>

      {/* actions */}
      <div className="flex items-center justify-end border-t border-neutral-200 md:border-none px-4 py-2">
        {/* edit */}
        <Button variant="quaternary" disabled={false}>
          <IconEdit />
        </Button>

        {/* divider */}
        <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

        {/* delete */}
        <Button variant="quaternary" disabled={false}>
          <IconDelete />
        </Button>

        {/* divider */}
        <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

        {/* add sector */}
        <Button variant="quaternary" disabled={false}>
          <IconPlus />
        </Button>
      </div>
    </div>
  );
}

export default RouteCard;
