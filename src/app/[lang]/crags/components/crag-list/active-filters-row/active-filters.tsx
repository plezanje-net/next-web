import { useCragsContext } from "../../../lib/crags-context";
import FilterChip from "./filter-chip";

function ActiveFilters() {
  const {
    filters: { filters },
  } = useCragsContext();

  const activeFilters = Object.values(filters).filter(
    (filter) => filter.isActive
  );

  return (
    <>
      {activeFilters.length > 0 && (
        <div className="mx-2 flex flex-wrap gap-2 border-b border-b-neutral-200 py-2 xs:mx-8 md:mx-0 md:border-b-0 md:pt-0">
          {activeFilters.map((filter, index) => (
            <FilterChip
              key={index}
              label={filter.label}
              value={filter.stringValue}
              onReset={filter.onReset}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default ActiveFilters;
