import { useContext } from "react";
import Checkbox from "../ui/checkbox";
import { CragTableColumns, CragTableContext } from "./crag-table";

interface Props {}

function CragTableActions({}: Props) {
  const { state, setState } = useContext(CragTableContext);
  const handleChange = (columnName: string) => {
    const selectedColumns = state.selectedColumns;
    const columnIndex = selectedColumns.indexOf(columnName);
    if (columnIndex > -1) {
      selectedColumns.splice(columnIndex, 1);
    } else {
      selectedColumns.push(columnName);
    }
    setState({ ...state, selectedColumns });
  };

  return (
    <>
      <div className="container mx-auto mt-4 px-8">
        This is just so we can test context
      </div>
      <div className="container mx-auto mt-4 px-8">
        cols:
        {CragTableColumns.filter(({ isOptional }) => isOptional).map(
          (column) => (
            <Checkbox
              key={column.name}
              value={column.name}
              isSelected={state.selectedColumns.includes(column.name)}
              onChange={() => handleChange(column.name)}
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
