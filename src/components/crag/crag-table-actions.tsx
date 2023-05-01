import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toggleQueryParam } from "../../utils/route-helpers";
import Checkbox from "../ui/checkbox";
import Dialog, { DialogSize } from "../ui/dialog";
import IconColumns from "../ui/icons/columns";
import IconFilter from "../ui/icons/filter";
import IconMerge from "../ui/icons/merge";
import IconSearch from "../ui/icons/search";
import IconSort from "../ui/icons/sort";
import IconUnmerge from "../ui/icons/unmerge";
import { Radio, RadioGroup } from "../ui/radio-group";
import {
  cragTableColumns,
  CragTableContext,
  FilterOptions,
} from "./crag-table";
import GradeRangeSlider, {
  difficultyToSliderValueMap,
  maxSliderValue,
  minSliderValue,
  sliderValueToDifficultyMap,
} from "../ui/grade-range-slider";
import TextField from "../ui/text-field";
import { Select, Option } from "../ui/select";
import IconClose from "../ui/icons/close";
import ButtonGood from "../ui/button-good";

interface Props {}

function CragTableActions({}: Props) {
  // TODO: could we rename the content of the context to sthg more specific?
  const { state, setState } = useContext(CragTableContext);

  const router = useRouter();

  const handleToggleCombine = () => {
    toggleQueryParam(router, "combine", router.query.combine ? null : "true");
  };

  const [routesTouchesFilterValue, setRoutesTouchesFilterValue] =
    useState("all");

  const [nrFiltersActive, setNrFiltersActive] = useState(0);

  const handleApplyFilter = () => {
    let nrFiltersActiveCount = 0;
    const filter: FilterOptions = {};

    if (
      routesTouchesFilterValue === "ticked" ||
      routesTouchesFilterValue === "tried" ||
      routesTouchesFilterValue === "unticked" ||
      routesTouchesFilterValue === "untried"
    ) {
      filter.routesTouches = routesTouchesFilterValue;
      nrFiltersActiveCount++;
    }

    if (
      difficultyFilterValue.from != minSliderValue ||
      difficultyFilterValue.to != maxSliderValue
    ) {
      filter.difficulty = {
        from: sliderValueToDifficultyMap.get(difficultyFilterValue.from)!,
        to: sliderValueToDifficultyMap.get(difficultyFilterValue.to)!,
      };
      nrFiltersActiveCount++;
    }

    // it never made sense to me, but probably what a user would expect. that is if all or none are checked, all are shown
    const allStarRatings =
      (marvelousFilterValue &&
        beautifulFilterValue &&
        unremarkableFilterValue) ||
      (!marvelousFilterValue &&
        !beautifulFilterValue &&
        !unremarkableFilterValue);

    if (!allStarRatings) {
      filter.starRating = {
        marvelous: marvelousFilterValue,
        beautiful: beautifulFilterValue,
        unremarkable: unremarkableFilterValue,
      };
      nrFiltersActiveCount++;
    }

    setState({ ...state, filter });
    setNrFiltersActive(nrFiltersActiveCount);
  };

  const handleFilterClose = () => {
    // if the dialog was closed without confirming the changed filter choice, the previous filters state needs to be restored. take it either from context or set back defaults if not in context
    setRoutesTouchesFilterValue(state.filter?.routesTouches || "all");

    if (state.filter?.difficulty) {
      setDifficultyFilterValue({
        from: difficultyToSliderValueMap.get(state.filter.difficulty.from)!,
        to: difficultyToSliderValueMap.get(state.filter.difficulty.to)!,
      });
    } else {
      setDifficultyFilterValue({ from: minSliderValue, to: maxSliderValue });
    }

    if (state.filter?.starRating) {
      setMarvelousFilterValue(state.filter.starRating.marvelous);
      setBeautifulFilterValue(state.filter.starRating.beautiful);
      setUnremarkableFilterValue(state.filter.starRating.unremarkable);
    } else {
      setMarvelousFilterValue(true);
      setBeautifulFilterValue(true);
      setUnremarkableFilterValue(true);
    }
  };

  const [difficultyFilterValue, setDifficultyFilterValue] = useState({
    from: minSliderValue,
    to: maxSliderValue,
  });

  const handleDifficultyFilterChangeEnd = (value: number[]) => {
    const [from, to] = value;
    setDifficultyFilterValue({ from, to });
  };

  const [marvelousFilterValue, setMarvelousFilterValue] = useState(true);
  const [beautifulFilterValue, setBeautifulFilterValue] = useState(true);
  const [unremarkableFilterValue, setUnremarkableFilterValue] = useState(true);

  const handleSearchFieldChange = (searchFieldValue: string) => {
    setState({ ...state, search: searchFieldValue });
  };

  const handleClearSearch = () => {
    setState({ ...state, search: "" });
  };

  const handleSelectedColumnsChange = (selectedColumns: string[]) => {
    setState({ ...state, selectedColumns });
  };

  const handleSortChange = (value: string) => {
    const [column, direction] = value.split(",");
    setState({
      ...state,
      sort: {
        column,
        direction: direction === "asc" ? "asc" : "desc",
      },
    });
  };

  return (
    <>
      {/* outer wrap, to center actions */}
      <div className="mx-8 my-4 flex h-11 justify-center py-px xs:block">
        {/* middle wrap: left: other actions, right: search */}
        <div className="flex items-center xs:justify-between xs:gap-8">
          <div className="flex items-center">
            {/* Action: Filter */}
            <div className="flex pr-4">
              <Dialog
                openTrigger={
                  <ButtonGood renderStyle="icon">
                    <span className="flex">
                      <IconFilter />
                      <span>
                        <span className="ml-2 max-lg:hidden">Filtriraj</span>
                        {nrFiltersActive > 0 && <>&nbsp;({nrFiltersActive})</>}
                      </span>
                    </span>
                  </ButtonGood>
                }
                dialogSize={DialogSize.hug}
                title="Filtriraj smeri"
                confirm={{ label: "Filtriraj", callback: handleApplyFilter }}
                cancel={{ label: "Prekliči", callback: handleFilterClose }}
                closeCallback={handleFilterClose}
              >
                <div className="flex flex-col flex-wrap gap-8 md:flex-row">
                  <RadioGroup
                    label="Glede na moje poskuse v smeri"
                    value={routesTouchesFilterValue}
                    onChange={setRoutesTouchesFilterValue}
                  >
                    <Radio value="all">Vse</Radio>
                    <Radio value="ticked">Preplezane</Radio>
                    <Radio value="tried">Poskušane</Radio>
                    <Radio value="unticked">Nepreplezane</Radio>
                    <Radio value="untried">Neposkušane</Radio>
                  </RadioGroup>

                  <div className="flex flex-col">
                    <div>Glede na lepoto</div>
                    <div className="mt-2">
                      <Checkbox
                        isSelected={marvelousFilterValue}
                        onChange={setMarvelousFilterValue}
                      >
                        Čudovita
                      </Checkbox>
                      <Checkbox
                        isSelected={beautifulFilterValue}
                        onChange={setBeautifulFilterValue}
                      >
                        Lepa
                      </Checkbox>
                      <Checkbox
                        isSelected={unremarkableFilterValue}
                        onChange={setUnremarkableFilterValue}
                      >
                        Nič posebnega
                      </Checkbox>
                    </div>
                  </div>

                  <div className="w-50 lg:w-80">
                    <GradeRangeSlider
                      label="Glede na težavnost"
                      defaultValue={[
                        difficultyFilterValue.from,
                        difficultyFilterValue.to,
                      ]}
                      onChangeEnd={handleDifficultyFilterChangeEnd}
                    />
                  </div>
                </div>
              </Dialog>
            </div>

            {/* Action: Columns */}
            <div className="flex border-l border-l-neutral-300 px-4">
              <Select
                multi
                defaultValue={state.selectedColumns}
                onChange={handleSelectedColumnsChange}
                customTrigger={
                  <ButtonGood renderStyle="icon">
                    <span className="flex">
                      <IconColumns />
                      <span className="ml-2 max-lg:hidden">Izberi stolpce</span>
                    </span>
                  </ButtonGood>
                }
              >
                {cragTableColumns
                  .filter(({ isOptional }) => isOptional)
                  .map((column) => (
                    <Option
                      key={column.name}
                      id={column.name}
                      value={column.name}
                    >
                      {column.label}
                    </Option>
                  ))}
              </Select>
            </div>

            {/* Action: Combine/Uncombine sectors */}
            <div className="flex border-l border-l-neutral-300 px-4">
              <ButtonGood renderStyle="icon" onClick={handleToggleCombine}>
                <span className="flex">
                  {!router.query.combine && <IconMerge />}
                  {router.query.combine && <IconUnmerge />}
                  <span className="ml-2 max-lg:hidden">
                    {router.query.combine
                      ? "Razdruži sektorje"
                      : "Združi sektorje"}
                  </span>
                </span>
              </ButtonGood>
            </div>

            {/* Action: Sort */}
            <div className="flex border-l border-l-neutral-300 px-4">
              <Select
                onChange={handleSortChange}
                customTrigger={
                  <ButtonGood renderStyle="icon">
                    <span className="flex">
                      <IconSort />
                      <span className="ml-2 max-lg:hidden">Uredi</span>
                    </span>
                  </ButtonGood>
                }
                customOptionsClasses="max-xs:right-[calc((185px-100vw)/2)]"
              >
                {cragTableColumns
                  .filter(
                    (column) =>
                      state.selectedColumns.includes(column.name) &&
                      !column.excludeFromSort
                  )
                  .flatMap((column) => [
                    <Option
                      key={`${column.name},asc`}
                      id={`${column.name},asc`}
                      value={`${column.name},asc`}
                    >
                      {`${column.sortLabel}${column.sortLabel ? ", " : ""}${
                        column.sortAscLabel
                      }`}
                    </Option>,
                    <Option
                      key={`${column.name},desc`}
                      id={`${column.name},desc`}
                      value={`${column.name},desc`}
                    >
                      {`${column.sortLabel}${column.sortLabel ? ", " : ""}${
                        column.sortDescLabel
                      }`}
                    </Option>,
                  ])}
              </Select>
            </div>
          </div>

          {/* Action: Search  */}
          <div className="min-w-0 max-xs:border-l max-xs:border-l-neutral-300 max-xs:pl-4 xs:w-80">
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
                      <ButtonGood
                        renderStyle="icon"
                        onClick={handleClearSearch}
                      >
                        <IconClose />
                      </ButtonGood>
                    </span>
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CragTableActions;
