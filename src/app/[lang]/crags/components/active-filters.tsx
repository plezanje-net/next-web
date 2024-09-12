import FilterChip from "./filter-chip";
import { Filter } from "./filtersHelp";

type TActiveFiltersProps = {
  filters: Record<string, Filter>;
};

function ActiveFilters({ filters }: TActiveFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.values(filters)
        .filter((filter) => filter.isActive())
        .map((filter) => (
          <FilterChip key={filter.label} filter={filter} />
        ))}
    </div>
  );
}

export default ActiveFilters;
