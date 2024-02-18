import { Crag } from "@/graphql/generated";
import { Fragment } from "react";
import CragRow from "./crag-row";
import { TCragListColumn } from "./filtered-crags";

type TCragListTableProps = {
  crags: Crag[];
  columns: TCragListColumn[];
};

function CragListTable({ crags, columns }: TCragListTableProps) {
  console.log(columns);
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-neutral-200 text-left text-neutral-500">
          {columns.map((column, index) => {
            return (
              <th
                key={column.name}
                className="p-4 font-normal first:pl-0 last:pr-0 last:text-right"
                style={{
                  minWidth: `${
                    (column.width -
                      (index == 0 ? 16 : 0) -
                      (index == columns.length - 1 ? 16 : 0)) /
                    16
                  }rem`,
                }}
              >
                {column.label}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {crags.map((crag: Crag) => (
          <Fragment key={crag.id}>
            <CragRow crag={crag} columns={columns} />
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default CragListTable;
