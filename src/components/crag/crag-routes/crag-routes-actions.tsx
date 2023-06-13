import Filter from "./crag-routes-actions/filter";
import Columns from "./crag-routes-actions/columns";
import CombineSectors from "./crag-routes-actions/combine-sectors";
import Sort from "./crag-routes-actions/sort";
import Search from "./crag-routes-actions/search";

function CragRoutesActions() {
  return (
    <div className="mx-auto 2xl:container">
      {/* outer wrap, to center actions */}
      <div className="my-4 mx-8 flex h-11 justify-center py-px xs:block">
        {/* middle wrap: left: other actions, right: search */}
        <div className="flex items-center xs:justify-between xs:gap-8">
          <div className="flex items-center">
            {/* Action: Filter */}
            <div className="flex pr-4">
              <Filter />
            </div>

            {/* Action: Columns */}
            <div className="flex border-l border-l-neutral-300 px-4">
              <Columns />
            </div>

            {/* Action: Combine/Uncombine sectors */}
            <div className="flex border-l border-l-neutral-300 px-4">
              <CombineSectors />
            </div>

            {/* Action: Sort */}
            <div className="flex border-l border-l-neutral-300 px-4">
              <Sort />
            </div>
          </div>

          {/* Action: Search  */}
          <div className="min-w-0 max-xs:border-l max-xs:border-l-neutral-300 max-xs:pl-4 xs:w-80">
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CragRoutesActions;
