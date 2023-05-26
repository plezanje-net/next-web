import { useContext } from "react";
import IconSearch from "../../../ui/icons/search";
import TextField from "../../../ui/text-field";
import { CragRoutesContext } from "../../crag-routes";
import Button from "../../../ui/button";
import IconClose from "../../../ui/icons/close";

// TODO: search on xs screen: design and enable!

function Search() {
  const { cragRoutesState, setCragRoutesState } = useContext(CragRoutesContext);

  const handleSearchFieldChange = (searchFieldValue: string) => {
    setCragRoutesState({ ...cragRoutesState, search: searchFieldValue });
  };

  const handleClearSearch = () => {
    setCragRoutesState({ ...cragRoutesState, search: "" });
  };
  return (
    <>
      <IconSearch className="xs:hidden" />
      <div className="max-xs:hidden">
        <TextField
          prefix={<IconSearch />}
          placeholder="Poišči po imenu"
          aria-label="Poišči po imenu"
          onChange={handleSearchFieldChange}
          value={cragRoutesState.search || ""}
          suffix={
            cragRoutesState.search && (
              <span className="flex">
                <Button renderStyle="icon" onClick={handleClearSearch}>
                  <IconClose />
                </Button>
              </span>
            )
          }
        />
      </div>
    </>
  );
}

export default Search;
