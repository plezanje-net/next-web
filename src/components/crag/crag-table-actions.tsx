import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toggleQueryParam } from "../../utils/route-helpers";
import Button from "../ui/button";
import Checkbox from "../ui/checkbox";
import Dialog, { DialogSize } from "../ui/dialog";
import IconColumns from "../ui/icons/columns";
import IconFilter from "../ui/icons/filter";
import IconMerge from "../ui/icons/merge";
import IconSearch from "../ui/icons/search";
import IconSort from "../ui/icons/sort";
import IconUnmerge from "../ui/icons/unmerge";
import { Radio, RadioGroup } from "../ui/radio-group";
import { CragTableColumns, CragTableContext } from "./crag-table";
import GradeRangeSlider, {
  difficultyToSliderValueMap,
  maxSliderValue,
  minSliderValue,
  sliderValueToDifficultyMap,
} from "../ui/grade-range-slider";
import TextInput from "../ui/text-input";

interface Props {}

function CragTableActions({}: Props) {
  // TODO: could we rename the content of the context to sthg more specific?
  const { state, setState } = useContext(CragTableContext);

  const router = useRouter();

  const handleToggleColumn = (columnName: string) => {
    const selectedColumns = state.selectedColumns;
    const columnIndex = selectedColumns.indexOf(columnName);
    if (columnIndex > -1) {
      selectedColumns.splice(columnIndex, 1);
    } else {
      selectedColumns.push(columnName);
    }
    setState({ ...state, selectedColumns });
  };

  const handleToggleCombine = () => {
    toggleQueryParam(router, "combine", router.query.combine ? null : "true");
  };

  const [routesTouchesFilterValue, setRoutesTouchesFilterValue] =
    useState("all");

  const [nrFiltersActive, setNrFiltersActive] = useState(0);

  const handleApplyFilter = () => {
    let nrFiltersActiveCount = 0;

    //TODO: dry type
    const filter: {
      routesTouches?: "ticked" | "tried" | "unticked" | "untried";
      difficulty?: { from: number; to: number };
      starRating?: {
        marvelous: boolean;
        beautiful: boolean;
        unremarkable: boolean;
      };
    } = {};

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
    setRoutesTouchesFilterValue(state.filter.routesTouches || "all");

    if (state.filter.difficulty) {
      setDifficultyFilterValue({
        from: difficultyToSliderValueMap.get(state.filter.difficulty.from)!,
        to: difficultyToSliderValueMap.get(state.filter.difficulty.to)!,
      });
    } else {
      setDifficultyFilterValue({ from: minSliderValue, to: maxSliderValue });
    }

    if (state.filter.starRating) {
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

  return (
    <>
      {/* outer wrap, to center actions */}
      <div className="mx-8 my-4 flex h-11 justify-center py-px xs:block">
        {/* middle wrap: left: other actions, right: search */}
        <div className="flex items-center xs:justify-between xs:gap-8">
          <div className="flex items-center">
            {/* Action: Filter */}
            <div className="flex cursor-pointer space-x-2 pr-4">
              <Dialog
                openTrigger={
                  <Button renderStyle="icon" className="flex">
                    <IconFilter />
                    <span>
                      <span className="ml-2 max-lg:hidden">Filtriraj</span>
                      {nrFiltersActive > 0 && <>&nbsp;({nrFiltersActive})</>}
                    </span>
                  </Button>
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
            <div className="flex cursor-pointer space-x-2 border-l border-l-neutral-300 px-4">
              <IconColumns />
              <span className="max-lg:hidden">Izberi stolpce</span>
            </div>

            {/* Action: Combine/Uncombine sectors */}
            <div
              className="flex cursor-pointer space-x-2 border-l border-l-neutral-300 px-4"
              onClick={handleToggleCombine}
            >
              {!router.query.combine && <IconMerge />}
              {router.query.combine && <IconUnmerge />}
              <span className="max-lg:hidden">
                {router.query.combine ? "Razdruži sektorje" : "Združi sektorje"}
              </span>
            </div>

            {/* Action: Sort */}
            <div className="flex cursor-pointer space-x-2 border-l border-l-neutral-300 px-4 ">
              <IconSort />
              <span className="max-lg:hidden">Uredi</span>
            </div>
          </div>

          {/* TODO: check text input, there are some undefined styles if you inspect container */}

          {/* TODO */}
          {/* Action: Search ... TODO: move search here??? YES */}
          <div className="xs:w-80">
            <IconSearch className="xs:hidden" />
            <div className="max-xs:hidden">
              <TextInput prefix={<IconSearch />} />
            </div>
          </div>
        </div>
      </div>

      {/* Action: Select columns TODO: move into actions row*/}
      <div className="container mx-auto mt-4 px-8">
        cols:
        {CragTableColumns.filter(({ isOptional }) => isOptional).map(
          (column) => (
            <Checkbox
              key={column.name}
              value={column.name}
              isSelected={state.selectedColumns.includes(column.name)}
              onChange={() => handleToggleColumn(column.name)}
            >
              {column.label}
            </Checkbox>
          )
        )}
      </div>
    </>
  );
}

export default CragTableActions;
