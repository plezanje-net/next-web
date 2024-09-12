import Button from "@/components/ui/button";
import IconClose from "@/components/ui/icons/close";
import IconMore from "@/components/ui/icons/more";
import IconSearch from "@/components/ui/icons/search";
import TextField from "@/components/ui/text-field";
import { useRef, useState } from "react";
import ShowMap from "./show-map";
import ToggleFiltersPane from "./toggle-filters-pane";
import SelectColumns from "./select-columns";
import Sort from "./sort";
import { useCragsContext } from "../crags-context";
import { IconSize } from "@/components/ui/icons/icon-size";

function ActionsRow() {
  const { search } = useCragsContext();

  const [searchFocus, setSearchFocus] = useState(false);

  const searchFieldRef = useRef<HTMLInputElement>(null);
  const handleSearchIconClick = () => {
    setSearchFocus(true);

    setTimeout(() => {
      searchFieldRef.current && searchFieldRef.current.focus();
    }, 0);
  };

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
        className={`x-auto relative z-10 mx-auto rotate-0 items-center justify-center border-b border-b-neutral-200 px-4 2xl:container xs:px-8 sm:justify-between md:border-b-0 ${
          searchFocus || search.query ? "block sm:flex" : "flex justify-center"
        }`}
      >
        <div className="flex items-center justify-center py-4 sm:py-5">
          <ShowMap />

          <ToggleFiltersPane />

          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

          <SelectColumns />

          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

          <Sort />

          <div className="flex items-center sm:hidden">
            <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>
            <Button variant="quaternary" onClick={handleSearchIconClick}>
              <IconSearch />
            </Button>
          </div>

          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>
          <Button variant="quaternary">
            <IconMore size={IconSize.regular} />
          </Button>
        </div>

        <div
          className={`min-w-0 sm:ml-8 sm:w-80 ${
            searchFocus || search.query
              ? "mb-6 block sm:mb-0"
              : "hidden sm:block"
          }`}
        >
          <TextField
            ref={searchFieldRef}
            value={search.query}
            onChange={search.setQuery}
            onBlur={() => setSearchFocus(false)}
            prefix={<IconSearch />}
            placeholder="Poišči po imenu"
            aria-label="Poišči po imenu"
            suffix={
              search.query && (
                <Button
                  variant="quaternary"
                  onClick={() => search.setQuery("")}
                >
                  <IconClose />
                </Button>
              )
            }
          />
        </div>
      </div>
    </>
  );
}

export default ActionsRow;
