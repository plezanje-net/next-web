import { useContext } from "react";
import Button from "@/components/ui/button";
import IconSort from "@/components/ui/icons/sort";
import { Select, Option } from "@/components/ui/select";
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
      value={`${cragRoutesState.sort.column},${cragRoutesState.sort.direction}`}
      onChange={handleSortChange}
      customTrigger={
        <Button variant="quaternary">
          <span className="flex">
            <IconSort />
            <span className="ml-2 max-lg:hidden">Uredi</span>
          </span>
        </Button>
      }
    >
      {cragRouteListColumns
        .filter(
          (column) =>
            cragRoutesState.selectedColumns.includes(column.name) &&
            !column.excludeFromSort
        )
        .flatMap((column) => [
          <Option key={`${column.name},asc`} value={`${column.name},asc`}>
            {`${column.sortLabel}${column.sortLabel ? ", " : ""}${
              column.sortAscLabel
            }`}
          </Option>,
          <Option key={`${column.name},desc`} value={`${column.name},desc`}>
            {`${column.sortLabel}${column.sortLabel ? ", " : ""}${
              column.sortDescLabel
            }`}
          </Option>,
        ])}
    </Select>
  );
}

export default Sort;
