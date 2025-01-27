import { ActivityRoute } from "@/graphql/generated";
import AscentRow from "./ascent-row";
import { useAscentsContext } from "../../lib/ascents-context";

// Define the props type
type TAscentListTableProps = {
  ascents: ActivityRoute[];
};

function AscentListTable({ ascents }: TAscentListTableProps) {
  const { columns } = useAscentsContext();

  return (
    <div className="px-8">
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
          {ascents.map((ascent) => (
            <AscentRow ascent={ascent} key={ascent.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AscentListTable;
