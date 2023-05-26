import { useContext } from "react";
import { Select, Option } from "../../../ui/select";
import { CragTableContext, cragTableColumns } from "../../crag-routes";
import Button from "../../../ui/button";
import IconColumns from "../../../ui/icons/columns";

function Columns() {
  // TODO: could we rename the content of the context to sthg more specific?
  const { state, setState } = useContext(CragTableContext);

  const handleSelectedColumnsChange = (selectedColumns: string[]) => {
    setState({ ...state, selectedColumns });
  };

  return (
    <Select
      multi
      defaultValue={state.selectedColumns}
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
      {cragTableColumns
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
