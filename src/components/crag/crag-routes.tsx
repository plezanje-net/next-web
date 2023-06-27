"use client";
import { createContext, useEffect, useRef, useState } from "react";
import { Crag, Route, Sector } from "../../graphql/generated";
import CragRouteList from "./crag-routes/crag-route-list";
import CragSector from "./crag-routes/crag-sector";
import CragRoutesActions from "./crag-routes/crag-routes-actions";
import { SSRProvider } from "react-aria";

interface Props {
  crag: Crag;
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
  compact: boolean;
  combine: boolean;
  selectedColumns: string[];
  search?: SearchOptions;
  filter?: FilterOptions;
  sort?: SortOptions;
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
}

const CragRoutesContext = createContext<CragRoutesContextType>({
  cragRoutesState: {
    compact: true,
    combine: false,
    selectedColumns: [],
  },
  setCragRoutesState: () => {},
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

function CragRoutes({ crag }: Props) {
  const [cragRoutesState, setCragRoutesState] = useState<CragRoutesState>({
    compact: true,
    combine: false,
    selectedColumns: cragRouteListColumns
      .filter(({ isDefault }) => isDefault)
      .map(({ name }) => name),
  });

  const [compact, setCompact] = useState(true);
  const [breakpoint, setBreakpoint] = useState(500);

  // Load user's crag summary if logged in and after server-side render
  const [ascents, setAscents] = useState<Map<string, string>>(new Map());
  // const authCtx = useAuth();
  // const [fetchAscents, setFetchAscents] = useState(false);
  // const [ascentsResult] = useQuery({
  //   query: MyCragSummaryDocument,
  //   variables: {
  //     input: {
  //       cragId: crag.id,
  //     },
  //   },
  //   pause: !fetchAscents,
  // });

  // useEffect(() => {
  //   if (authCtx.status?.loggedIn) {
  //     setFetchAscents(true);
  //   }
  // }, [authCtx.status]);

  // useEffect(() => {
  //   setAscents(
  //     new Map(
  //       ascentsResult.data?.myCragSummary.map((ascent) => [
  //         ascent.route.id,
  //         ascent.ascentType,
  //       ])
  //     )
  //   );
  // }, [ascentsResult.data]);

  // Resize observer to detect when to switch to compact mode according to selected columns width
  useEffect(() => {
    setBreakpoint(
      cragRouteListColumns
        .filter(
          (c) =>
            cragRoutesState.selectedColumns.includes(c.name) ||
            (cragRoutesState.combine && c.name === "sector")
        )
        .reduce((acc, c) => acc + c.width, 0) +
        (cragRoutesState.combine ? 0 : 32)
    );
    // if we combined by sector there is another padding level that should be considdered, hence +32px
  }, [
    cragRoutesState.selectedColumns,
    cragRoutesState.selectedColumns.length,
    cragRoutesState.combine,
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const elementToObserve = containerRef?.current;
    if (!elementToObserve) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const availableWidth = entries[0].contentRect.width;
      setCompact(availableWidth <= breakpoint);
    });
    resizeObserver.observe(elementToObserve);

    return () => {
      resizeObserver.disconnect();
    };
  }, [breakpoint]);

  useEffect(() => {
    setCragRoutesState((state) => ({ ...state, compact }));
  }, [compact]);

  // Sectors collapse/expand
  const [expandedSectors, setExpandedSectors] = useState<number[]>([]);

  // toggle sector handler update state and silently push it to router
  const toggleSector = (index: number) => {
    const state = [...expandedSectors];
    const i = state.indexOf(index);
    if (i === -1) {
      state.push(index);
    } else {
      state.splice(i, 1);
    }
    setExpandedSectors(state);

    // TODO: save state to router somehow
    // toggleQueryParam(
    //   router,
    //   pathname,
    //   searchParams,
    //   "s",
    //   expandedSectors.map((s) => `${s}`),
    //   {}
    // );
  };

  return (
    <SSRProvider>
      <CragRoutesContext.Provider
        value={{ cragRoutesState, setCragRoutesState }}
      >
        <CragRoutesActions />
        <div className={`mx-auto 2xl:container xs:px-8`}>
          <div ref={containerRef}>
            {cragRoutesState.combine ||
            cragRoutesState.search?.query ||
            crag.sectors.length == 1 ? (
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
                  className={`${
                    index > 0
                      ? "border-t border-t-neutral-200"
                      : "overflow-hidden rounded-none xs:rounded-t-lg"
                  } ${
                    index == crag.sectors.length - 1
                      ? "overflow-hidden rounded-none xs:rounded-b-lg"
                      : ""
                  }`}
                >
                  <CragSector
                    crag={crag}
                    sector={sector as Sector}
                    ascents={ascents}
                    isOpen={expandedSectors.includes(index)}
                    onToggle={() => toggleSector(index)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </CragRoutesContext.Provider>
    </SSRProvider>
  );
}

export {
  cragRouteListColumns,
  CragRoutesContext,
  type FilterOptions,
  type SortOptions,
};
export default CragRoutes;
