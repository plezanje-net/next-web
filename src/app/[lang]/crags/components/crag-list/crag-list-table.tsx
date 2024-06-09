import { Crag } from "@/graphql/generated";
import CragRow from "./single-crag/crag-row";
import { useCragsContext } from "../crags-context";

function CragListTable() {
  const { crags, columns } = useCragsContext();

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-neutral-200 text-left text-neutral-500">
          {columns.shown.map((column, index) => {
            return (
              <th
                key={index}
                className={`p-4 font-normal first:pl-0 last:pr-0 ${
                  columns.shown.length > 1 ? "last:text-right" : ""
                }`}
                style={{
                  minWidth: `${
                    (column.width -
                      (index == 0 ? 16 : 0) -
                      (index == columns.shown.length - 1 ? 16 : 0)) /
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
        {crags.map((crag: Crag, index) => (
          <CragRow key={index} crag={crag} />
        ))}
      </tbody>
    </table>
  );
}

export default CragListTable;
