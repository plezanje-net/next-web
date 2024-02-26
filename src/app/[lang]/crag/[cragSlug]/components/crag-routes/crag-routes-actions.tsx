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
      <div className="flex items-center justify-center py-5">
        <div>
          <Filter />
        </div>
        <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>
        <Columns />
        {!cragRoutesState.noSectors && (
          <>
            <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>
            <CombineSectors />
          </>
        )}
        <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>
        <Sort />
      </div>

      <div
        className={`flex min-w-0 items-center xs:ml-8 xs:w-80 ${
          !cragRoutesState.search?.focus && !cragRoutesState.search?.query
            ? ""
            : "mb-6 xs:mb-0"
        }`}
      >
        {!cragRoutesState.search?.focus && !cragRoutesState.search?.query && (
          <div className="ml-3 h-6 border-l border-neutral-300 pr-3 xs:hidden"></div>
        )}
        <div className="flex-1">
          <Search />
        </div>
      </div>
    </div>
  );
}

export default CragRoutesActions;
