import useResizeObserver from "@/hooks/useResizeObserver";
import { useCallback, useState } from "react";
import ActiveFilters from "./active-filters-row/active-filters";
import CragListCards from "./crag-list-cards";
import CragListTable from "./crag-list-table";
import Link from "@/components/ui/link";
import { useCragsContext } from "../../lib/crags-context";

function CragList() {
  const { crags, columns } = useCragsContext();

  const [compact, setCompact] = useState<boolean | null>(null);

  const neededWidth = columns.all
    .filter((column) => columns.selectedState.includes(column.name))
    .reduce((sum, { width }) => sum + width, -32);

  const onResize = useCallback(
    (_target: HTMLDivElement, entry: ResizeObserverEntry) => {
      const availableWidth = entry.contentRect.width;
      setCompact(availableWidth < neededWidth);
    },
    [neededWidth]
  );
  const containerRef = useResizeObserver(onResize);

  return (
    <div
      className={`w-full overflow-hidden md:ml-5 ${
        compact === null ? "opacity-0" : ""
      }`}
    >
      {/* Filters chips */}
      <ActiveFilters />

      <div
        ref={containerRef}
        className="px-4 xs:px-8 md:border-t md:border-t-neutral-200 md:px-0"
      >
        {compact ? <CragListCards /> : crags.length > 0 && <CragListTable />}
        <div className="pt-4 text-center">
          {crags.length == 0 ? (
            <>Ni plezališč, ki bi ustrezali izbranim filtrom.</>
          ) : (
            <>
              Plezališča, ki ga iščeš, ni na seznamu?{" "}
              <Link href="">Dodaj plezališče.</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default CragList;
