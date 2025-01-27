"use client";
import { useState } from "react";
import Filter, { TAscentListFilter } from "./filter";
import SelectColumns from "./select-columns";
import Sort from "./sort";

type TActionsRowProps = {
  filterValues: TAscentListFilter;
};

function ActionsRow({ filterValues }: TActionsRowProps) {
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);

  return (
    <>
      {/* Actions row */}
      {/* 
        for <sm: all icons, including search are displayed centered.
        for >=sm: search icon becomes search text field and sticks right, all other icons stick left
        for <md: filter pane is triggered by filter icon
        for >=md: filter pane is always visible, filter icon dissapears
      */}

      <div className="x-auto mx-auto rotate-0 items-center border-b border-b-neutral-200 px-4 2xl:container xs:px-8 sm:justify-between md:border-b-0 flex justify-center">
        <div className="flex items-center justify-center py-4 sm:py-5">
          <div>
            <Filter
              filterValues={filterValues}
              isOpen={isFiltersDialogOpen}
              setIsOpen={setIsFiltersDialogOpen}
            />
          </div>

          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

          <SelectColumns />

          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

          <Sort />
        </div>
      </div>
    </>
  );
}

export default ActionsRow;
