import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { gql, useQuery } from "urql";
import {
  Crag,
  MyCragSummaryDocument,
  Route,
  Sector,
} from "../../graphql/generated";
import useDebounce from "../../utils/hooks/use-debounce";
import { useAuth } from "../../utils/providers/auth-provider";
import { toggleQueryParam } from "../../utils/route-helpers";
import Button from "../ui/button";
import IconCheck from "../ui/icons/check";
import IconClose from "../ui/icons/close";
import IconComment from "../ui/icons/comment";
import IconStarFull from "../ui/icons/star-full";
import TextInput from "../ui/text-input";
import CragRoutes from "./crag-routes";
import CragSector from "./crag-sector";
import CragTableActions from "./crag-table-actions";

interface Props {
  crag: Crag;
}
interface CragTableState {
  compact: boolean | undefined;
  combine: boolean; //
  selectedColumns: string[];
  search: string | null;
  // filters
}

interface CragTableColumn {
  label: string;
  labelShort?: string;
  name: string;
  icon?: ReactNode;
  isOptional: boolean;
  isDefault: boolean;
  displayCondition?: () => boolean;
  width: number;
  defaultSortDirection: number;
}

interface CragTableContextType {
  state: CragTableState;
  setState: (CragTableState: CragTableState) => void;
}

const CragTableContext = createContext<CragTableContextType>({
  state: {
    compact: undefined,
    combine: false,
    selectedColumns: [],
    search: null,
  },
  setState: () => {},
});

const CragTableColumns: CragTableColumn[] = [
  {
    name: "select",
    label: "#",
    isOptional: false,
    isDefault: true,
    defaultSortDirection: 1,
    width: 64,
  },
  {
    name: "sector",
    label: "Sektor",
    isOptional: false,
    displayCondition: () => false,
    isDefault: true,
    defaultSortDirection: 1,
    width: 100,
  },
  {
    name: "name",
    label: "Ime",
    isOptional: false,
    isDefault: true,
    defaultSortDirection: 1,
    width: 100,
  },
  {
    name: "difficulty",
    label: "Težavnost",
    isOptional: true,
    isDefault: true,
    defaultSortDirection: 1,
    width: 130,
  },
  {
    name: "length",
    label: "Dolžina",
    isOptional: true,
    isDefault: true,
    defaultSortDirection: 1,
    width: 100,
  },
  {
    name: "nrTicks",
    label: "Št. uspešnih vzponov",
    labelShort: "Št. vzponov",
    isOptional: true,
    isDefault: false,
    defaultSortDirection: -1,
    width: 160,
  },
  {
    name: "nrTries",
    label: "Št. poskusov",
    isOptional: true,
    isDefault: false,
    defaultSortDirection: -1,
    width: 100,
  },
  {
    name: "nrClimbers",
    label: "Št. plezalcev",
    isOptional: true,
    isDefault: false,
    defaultSortDirection: -1,
    width: 99,
  },
  {
    name: "starRating",
    label: "Lepota",
    icon: <IconStarFull />,
    isOptional: true,
    isDefault: true,
    defaultSortDirection: -1,
    width: 52,
  },
  {
    name: "comments",
    label: "Komentarji",
    icon: <IconComment />,
    isOptional: true,
    isDefault: true,
    defaultSortDirection: -1,
    width: 52,
  },
  {
    name: "myAscents",
    label: "Moji vzponi",
    icon: <IconCheck />,
    isOptional: true,
    isDefault: true,
    defaultSortDirection: -1,
    width: 52,
  },
];

function CragTable({ crag }: Props) {
  const router = useRouter();
  const [state, setState] = useState<CragTableState>({
    compact: undefined,
    combine: false,
    search: null,
    selectedColumns: CragTableColumns.filter(({ isDefault }) => isDefault).map(
      ({ name }) => name
    ),
  });

  const [compact, setCompact] = useState(state.compact);

  // Load user's crag summary if logged in and after server-side render
  const authCtx = useAuth();
  const [ascents, setAscents] = useState<Map<string, string>>(new Map());
  const [fetchAscents, setFetchAscents] = useState(false);
  const [ascentsResult] = useQuery({
    query: MyCragSummaryDocument,
    variables: {
      input: {
        cragId: crag.id,
      },
    },
    pause: !fetchAscents,
  });

  useEffect(() => {
    console.log("useEffect: authCtx");
    if (authCtx.status?.loggedIn) {
      setFetchAscents(true);
    }
  }, [authCtx.status]);

  useEffect(() => {
    setAscents(
      new Map(
        ascentsResult.data?.myCragSummary.map((ascent) => [
          ascent.route.id,
          ascent.ascentType,
        ])
      )
    );
  }, [ascentsResult.data]);

  // Resize observer to detect when to switch to compact mode according to selected columns width
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log("useEffect: columns");
    const breakpoint = CragTableColumns.filter((c) =>
      state.selectedColumns.includes(c.name)
    ).reduce((acc, c) => acc + c.width, 0);
    const resizeObserver = new ResizeObserver(() => {
      const compact = (containerRef.current?.offsetWidth ?? 0) <= breakpoint;
      console.log(
        "resizeobserver: ",
        containerRef.current?.offsetWidth,
        compact
      );
      setCompact(compact);
    });
    resizeObserver.observe(document.body);
    return () => {
      resizeObserver.unobserve(document.body);
    };
  }, [state.selectedColumns, state.selectedColumns.length]);

  useEffect(() => {
    setState((state) => ({ ...state, compact }));
  }, [compact]);

  // Search
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce<string>(search, 500);

  useEffect(() => {
    setState((state) => ({ ...state, search: debouncedSearch }));
  }, [debouncedSearch]);

  // Sectors collapse/expand
  // get initial state from query params (could be empty, string or array)
  const [expandedSectors, setExpandedSectors] = useState<number[]>(
    router.query.s
      ? typeof router.query.s == "string"
        ? [parseInt(router.query.s)]
        : router.query.s.map((s: string) => parseInt(s))
      : []
  );

  // toggle sector handler update state and silently push it to router
  const toggleSector = (index: number) => {
    setExpandedSectors((state) => {
      const i = state.indexOf(index);
      if (i === -1) {
        state.push(index);
      } else {
        state.splice(i, 1);
      }
      return state;
    });

    toggleQueryParam(
      router,
      "s",
      expandedSectors.map((s) => `${s}`),
      {
        scroll: false,
        shallow: true,
      }
    );
  };

  // observe expanded sectors and always set the anchor for the last visible sector on screen

  // I don't really like this anymore but it should work

  // const [lastVisibleSector, setLastVisibleSector] = useState(-1);
  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     let firstVisibleSectorFound = false;
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         const sectorIndex = parseInt(entry.target.id.split("-")[1]);
  //         setLastVisibleSector(sectorIndex);
  //       }
  //     });
  //   });
  //   expandedSectors.forEach((index) => {
  //     const sectorAnchor = document.getElementById(`sektor-${index}`);
  //     if (sectorAnchor) {
  //       observer.observe(sectorAnchor);
  //     }
  //   });
  // }, [expandedSectors]);

  // useEffect(() => {
  //   if (lastVisibleSector != -1) {
  //     window.location.hash = `#sektor-${lastVisibleSector}`;
  //   }
  // }, [lastVisibleSector]);

  return (
    <div ref={containerRef}>
      <CragTableContext.Provider value={{ state, setState }}>
        <CragTableActions />
        <div className="container mx-auto mt-4 flex justify-end  sm:px-8">
          <div className="w-80">
            <TextInput
              placeholder="Poišči v seznamu"
              aria-label="Poišči v seznamu"
              onChange={setSearch}
              value={search}
              suffix={
                search != "" && <ClearSearch onClick={() => setSearch("")} />
              }
            />
          </div>
        </div>
        <div
          className={`bg-pink-500 container mx-auto mt-4 sm:px-8 ${
            compact === undefined && "invisible"
          }`}
        >
          {router.query.combine || state.search || crag.sectors.length == 1 ? (
            <CragRoutes
              crag={crag}
              routes={crag.sectors.reduce(
                (acc: Route[], sector) => [...acc, ...sector.routes],
                []
              )}
              ascents={ascents}
            />
          ) : (
            crag.sectors.map((sector, index) => (
              <div
                key={sector.id}
                className={`${
                  index > 0 ? "border-t border-t-neutral-200" : ""
                }`}
              >
                {/* <a id={`sektor-${index}`} /> */}
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
      </CragTableContext.Provider>
    </div>
  );
}

function ClearSearch({ onClick }: { onClick: () => void }) {
  return (
    <Button renderStyle="icon" onPress={onClick} className="flex">
      <IconClose />
    </Button>
  );
}

gql`
  query MyCragSummary($input: FindActivityRoutesInput) {
    myCragSummary(input: $input) {
      ascentType
      route {
        id
        slug
      }
    }
  }
`;

export { CragTableColumns, CragTableContext };
export default CragTable;
