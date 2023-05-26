import { useContext } from "react";
import { Select, Option } from "../../../ui/select";
import { CragRoutesContext, cragRouteListColumns } from "../../crag-routes";
import Button from "../../../ui/button";
import IconColumns from "../../../ui/icons/columns";

function Columns() {
  const { cragRoutesState, setCragRoutesState } = useContext(CragRoutesContext);

  const handleSelectedColumnsChange = (selectedColumns: string[]) => {
    setCragRoutesState({ ...cragRoutesState, selectedColumns });
  };

  return (
    <Select
      multi
      defaultValue={cragRoutesState.selectedColumns}
      onChange={handleSelectedColumnsChange}
      customTrigger={
        <Button renderStyle="icon">
          <span className="flex">
            <IconColumns />
            <span className="ml-2 max-lg:hidden">Izberi stolpce</span>
          </span>
        </Button>
      }
    >
      {cragRouteListColumns
        .filter(({ isOptional }) => isOptional)
        .map((column) => (
          <Option key={column.name} id={column.name} value={column.name}>
            {column.label}
          </Option>
        ))}
    </Select>
  );
}

export default Columns;
