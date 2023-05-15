import { useContext } from "react";
import ButtonGood from "../../ui/button-good";
import IconSort from "../../ui/icons/sort";
import { Select, Option } from "../../ui/select";
import { CragTableContext, cragTableColumns } from "../crag-table";

function Sort() {
  // TODO: could we rename the content of the context to sthg more specific?
  const { state, setState } = useContext(CragTableContext);

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

  // TODO: remove aria button and replace it with ButtonGood, then rename ButtonGood to Button

  return (
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
  );
}

export default Sort;
