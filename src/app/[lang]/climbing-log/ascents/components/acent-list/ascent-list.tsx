"use client";

import Pagination from "@/components/ui/pagination";
import { ActivityRoute, PaginationMeta } from "@/graphql/generated";
import { useCallback, useState } from "react";
import useResizeObserver from "@/hooks/useResizeObserver";
import { useAscentsContext } from "../ascents-context";
import AscentListCards from "./ascent-list-cards";
import AscentListTable from "./ascent-list-table";
import useSearchParamsHandler from "@/hooks/useSearchParamsHandler";

type TAscentListProps = {
  ascents: ActivityRoute[];
  paginationMeta: PaginationMeta;
};

function AscentList({ ascents, paginationMeta }: TAscentListProps) {
  const { columns } = useAscentsContext();
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

  const { updateSearchParams } = useSearchParamsHandler();

  function handlePageChange(pageNumber: number) {
    updateSearchParams({ page: `${pageNumber}` });
  }

  const fromIndex =
    (paginationMeta.pageNumber - 1) * paginationMeta.pageSize + 1;
  const toIndex = Math.min(
    paginationMeta.pageNumber * paginationMeta.pageSize,
    paginationMeta.itemCount
  );

  return (
    <div ref={containerRef} className="mx-auto 2xl:container">
      {compact ? (
        <AscentListCards ascents={ascents} />
      ) : (
        <AscentListTable ascents={ascents} />
      )}
      {paginationMeta.itemCount > 0 && (
        <div
          className={`${compact ? "p-4 flex flex-col gap-4 items-center" : "flex items-center flex-row-reverse justify-between px-8 py-4"}`}
        >
          <Pagination
            currentPage={paginationMeta.pageNumber}
            totalPages={paginationMeta.pageCount}
            onPageChange={handlePageChange}
          />
          <div>
            {fromIndex}-{toIndex} od {paginationMeta.itemCount} vzponov
          </div>
        </div>
      )}
    </div>
  );
}

export default AscentList;
