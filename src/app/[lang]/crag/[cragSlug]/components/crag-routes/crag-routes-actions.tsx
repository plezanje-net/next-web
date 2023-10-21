import Filter from "./crag-routes-actions/filter";
import Columns from "./crag-routes-actions/columns";
import CombineSectors from "./crag-routes-actions/combine-sectors";
import Sort from "./crag-routes-actions/sort";
import Search from "./crag-routes-actions/search";
import { useContext } from "react";
import { CragRoutesContext } from "../crag-routes";

function CragRoutesActions() {
  const { cragRoutesState } = useContext(CragRoutesContext);

  return (
    <div
      className={`mx-auto rotate-0 items-center px-4 2xl:container xs:justify-between xs:px-8 ${
        cragRoutesState.search?.focus || cragRoutesState.search?.query
          ? "block xs:flex"
          : "flex justify-center"
      }`}
    >
      <div className="flex justify-center py-6">
        <div>
          <Filter />
        </div>

        <div className="ml-4 border-l border-neutral-300 pl-4">
          <Columns />
        </div>

        {!cragRoutesState.noSectors && (
          <div className="ml-4 border-l border-neutral-300 pl-4">
            <CombineSectors />
          </div>
        )}

        <div className="ml-4 border-l border-neutral-300 pl-4">
          <Sort />
        </div>
      </div>

      <div
        className={`min-w-0 xs:ml-8 xs:w-80 xs:border-none ${
          !cragRoutesState.search?.focus && !cragRoutesState.search?.query
            ? "ml-4 border-l border-neutral-300 pl-4"
            : "mb-6 xs:mb-0"
        }`}
      >
        <Search />
      </div>
    </div>
  );
}

export default CragRoutesActions;
