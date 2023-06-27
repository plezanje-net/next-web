import { useContext, useRef } from "react";
import IconSearch from "../../../ui/icons/search";
import TextField from "../../../ui/text-field";
import { CragRoutesContext } from "../../crag-routes";
import Button from "../../../ui/button";
import IconClose from "../../../ui/icons/close";

function Search() {
  const { cragRoutesState, setCragRoutesState } = useContext(CragRoutesContext);

  const searchFieldRef = useRef<HTMLInputElement>(null);

  const handleSearchFieldChange = (searchFieldValue: string) => {
    setCragRoutesState({
      ...cragRoutesState,
      search: {
        ...cragRoutesState.search,
        query: searchFieldValue,
      },
    });
  };

  // Clear the search field
  const handleClearIconClick = () => {
    setCragRoutesState({
      ...cragRoutesState,
      search: {
        ...cragRoutesState.search,
        query: "",
      },
    });
  };

  // Set state of search field, so it becomes visible even on <xs screens
  const handleSearchIconClick = () => {
    setCragRoutesState({
      ...cragRoutesState,
      search: {
        ...cragRoutesState.search,
        focus: true,
      },
    });

    setTimeout(() => {
      searchFieldRef.current && searchFieldRef.current.focus();
    }, 0);
  };

  // Set state of search field, so that it dissappears on <xs screens and is replaced by an icon
  const handleSearchFieldBlur = () => {
    setCragRoutesState({
      ...cragRoutesState,
      search: {
        ...cragRoutesState.search,
        focus: false,
      },
    });
  };

  return (
    <>
      <Button
        className={`${
          cragRoutesState.search?.focus || cragRoutesState.search?.query
            ? "hidden"
            : "xs:hidden"
        }`}
        renderStyle="icon"
        onClick={handleSearchIconClick}
      >
        <IconSearch />
      </Button>
      <div
        className={`${
          cragRoutesState.search?.focus || cragRoutesState.search?.query
            ? "block"
            : "hidden xs:block"
        }`}
      >
        <TextField
          ref={searchFieldRef}
          prefix={<IconSearch />}
          placeholder="Poišči po imenu"
          aria-label="Poišči po imenu"
          onChange={handleSearchFieldChange}
          value={cragRoutesState.search?.query || ""}
          suffix={
            cragRoutesState.search?.query && (
              <span className="flex">
                <Button renderStyle="icon" onClick={handleClearIconClick}>
                  <IconClose />
                </Button>
              </span>
            )
          }
          onBlur={handleSearchFieldBlur}
        />
      </div>
    </>
  );
}

export default Search;
