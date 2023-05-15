import { useContext } from "react";
import IconSearch from "../../ui/icons/search";
import TextField from "../../ui/text-field";
import { CragTableContext } from "../crag-table";
import ButtonGood from "../../ui/button-good";
import IconClose from "../../ui/icons/close";

// TODO: search on xs screen: design and enable!

function Search() {
  // TODO: could we rename the content of the context to sthg more specific?
  const { state, setState } = useContext(CragTableContext);

  const handleSearchFieldChange = (searchFieldValue: string) => {
    setState({ ...state, search: searchFieldValue });
  };

  const handleClearSearch = () => {
    setState({ ...state, search: "" });
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
          value={state.search || ""}
          suffix={
            state.search && (
              <span className="flex">
                <ButtonGood renderStyle="icon" onClick={handleClearSearch}>
                  <IconClose />
                </ButtonGood>
              </span>
            )
          }
        />
      </div>
    </>
  );
}

export default Search;
