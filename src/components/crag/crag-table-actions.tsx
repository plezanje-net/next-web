import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toggleQueryParam } from "../../utils/route-helpers";
import Button from "../ui/button";
import Checkbox from "../ui/checkbox";
import Dialog, { DialogSize } from "../ui/dialog";
import IconFilter from "../ui/icons/filter";
import { Radio, RadioGroup } from "../ui/radio-group";
import RangeSlider from "../ui/range-slider";
import { CragTableColumns, CragTableContext } from "./crag-table";

interface Props {}

function CragTableActions({}: Props) {
  // TODO: move this or get this
  const tempValueToGradeMap = new Map([
    [1, "1"],
    [2, "2"],
    [3, "3"],
    [4, "4a"],
    [5, "4a+"],
    [6, "4b"],
    [7, "4b+"],
    [8, "4c"],
    [9, "4c+"],
    [10, "5a"],
    [11, "5a+"],
    [12, "5b"],
    [13, "5b+"],
    [14, "5c"],
    [15, "5c+"],
    [16, "6a"],
    [17, "6a+"],
    [18, "6b"],
    [19, "6b+"],
    [20, "6c"],
    [21, "6c+"],
    [22, "7a"],
    [23, "7a+"],
    [24, "7b"],
    [25, "7b+"],
    [26, "7c"],
    [27, "7c+"],
    [28, "8a"],
    [29, "8a+"],
    [30, "8b"],
    [31, "8b+"],
    [32, "8c"],
    [33, "8c+"],
    [34, "9a"],
    [35, "9a+"],
    [36, "9b"],
    [37, "9b+"],
    [38, "9c"],
  ]);

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
    if (
      routesTouchesFilterValue === "ticked" ||
      routesTouchesFilterValue === "tried" ||
      routesTouchesFilterValue === "unticked" ||
      routesTouchesFilterValue === "untried"
    ) {
      setState({
        ...state,
        filter: { routesTouches: routesTouchesFilterValue },
      });
    } else {
      setState({ ...state, filter: {} });
    }
  };

  const handleFilterClose = () => {
    // if the dialog was closed without confirming the changed filter choice, the previous filters state needs to be restored. take it from context
    setRoutesTouchesFilterValue(state.filter.routesTouches || "all");
  };

  // TODO: get min max from somewhere
  const [difficultyFilterValue, setDifficultyFilterValue] = useState([1, 38]);
  const handleDifficultyFilterChangeEnd = (value: number[] | number) => {
    setDifficultyFilterValue(value as number[]);
  };

  return (
    <>
      <div className="container mx-auto mt-4 px-8">
        This is just so we can test context
      </div>

      {/* Action: Filter */}
      <div className="container mx-auto mt-4 px-8">
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
              <RangeSlider
                label="Glede na težavnost"
                defaultValue={difficultyFilterValue}
                minValue={1}
                maxValue={38}
                step={1}
                valueToLabelMap={tempValueToGradeMap}
                onChangeEnd={handleDifficultyFilterChangeEnd}
              />
            </div>
          </div>
        </Dialog>
      </div>

      {/* Action: Select columns */}
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

      {/* Action: Combine/Uncombine sectors */}
      <div className="container mx-auto mt-4 px-8">
        <button
          onClick={handleToggleCombine}
          className={router.query.combine && "text-blue-500"}
        >
          combine sectors
        </button>
      </div>

      {/* Action: Search ... TODO: move search here??? YES */}
    </>
  );
}

export default CragTableActions;
