import { useContext } from "react";
import Button from "../../../ui/button";
import IconSort from "../../../ui/icons/sort";
import { Select, Option } from "../../../ui/select";
import { CragRoutesContext, cragRouteListColumns } from "../../crag-routes";

function Sort() {
  const { cragRoutesState, setCragRoutesState } = useContext(CragRoutesContext);

  const handleSortChange = (value: string) => {
    const [column, direction] = value.split(",");
    setCragRoutesState({
      ...cragRoutesState,
      sort: {
        column,
        direction: direction === "asc" ? "asc" : "desc",
      },
    });
  };

  return (
    <Select
      onChange={handleSortChange}
      customTrigger={
        <Button renderStyle="icon">
          <span className="flex">
            <IconSort />
            <span className="ml-2 max-lg:hidden">Uredi</span>
          </span>
        </Button>
      }
      customOptionsClasses="max-xs:right-[calc((185px-100vw)/2)]"
    >
      {cragRouteListColumns
        .filter(
          (column) =>
            cragRoutesState.selectedColumns.includes(column.name) &&
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