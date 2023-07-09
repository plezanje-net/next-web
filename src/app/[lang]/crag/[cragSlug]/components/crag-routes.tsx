"use client";
import {
  ActivityRoute,
  Crag,
  Route,
  Sector,
} from "../../../../../graphql/generated";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import CragRouteList from "./crag-routes/crag-route-list";
import CragSector from "./crag-routes/crag-sector";
import CragRoutesActions from "./crag-routes/crag-routes-actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  compact: boolean;
  combine: boolean;
  selectedColumns: string[];
  noSectors: boolean;
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
    noSectors: false,
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

function CragRoutes({ crag, mySummary }: Props) {
  const [cragRoutesState, setCragRoutesState] = useState<CragRoutesState>({
    compact: true,
    combine: false,
    selectedColumns: cragRouteListColumns
      .filter(({ isDefault }) => isDefault)
      .map(({ name }) => name),

    noSectors: crag.sectors.length === 1,
    // TODO: above condition should be adjusted, because we have 2 different use cases:
    // single sector crag: a crag with a single sector where the sector is shown - might be the case when someone makes a partial contribution
    // no sectors crag: a crag that is physically only one wall and will never be split into multiple sectors
  });

  const [compact, setCompact] = useState(true);
  const [breakpoint, setBreakpoint] = useState(500);

  const ascents = new Map(
    mySummary.map((ascent) => [ascent.route.id, ascent.ascentType])
  );

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const [expandedSectors, setExpandedSectors] = useState<number[]>(
    params
      .get("s")
      ?.split(";")
      .map((s) => parseInt(s)) ?? []
  );

  // const createSectorQuery = useCallback(
  //   (index: number) => {
  //     const params = new URLSearchParams(searchParams);
  //     let sectors =
  //       params
  //         .get("s")
  //         ?.split(";")
  //         .map((s) => parseInt(s)) ?? [];
  //     let anchor = "";
  //     if (sectors.includes(index)) {
  //       sectors = sectors.filter((s) => s !== index);
  //     } else {
  //       sectors.push(index);
  //       sectors.sort();
  //       anchor = `#s${index}`;
  //     }

  //     if (sectors.length === 0) {
  //       params.delete("s");
  //     } else {
  //       params.set("s", sectors.join(";"));
  //     }

  //     setExpandedSectors(sectors);

  //     // return decodeURIComponent(params.toString());
  //   },
  //   [searchParams]
  // );

  // const saveScrollPosition = useCallback(() => {
  //   localStorage.setItem("persistentScroll", window.scrollY.toString());
  // }, []);

  const toggleSector = (index: number) => {
    let sectors = [...expandedSectors];
    if (expandedSectors.includes(index)) {
      sectors = sectors.filter((s) => s !== index);
    } else {
      sectors.push(index);
      // sectors.sort();
    }
    setExpandedSectors(sectors);

    // console.log(window.location);
    // const url = new URL(window.location.href);
    // url.searchParams.set("s", decodeURIComponent(sectors.join(";")));
    // history.pushState({}, "", url);

    // createSectorQuery(index);
    // saveScrollPosition();
    // router.push(`${pathname}?${createSectorQuery(index)}`, { scroll: false });
  };

  // useEffect(() => {
  //   const persistentScroll = localStorage.getItem("persistentScroll");
  //   if (persistentScroll === null) return;

  //   window.scrollTo({ top: Number(persistentScroll) });

  //   if (Number(persistentScroll) === window.scrollY)
  //     localStorage.removeItem("persistentScroll");
  // }, [searchParams]);

  return (
    <CragRoutesContext.Provider value={{ cragRoutesState, setCragRoutesState }}>
      <CragRoutesActions />
      <div
        className={`mx-auto 2xl:container ${
          cragRoutesState.noSectors ? "px-4" : ""
        } xs:px-8`}
      >
        <div ref={containerRef}>
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
