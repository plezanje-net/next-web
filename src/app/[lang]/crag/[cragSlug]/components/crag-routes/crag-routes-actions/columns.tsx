import { useContext } from "react";
import { Select, Option } from "../../../../../../../components/ui/select";
import { CragRoutesContext, cragRouteListColumns } from "../../crag-routes";
import Button from "../../../../../../../components/ui/button";
import IconColumns from "../../../../../../../components/ui/icons/columns";

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
      // TODO: on <xs screens column options on noSector crags get pushed of screen. below solution is not suitable. it is a real corner case but need to find sthg better
      // customOptionsClasses={`max-xs:right-[calc((14px-100vw)/2)]`}
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
