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

  const handleApplyFilter = () => {
    //TODO: dry type
    const filter: {
      routesTouches?: "ticked" | "tried" | "unticked" | "untried";
      difficulty?: { from: number; to: number };
    } = {};

    if (
      routesTouchesFilterValue === "ticked" ||
      routesTouchesFilterValue === "tried" ||
      routesTouchesFilterValue === "unticked" ||
      routesTouchesFilterValue === "untried"
    ) {
      filter.routesTouches = routesTouchesFilterValue;
    }

    if (
      difficultyFilterValue.from != minSliderValue ||
      difficultyFilterValue.to != maxSliderValue
    ) {
      filter.difficulty = {
        from: sliderValueToDifficultyMap.get(difficultyFilterValue.from)!,
        to: sliderValueToDifficultyMap.get(difficultyFilterValue.to)!,
      };
    }
    setState({ ...state, filter });
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
  };

  const [difficultyFilterValue, setDifficultyFilterValue] = useState({
    from: minSliderValue,
    to: maxSliderValue,
  });

  const handleDifficultyFilterChangeEnd = (value: number[]) => {
    const [from, to] = value;
    setDifficultyFilterValue({ from, to });
  };

  return (
    <>
      <div className="mt-4">
        <div className="flex">
          {/* Action: Filter */}
          <div className="flex cursor-pointer space-x-2 pr-4">
            <Dialog
              openTrigger={
                <Button renderStyle="icon">
                  <IconFilter />
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
                    <Checkbox>Čudovita</Checkbox>

                    <Checkbox>Lepa</Checkbox>

                    <Checkbox>Nič posebnega</Checkbox>
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
            <span>Filtriraj</span>
          </div>

          <div className="flex cursor-pointer space-x-2 border-l border-l-neutral-300 px-4 ">
            <IconColumns />
            <span>Izberi stolpce</span>
          </div>

          {/* Action: Combine/Uncombine sectors */}
          <div
            className="flex cursor-pointer space-x-2 border-l border-l-neutral-300 px-4"
            onClick={handleToggleCombine}
          >
            {!router.query.combine && <IconMerge />}
            {router.query.combine && <IconUnmerge />}
            <span>
              {router.query.combine ? "Razdruži sektorje" : "Združi sektorje"}
            </span>
          </div>

          {/* Action: Sort */}
          <div className="flex cursor-pointer space-x-2 border-l border-l-neutral-300 px-4 ">
            <IconSort />
            <span>Uredi</span>
          </div>

          {/* Action: Search ... TODO: move search here??? YES */}
          <div className="flex cursor-pointer space-x-2 border-l border-l-neutral-300 pl-4 ">
            <IconSearch />
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