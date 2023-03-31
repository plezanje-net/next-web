import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toggleQueryParam } from "../../utils/route-helpers";
import Button from "../ui/button";
import Checkbox from "../ui/checkbox";
import Dialog from "../ui/dialog";
import IconFilter from "../ui/icons/filter";
import { Radio, RadioGroup } from "../ui/radio-group";
import { CragTableColumns, CragTableContext } from "./crag-table";

interface Props {}

function CragTableActions({}: Props) {
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
  const [
    previousRoutesTouchesFilterValue,
    setPreviousRoutesTouchesFilterValue,
  ] = useState(routesTouchesFilterValue);

  const handleApplyFilter = () => {
    setPreviousRoutesTouchesFilterValue(routesTouchesFilterValue); // used to restore filter values if user closes the dialog without confirming filters
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
    // if the dialog was closed without confirming the changed filter choice, the previous filters state needs to be restored
    setRoutesTouchesFilterValue(previousRoutesTouchesFilterValue);
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
          title="Filtriraj smeri"
          confirm={{ label: "Filtriraj", callback: handleApplyFilter }}
          cancel={{ label: "Prekliči", callback: handleFilterClose }}
          closeCallback={handleFilterClose}
        >
          <>
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
          </>
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

      {/* Action: Search ... TODO: move search here??? */}
    </>
  );
}

export default CragTableActions;
