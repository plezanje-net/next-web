import Button from "@/components/ui/button";
import IconColumns from "@/components/ui/icons/columns";
import { Select, Option } from "@/components/ui/select";
import { useCragsContext } from "../../lib/crags-context";

function SelectColumns() {
  const { columns } = useCragsContext();

  return (
    <Select
      multi
      customTrigger={
        <Button variant="quaternary">
          <div className="flex">
            <IconColumns />
            <span className="ml-2 max-lg:hidden">Izberi stolpce</span>
          </div>
        </Button>
      }
      value={columns.selectedState}
      onChange={columns.setSelectedState}
    >
      {columns.all
        .filter((column) => column.isOptional)
        .map((column) => (
          <Option key={column.name} value={column.name}>
            {column.label}
          </Option>
        ))}
    </Select>
  );
}

export default SelectColumns;
