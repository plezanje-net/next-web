import { useContext } from "react";
import { Crag, Route } from "../../graphql/generated";
import CragRoute, { CragRouteCompact } from "./crag-route";
import { CragTableColumns, CragTableContext } from "./crag-table";

interface Props {
  crag: Crag;
  routes: Route[];
  ascents: Map<string, string>;
}

// TODO: dry
interface FilterOptions {
  search: string | null;
  routesTouches?: "ticked" | "tried" | "unticked" | "untried";
  difficulty?: { from: number; to: number };
  starRating?: {
    marvelous: boolean;
    beautiful: boolean;
    unremarkable: boolean;
  };
}

function filterRoutes(
  routes: Route[],
  ascents: Map<string, string>,
  { search, routesTouches, difficulty, starRating }: FilterOptions
): Route[] {
  if (search) {
    routes = filterBySearchTerm(routes, search);
  }

  if (routesTouches) {
    switch (routesTouches) {
      case "ticked":
        routes = routes.filter((route) => {
          const ascent = ascents.get(route.id);
          return (
            ascent === "onsight" || ascent === "redpoint" || ascent === "flash"
          );
        });
        break;
      case "tried":
        routes = routes.filter((route) => ascents.has(route.id));
        break;
      case "unticked":
        routes = routes.filter((route) => {
          const ascent = ascents.get(route.id);
          return (
            ascent !== "onsight" && ascent !== "redpoint" && ascent !== "flash"
          );
        });
        break;
      case "untried":
        routes = routes.filter((route) => !ascents.has(route.id));
        break;
    }
  }

  if (difficulty) {
    routes = routes.filter(
      (route) =>
        !route.difficulty ||
        (route.difficulty >= difficulty.from &&
          route.difficulty <= difficulty.to)
    );
  }

  if (starRating) {
    routes = routes.filter((route) => {
      switch (route.starRating) {
        case 2:
          return starRating.marvelous;
        case 1:
          return starRating.beautiful;
        case 0:
        default:
          return starRating.unremarkable;
      }
    });
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
  routes = filterRoutes(routes, ascents, {
    // TODO: should move search into filter
    search: state.search,
    routesTouches: state.filter.routesTouches,
    difficulty: state.filter.difficulty,
    starRating: state.filter.starRating,
  });

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