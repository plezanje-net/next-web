"use client";
// import Button from "@/components/ui/button";
// import IconClose from "@/components/ui/icons/close";
// import IconMore from "@/components/ui/icons/more";
// import IconSearch from "@/components/ui/icons/search";
// import TextField from "@/components/ui/text-field";
// import { useRef, useState } from "react";
// import ShowMap from "./show-map";
// import ToggleFiltersPane from "./toggle-filters-pane";
import SelectColumns from "./select-columns";
// import Sort from "./sort";

function ActionsRow() {
  return (
    <>
      {/* Actions row */}
      {/* 
        for <sm: all icons, including search are displayed centered.
        for >=sm: search icon becomes search text field and sticks right, all other icons stick left
        for <md: filter pane is triggered by filter icon
        for >=md: filter pane is always visible, filter icon dissapears
      */}

      <div
        className="x-auto relative z-10 mx-auto rotate-0 items-center border-b border-b-neutral-200 px-4 2xl:container xs:px-8 sm:justify-between md:border-b-0 flex justify-center"
      >
        <div className="flex items-center justify-center py-4 sm:py-5">

          {/* <ToggleFiltersPane /> */}

          {/* <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div> */}

          <SelectColumns />

          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

          {/* <Sort /> */}
        </div>
      </div>
    </>
  );
}

export default ActionsRow;
