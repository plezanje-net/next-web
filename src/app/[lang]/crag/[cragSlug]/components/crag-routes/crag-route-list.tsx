import { useContext } from "react";
import { Crag, Route } from "../../../../../../graphql/generated";
import CragRoute, { CragRouteCompact } from "./crag-route-list/crag-route";
import { CragRoutesContext, FilterOptions, SortOptions } from "../crag-routes";
import IconStarFull from "../../../../../../components/ui/icons/star-full";
import IconComment from "../../../../../../components/ui/icons/comment";
import IconCheck from "../../../../../../components/ui/icons/check";

interface Props {
  crag: Crag;
  routes: Route[];
  ascents: Map<string, string>;
}

function filterRoutesByFilter(
  routes: Route[],
  ascents: Map<string, string>,
  { routesTouches, difficulty, starRating }: FilterOptions = {}
): Route[] {
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

function filterRoutesBySearchTerm(
  routes: Route[],
  searchTerm: string
): Route[] {
  searchTerm = searchTerm.toLowerCase();
  searchTerm = escape(searchTerm);
  searchTerm = ignoreAccents(searchTerm);
  const regExp = new RegExp(searchTerm);

  return routes.filter((route) => regExp.test(route.name.toLowerCase()));
}

function sortRoutes(
  routes: Route[],
  ascents: Map<string, string>,
  sort: SortOptions = {
    column: "select",
    direction: "asc",
  }
): Route[] {
  const collator = new Intl.Collator("sl");

  routes.sort((r1, r2) => {
    const numericalDirection = sort.direction === "asc" ? 1 : -1;

    switch (sort.column) {
      case "select":
        // this is the checkboxes column and is 'used' to sort routes from left to right
        if (r1.sector.position === r2.sector.position) {
          return (r1.position - r2.position) * numericalDirection;
        } else {
          return (r1.sector.position - r2.sector.position) * numericalDirection;
        }
      case "name":
        return collator.compare(r1.name, r2.name) * numericalDirection;

      case "difficulty":
        return (
          ((r1.difficulty || Infinity) - (r2.difficulty || Infinity)) *
          numericalDirection
        );
      case "comments":
        return (r2.comments.length - r1.comments.length) * numericalDirection;

      case "myAscents":
        return (
          (+!!ascents.get(r2.id) - +!!ascents.get(r1.id)) * numericalDirection
        );

      case "length":
      case "nrTicks":
      case "nrTries":
      case "nrClimbers":
      case "starRating":
        return (
          ((r1[sort.column] || 0) - (r2[sort.column] || 0)) * numericalDirection
        );

      default:
        return 0;
    }
  });

  return routes;
}

function CragRouteList({ routes, crag, ascents }: Props) {
  const { cragRoutesState } = useContext(CragRoutesContext);

  routes = filterRoutesByFilter(routes, ascents, cragRoutesState.filter);

  if (cragRoutesState.search?.query) {
    routes = filterRoutesBySearchTerm(routes, cragRoutesState.search.query);
  }

  routes = sortRoutes(routes, ascents, cragRoutesState.sort);

  const bySector = !cragRoutesState.combine;
  const someFilter = Object.keys(cragRoutesState.filter || {}).length > 0;
  const someSearchQuery = cragRoutesState.search?.query;
  const noResultsText = `Za izbrane pogoje ${
    bySector ? "v tem sektorju" : ""
  } ni rezultatov. Poskusi spremeniti 
  ${someSearchQuery ? "iskalni niz" : ""}${
    someSearchQuery && someFilter ? " ali " : ""
  }${someFilter ? "nastavljene filtre" : ""}.${!!cragRoutesState.compact}`;

  return (
    <div className={`${!bySector || someSearchQuery ? "px-4 xs:px-0" : ""}`}>
      {!routes.length ? (
        <p>{noResultsText}</p>
      ) : !cragRoutesState.compact ? (
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200 text-left text-neutral-500">
              {/* # (checkbox) */}
              <th className="w-8 min-w-8 py-4 pl-0 pr-4 text-center font-normal">
                #
              </th>

              {/* Route name */}
              {cragRoutesState.selectedColumns.includes("name") && (
                <th className="min-w-36 py-4 pl-0 pr-4 font-normal">Ime</th>
              )}

              {/* Route difficulty */}
              {cragRoutesState.selectedColumns.includes("difficulty") && (
                <th className="min-w-30 p-4 font-normal">Težavnost</th>
              )}

              {/* Route length */}
              {cragRoutesState.selectedColumns.includes("length") && (
                <th className="min-w-22 p-4 font-normal">Dolžina</th>
              )}

              {/* Route's sector */}
              {cragRoutesState.combine && (
                <th className="min-w-28 p-4 font-normal">Sektor</th>
              )}

              {/* Number of successfull ascents of a route */}
              {cragRoutesState.selectedColumns.includes("nrTicks") && (
                <th className="min-w-32 p-4 font-normal">Št. vzponov</th>
              )}

              {/* Number of all ascents of a route */}
              {cragRoutesState.selectedColumns.includes("nrTries") && (
                <th className="min-w-34 p-4 font-normal">Št. poskusov</th>
              )}

              {/* Number of different climbers ticked/tried a route */}
              {cragRoutesState.selectedColumns.includes("nrClimbers") && (
                <th className="min-w-34 p-4 font-normal">Št. plezalcev</th>
              )}

              {/* Route star rating */}
              {cragRoutesState.selectedColumns.includes("starRating") && (
                <th className="w-14 min-w-14 p-4">
                  <IconStarFull />
                </th>
              )}

              {/* Does a route have any comments */}
              {cragRoutesState.selectedColumns.includes("comments") && (
                <th className="w-14 min-w-14 p-4">
                  <IconComment />
                </th>
              )}

              {/* Logged in user's acents of a route */}
              {cragRoutesState.selectedColumns.includes("myAscents") && (
                <th className="w-16 min-w-16 py-4 pl-4 pr-0 text-center">
                  <IconCheck className="inline-block" />
                </th>
              )}
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
    </div>
  );
}

export default CragRouteList;
