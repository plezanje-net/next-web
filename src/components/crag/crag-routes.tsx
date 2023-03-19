import { useContext } from "react";
import { Crag, Route, Sector } from "../../graphql/generated";
import CragRoute, { CragRouteCompact } from "./crag-route";
import { CragTableColumns, CragTableContext } from "./crag-table";

interface Props {
  crag: Crag;
  routes: Route[];
}

function CragRoutes({ routes, crag }: Props) {
  const { state } = useContext(CragTableContext);
  return (
    <>
      {!state.compact ? (
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200">
              {CragTableColumns.filter(
                ({ name, displayCondition }) =>
                  state.selectedColumns.includes(name) &&
                  (displayCondition === undefined || displayCondition())
              ).map((column) => (
                <th
                  key={column.name}
                  className={`h-14 fill-neutral-500 text-left font-normal text-neutral-500`}
                >
                  {column.icon ? column.icon : column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <CragRoute key={route.id} route={route} crag={crag} />
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          {routes.map((route) => (
            <CragRouteCompact key={route.id} route={route} crag={crag} />
          ))}
        </div>
      )}
    </>
  );
}

export default CragRoutes;
