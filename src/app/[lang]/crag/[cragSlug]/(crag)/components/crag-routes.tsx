"use client";

import {
  ActivityRoute,
  AscentType,
  Crag,
  Maybe,
  PaginatedActivityRoutes,
  PublishType,
  Route,
  Sector,
} from "@/graphql/generated";
import { createContext, useCallback, useLayoutEffect, useState } from "react";
import CragRouteList from "./crag-routes/crag-route-list";
import CragSector from "./crag-routes/crag-sector";
import CragRoutesActions from "./crag-routes/crag-routes-actions";
import {
  parseAsArrayOf,
  parseAsInteger,
  useQueryState,
} from "next-usequerystate";
import useResizeObserver from "@/hooks/useResizeObserver";
import { TLogRoute } from "@/components/log-dialog/log-routes-context";
import LogRoutesPopover from "./log-routes-popover";
import dayjs from "dayjs";

interface Props {
  crag: Crag;
  mySummary: ActivityRoute[];
}

interface FilterOptions {
  routesTouches?: "ticked" | "tried" | "unticked" | "untried";
  difficulty?: { from: number; to: number };
  starRating?: {
    marvelous: boolean;
    beautiful: boolean;
    unremarkable: boolean;
  };
}

interface SortOptions {
  column: string;
  direction: "asc" | "desc";
}

interface SearchOptions {
  query?: string;
  focus?: boolean;
}

interface CragRoutesState {
  compact: boolean | null;
  combine: boolean;
  selectedColumns: string[];
  noSectors: boolean;
  search?: SearchOptions;
  filter?: FilterOptions;
  sort: SortOptions;
}

interface CragRouteListColumn {
  name: string;
  isOptional: boolean;
  label: string;
  sortLabel?: string;
  sortAscLabel?: string;
  sortDescLabel?: string;
  excludeFromSort?: boolean;
  isDefault: boolean;
  width: number;
}

interface CragRoutesContextType {
  cragRoutesState: CragRoutesState;
  setCragRoutesState: (cragRoutesState: CragRoutesState) => void;
  checkedRoutes: TLogRoute[];
  setCheckedRoute: (routeId: string, checked: boolean) => void;
  uncheckAllRoutes: () => void;
}

// TODO: export context definition to another file and create hook to use it, and a provider component to provide it
const CragRoutesContext = createContext<CragRoutesContextType>({
  cragRoutesState: {
    compact: null,
    combine: false,
    selectedColumns: [],
    noSectors: false,
    sort: { column: "select", direction: "asc" },
  },
  setCragRoutesState: () => {},
  checkedRoutes: [],
  setCheckedRoute: () => {},
  uncheckAllRoutes: () => {},
});

const cragRouteListColumns: CragRouteListColumn[] = [
  {
    name: "select",
    isOptional: false,
    label: "#",
    sortLabel: "",
    sortAscLabel: "Od leve proti desni",
    sortDescLabel: "Od desne proti levi",
    isDefault: true,
    width: 32, // w-8
  },
  {
    name: "name",
    isOptional: false,
    label: "Ime",
    sortLabel: "Po abecedi",
    sortAscLabel: "naraščajoče",
    sortDescLabel: "padajoče",
    isDefault: true,
    width: 144, // w-36
  },
  {
    name: "difficulty",
    isOptional: true,
    label: "Težavnost",
    sortLabel: "Po težavnosti",
    sortAscLabel: "naraščajoče",
    sortDescLabel: "padajoče",
    isDefault: true,
    width: 120, // w-30
  },
  {
    name: "length",
    isOptional: true,
    label: "Dolžina",
    sortLabel: "Po dolžini",
    sortAscLabel: "naraščajoče",
    sortDescLabel: "padajoče",
    isDefault: true,
    width: 88, // w-22
  },
  {
    name: "sector",
    isOptional: false,
    label: "Sektor",
    excludeFromSort: true,
    isDefault: false,
    width: 112, // w-28
  },
  {
    name: "nrTicks",
    isOptional: true,
    label: "Št. uspešnih vzponov",
    sortLabel: "Po št. vzponov",
    sortAscLabel: "naraščajoče",
    sortDescLabel: "padajoče",
    isDefault: false,
    width: 128, // w-32
  },
  {
    name: "nrTries",
    isOptional: true,
    label: "Št. poskusov",
    sortLabel: "Po št. poskusov",
    sortAscLabel: "naraščajoče",
    sortDescLabel: "padajoče",
    isDefault: false,
    width: 136, // w-34
  },
  {
    name: "nrClimbers",
    isOptional: true,
    label: "Št. plezalcev",
    sortLabel: "Po št. plezalcev",
    sortAscLabel: "naraščajoče",
    sortDescLabel: "padajoče",
    isDefault: false,
    width: 136, // w-34
  },
  {
    name: "starRating",
    isOptional: true,
    label: "Lepota",
    sortLabel: "Po lepoti",
    sortAscLabel: "naraščajoče",
    sortDescLabel: "padajoče",
    isDefault: true,
    width: 56, // w-14
  },
  {
    name: "comments",
    isOptional: true,
    label: "Komentarji",
    sortLabel: "",
    sortAscLabel: "S komentarji najprej",
    sortDescLabel: "Brez komentarjev najprej",
    isDefault: true,
    width: 56, // w-14
  },
  {
    name: "myAscents",
    isOptional: true,
    label: "Moji vzponi",
    sortLabel: "",
    sortAscLabel: "Z mojimi vzponi najprej",
    sortDescLabel: "Brez mojih vzponov najprej",
    isDefault: true,
    width: 64, // w-16
  },
];

function CragRoutes({ crag, mySummary }: Props) {
  const [cragRoutesState, setCragRoutesState] = useState<CragRoutesState>({
    compact: null,
    combine: false,
    selectedColumns: cragRouteListColumns
      .filter(({ isDefault }) => isDefault)
      .map(({ name }) => name),
    sort: { column: "select", direction: "asc" },

    noSectors: crag.sectors.length === 1,
    // TODO: above condition should be adjusted, because we have 2 different use cases:
    // single sector crag: a crag with a single sector where the sector is shown - might be the case when someone makes a partial contribution
    // no sectors crag: a crag that is physically only one wall and will never be split into multiple sectors
  });

  const ascents = new Map(
    mySummary.map((ascent) => [ascent.route.id, ascent.ascentType])
  );

  const neededWidth =
    cragRouteListColumns
      .filter(
        (c) =>
          cragRoutesState.selectedColumns.includes(c.name) ||
          (cragRoutesState.combine && c.name === "sector")
      )
      .reduce((acc, c) => acc + c.width, 0) +
    (cragRoutesState.combine ? 0 : 32);

  const onResize = useCallback(
    (target: HTMLDivElement, entry: ResizeObserverEntry) => {
      const availableWidth = entry.contentRect.width;

      setCragRoutesState((state) => ({
        ...state,
        compact: availableWidth < neededWidth,
      }));
    },
    [neededWidth]
  );
  const containerRef = useResizeObserver(onResize);

  // Sectors collapse/expand
  const [expandedSectors, setExpandedSectors] = useQueryState(
    "sectors",
    parseAsArrayOf(parseAsInteger).withDefault([])
  );

  const toggleSector = (index: number) => {
    let sectors = [...expandedSectors];
    if (expandedSectors.includes(index)) {
      sectors = sectors.filter((s) => s !== index);
    } else {
      sectors.push(index);
      sectors.sort();
    }
    setExpandedSectors(sectors);
  };

  useLayoutEffect(() => {
    const updatePosition = () => {
      localStorage.setItem("persistentScroll", window.scrollY.toString());
    };
    const persistentScroll = localStorage.getItem("persistentScroll");
    if (persistentScroll) {
      window.scrollTo({ top: Number(persistentScroll) });
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  const [checkedRoutes, setCheckedRoutes] = useState<TLogRoute[]>([]);

  const setCheckedRoute = (routeId: string, checked: boolean) => {
    const allRoutes: Array<
      Route & {
        firstTry?: Maybe<PaginatedActivityRoutes>;
        firstTick?: Maybe<PaginatedActivityRoutes>;
        firstTrTick?: Maybe<PaginatedActivityRoutes>;
      }
    > = crag.sectors.flatMap((sector) => sector.routes);

    if (checked) {
      setCheckedRoutes([
        ...checkedRoutes,
        ...allRoutes
          .filter((r) => r.id == routeId)
          .map((r) => ({
            id: r.id,
            key: r.id,
            name: r.name,
            difficulty: r.difficulty || null,
            defaultGradingSystemId: "french" as "french" | "uiaa" | "yds", // TODO: type
            usersHistory: {
              ...(r.difficultyVotes.length > 0 && {
                lastDifficultyVote: {
                  difficulty: r.difficultyVotes[0].difficulty,
                  date: dayjs(r.difficultyVotes[0].updated).format("D.M.YYYY"),
                },
              }),
              ...(r.starRatingVotes.length > 0 && {
                lastStarRatingVote: {
                  starRating: r.starRatingVotes[0].stars,
                  date: dayjs(r.starRatingVotes[0].updated).format("D.M.YYYY"),
                },
              }),
              firstTryDate: r.firstTry?.items[0]?.date || null,
              firstTickDate: r.firstTick?.items[0]?.date || null,
              firstTrTickDate: r.firstTrTick?.items[0]?.date || null,
            },
            logFormData: {
              publishType: PublishType.Public,
              impossibleAscentTypes: new Set<AscentType>(),
              hiddenAscentTypes: new Set<AscentType>(),
            },
          })),
      ]);
    } else {
      setCheckedRoutes(checkedRoutes.filter((r) => r.id != routeId));
    }
  };

  const uncheckAllRoutes = () => {
    setCheckedRoutes([]);
  };

  return (
    <CragRoutesContext.Provider
      value={{
        cragRoutesState,
        setCragRoutesState,
        checkedRoutes,
        setCheckedRoute,
        uncheckAllRoutes,
      }}
    >
      <CragRoutesActions />
      <div
        className={`mx-auto 2xl:container text-center ${
          cragRoutesState.noSectors ? "px-4" : ""
        } xs:px-8`}
      >
        <div
          ref={containerRef}
          className={`${cragRoutesState.compact === null ? "opacity-0" : ""}`}
        >
          {cragRoutesState.combine ||
          cragRoutesState.search?.query ||
          cragRoutesState.noSectors ? (
            <CragRouteList
              crag={crag}
              routes={crag.sectors.reduce(
                (acc: Route[], sector) => [...acc, ...sector.routes],
                []
              )}
              ascents={ascents}
            />
          ) : (
            // 'By sector' (uncombined) view
            crag.sectors.map((sector, index) => (
              <div
                key={sector.id}
                className={`${index > 0 ? "mt-1" : ""}`}
                id={`s${index + 1}`}
              >
                <CragSector
                  crag={crag}
                  sector={sector as Sector}
                  ascents={ascents}
                  isOpen={expandedSectors.includes(index + 1)}
                  onToggle={() => toggleSector(index + 1)}
                  first={index === 0}
                  last={index === crag.sectors.length - 1}
                />
              </div>
            ))
          )}
        </div>

        <LogRoutesPopover
          checkedRoutes={checkedRoutes}
          setCheckedRoutes={setCheckedRoutes}
          crag={crag}
        />
      </div>
    </CragRoutesContext.Provider>
  );
}

export {
  cragRouteListColumns,
  CragRoutesContext,
  type FilterOptions,
  type SortOptions,
};
export default CragRoutes;
