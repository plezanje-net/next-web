import { useState } from "react";
import Columns from "../../components/crag/crag-routes/crag-routes-actions/columns";
import CombineSectors from "../../components/crag/crag-routes/crag-routes-actions/combine-sectors";
import Filter from "../../components/crag/crag-routes/crag-routes-actions/filter";
import Search from "../../components/crag/crag-routes/crag-routes-actions/search";
import Button from "../../components/ui/button";
import IconSearch from "../../components/ui/icons/search";
import Sort from "../../components/ui/icons/sort";

function CragRoutesActionsPage() {
  const [searchState, setSearchState] = useState("inactive");

  const handleSearchClick = () => {
    setSearchState("active");
  };

  // This is a sandbox for testing purposes and does not neccesseraly reflect the final implementation of crag-routes-actions component. Use it as such and delete after
  // TODO: this is all temp. delete.

  return (
    <>
      {/* This is old */}
      <div className="mx-auto 2xl:container">
        {/* outer wrap, to center actions */}
        <div className="TEMPh-11 my-4 mx-4 flex justify-center xs:mx-8 xs:block">
          {/* middle wrap: left: other actions, right: search */}
          <div className="flex items-center xs:justify-between xs:gap-8">
            {/* left section: other actions */}
            <div className="flex items-center">
              {/* Action: Filter */}
              <div className="flex px-4 xs:pl-0">
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

            {/* Right section: search action */}
            {/* Action: Search  */}
            <div
              className={`min-w-0 max-xs:border-l max-xs:border-l-neutral-300 max-xs:px-4 xs:w-80`}
            >
              <Button className="xs:hidden" renderStyle="icon">
                <IconSearch />
              </Button>
              <div className="max-xs:hidden">
                <Search />
              </div>
            </div>
          </div>
        </div>
        <div className={`mx-4 hidden`}>
          <Search />
        </div>
      </div>

      {/* General responsive behaviour */}
      <div className="mt-8 mb-4">On large screens</div>
      <div className="flex justify-between">
        <div className="bg-blue-100">Other actions</div>
        <div className="bg-red-100">Search</div>
      </div>

      <div className="mt-8 mb-4">On smaller screens</div>

      <div className="flex justify-center">
        <div className="bg-blue-100">Other actions</div>
        <div className="bg-red-100">Search</div>
      </div>

      <div className="mt-8 mb-4">On smaller screens when search activated</div>

      <div className="block">
        <div className="bg-blue-100">Other actions</div>
        <div className="bg-red-100">Search</div>
      </div>

      <div className="mt-8 mb-4">All in one responsive</div>

      <div
        className={`${
          searchState === "active" ? "block xs:flex" : "flex justify-center"
        }  xs:justify-between`}
      >
        <div className="bg-blue-100">Other actions</div>
        <div className="bg-red-100" onClick={handleSearchClick}>
          Search
        </div>
      </div>
    </>
  );
}

export default CragRoutesActionsPage;
