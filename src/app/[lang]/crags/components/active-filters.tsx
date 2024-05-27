import FilterChip from "./filter-chip";
import { Filter } from "./filtersHelp";

type TActiveFiltersProps = {
  filters: Record<string, Filter>;
};

function ActiveFilters({ filters }: TActiveFiltersProps) {
  const activeFilters = Object.values(filters).filter((filter) =>
    filter.isActive()
  );

  return (
    <>
      {activeFilters.length > 0 && (
        <div className="mx-2 flex flex-wrap gap-2 border-b border-b-neutral-200 py-2 xs:mx-8 md:mx-0 md:border-b-0 md:pt-0">
          {activeFilters.map((filter) => (
            <FilterChip key={filter.label} filter={filter} />
          ))}
        </div>
      )}
    </>
  );
}

export default ActiveFilters;
