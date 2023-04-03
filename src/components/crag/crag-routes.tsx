import { useContext } from "react";
import { Crag, Route, Sector } from "../../graphql/generated";
import CragRoute, { CragRouteCompact } from "./crag-route";
import { CragTableColumns, CragTableContext } from "./crag-table";

interface Props {
  crag: Crag;
  routes: Route[];
  ascents: Map<string, string>;
}

interface FilterOptions {
  search: string | null;
}

function filterRoutes(routes: Route[], { search }: FilterOptions): Route[] {
  if (search) {
    routes = filterBySearchTerm(routes, search);
  }
  return routes;
}

function escape(searchTerm: string): string {
  return searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

function ignoreAccents(searchTerm: string): string {
  return searchTerm
    .replace(/[cčć]/gi, "[cčć]")
    .replace(/[sš]/gi, "[sš]")
    .replace(/[zž]/gi, "[zž]")
    .replace(/[aàáâäæãåā]/gi, "[aàáâäæãåā]")
    .replace(/[eèéêëēėę]/gi, "[eèéêëēėę]")
    .replace(/[iîïíīįì]/gi, "[iîïíīįì]")
    .replace(/[oôöòóœøōõ]/gi, "[oôöòóœøōõ]")
    .replace(/[uûüùúū]/gi, "[uûüùúū]")
    .replace(/[dđ]/gi, "[dđ]");
}

function filterBySearchTerm(routes: Route[], searchTerm: string): Route[] {
  searchTerm = searchTerm.toLowerCase();
  searchTerm = escape(searchTerm);
  searchTerm = ignoreAccents(searchTerm);
  const regExp = new RegExp(searchTerm);

  return routes.filter((route) => regExp.test(route.name.toLowerCase()));
}

function CragRoutes({ routes, crag, ascents }: Props) {
  const { state } = useContext(CragTableContext);
  routes = filterRoutes(routes, { search: state.search });
  return (
    <>
      {state.compact !== undefined && !state.compact ? (
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
                  {column.icon
                    ? column.icon
                    : column.labelShort ?? column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <CragRoute
                key={route.id}
                route={route}
                crag={crag}
                ascent={ascents.get(route.id)}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          {routes.map((route) => (
            <CragRouteCompact
              key={route.id}
              route={route}
              crag={crag}
              ascent={ascents.get(route.id)}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default CragRoutes;
