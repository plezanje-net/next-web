import Button from "@/components/ui/button";
import IconClose from "@/components/ui/icons/close";
import { Filter } from "./filtersHelp";

type TFilterChipProps = {
  filter: Filter;
};

function FilterChip({ filter }: TFilterChipProps) {
  return (
    <div className="inline-flex items-center rounded-lg bg-blue-50 py-px pl-3 pr-2">
      <div>
        {filter.label}: {filter.valueToString()}
      </div>
      <Button variant="quaternary" onClick={filter.handleReset}>
        <IconClose />
      </Button>
    </div>
  );
}

export default FilterChip;
