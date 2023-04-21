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
import Button from "../ui/button";
import IconCheck from "../ui/icons/check";
import IconClose from "../ui/icons/close";
import IconComment from "../ui/icons/comment";
import IconStarFull from "../ui/icons/star-full";
import TextField from "../ui/text-field";
import CragRoutes from "./crag-routes";
import CragSector from "./crag-sector";
import CragTableActions from "./crag-table-actions";

interface Props {
  crag: Crag;
}

export interface FilterOptions {
  routesTouches?: "ticked" | "tried" | "unticked" | "untried";
  difficulty?: { from: number; to: number };
  starRating?: {
    marvelous: boolean;
    beautiful: boolean;
    unremarkable: boolean;
  };
}

export interface SortOptions {
  column: string;
  direction: "asc" | "desc";
}

interface CragTableState {
  compact: boolean;
  combine: boolean;
  selectedColumns: string[];
  search?: string;
  filter?: FilterOptions;
  sort?: SortOptions;
}

interface CragTableColumn {
  label: string;
  labelShort?: string;
  sortLabel?: string;
  sortAscLabel?: string;
  sortDescLabel?: string;
  excludeFromSort?: boolean;
  name: string;
  icon?: ReactNode;
  isOptional: boolean;
  isDefault: boolean;
  displayCondition?: () => boolean;
  width: number;
  defaultSortDirection?: number;
}

// TODO: lowercase param name?
interface CragTableContextType {
  state: CragTableState;
  setState: (CragTableState: CragTableState) => void;
}

const CragTableContext = createContext<CragTableContextType>({
  state: {
    compact: true,
    combine: false,
    selectedColumns: [],
  },
  setState: () => {},
});

// TODO: lowercase var name??

const CragTableColumns: CragTableColumn[] = [
  {
    name: "select",
    label: "#",
    sortLabel: "",
    sortAscLabel: "Od leve proti desni",
    sortDescLabel: "Od desne proti levi",
    isOptional: false,
    isDefault: true,
    //TODO: is defaultSordDirection still being used?
    defaultSortDirection: 1,
    width: 64,
  },
  {
    name: "sector",
    label: "Sektor",
    isOptional: false,
    displayCondition: () => false,
    isDefault: true,
    excludeFromSort: true,
    width: 100,
  },
  {
    name: "name",
    label: "Ime",
    sortLabel: "Po abecedi",
    sortAscLabel: "naraščajoče",
    sortDescLabel: "padajoče",
    isOptional: false,
    isDefault: true,
    defaultSortDirection: 1,
    width: 100,
  },
  {
    name: "difficulty",
    label: "Težavnost",
    sortLabel: "Po težavnosti",
    sortAscLabel: "naraščajoče",
    sortDescLabel: "padajoče",
    isOptional: true,
    isDefault: true,
    defaultSortDirection: 1,
    width: 130,
  },
  {
    name: "length",
    label: "Dolžina",
    sortLabel: "Po dolžini",
    sortAscLabel: "naraščajoče",
    sortDescLabel: "padajoče",
    isOptional: true,
    isDefault: true,
    defaultSortDirection: 1,
    width: 100,
  },
  {
    name: "nrTicks",
    label: "Št. uspešnih vzponov",
    labelShort: "Št. vzponov",
    sortLabel: "Po št. vzponov",
    sortAscLabel: "naraščajoče",
    sortDescLabel: "padajoče",
    isOptional: true,
    isDefault: false,
    defaultSortDirection: -1,
    width: 160,
  },
  {
    name: "nrTries",
    label: "Št. poskusov",
    sortLabel: "Po št. poskusov",
    sortAscLabel: "naraščajoče",
    sortDescLabel: "padajoče",
    isOptional: true,
    isDefault: false,
    defaultSortDirection: -1,
    width: 100,
  },
  {
    name: "nrClimbers",
    label: "Št. plezalcev",
    sortLabel: "Po št. plezalcev",
    sortAscLabel: "naraščajoče",
    sortDescLabel: "padajoče",
    isOptional: true,
    isDefault: false,
    defaultSortDirection: -1,
    width: 99,
  },
  {
    name: "starRating",
    label: "Lepota",
    sortLabel: "Po lepoti",
    sortAscLabel: "naraščajoče",
    sortDescLabel: "padajoče",
    icon: <IconStarFull />,
    isOptional: true,
    isDefault: true,
    defaultSortDirection: -1,
    width: 52,
  },
  {
    name: "comments",
    label: "Komentarji",
    sortLabel: "",
    sortAscLabel: "S komentarji najprej",
    sortDescLabel: "Brez komentarjev najprej",
    icon: <IconComment />,
    isOptional: true,
    isDefault: true,
    defaultSortDirection: -1,
    width: 52,
  },
  {
    name: "myAscents",
    label: "Moji vzponi",
    sortLabel: "",
    sortAscLabel: "Z mojimi vzponi najprej",
    sortDescLabel: "Brez mojih vzponov najprej",
    icon: <IconCheck />,
    isOptional: true,
    isDefault: true,
    defaultSortDirection: -1,
    width: 52,
  },
];

function CragTable({ crag }: Props) {
  const router = useRouter();
  const selectedSector = parseInt(router.query.sector as string) ?? null;

  const [state, setState] = useState<CragTableState>({
    compact: true,
    combine: false,
    selectedColumns: CragTableColumns.filter(({ isDefault }) => isDefault).map(
      ({ name }) => name
    ),
  });

  const [compact, setCompact] = useState(true);
  const [breakpoint, setBreakpoint] = useState(500);

  const toggleSector = (index: number) => {
    router.push({
      pathname: `/plezalisce/${crag.slug}`,
      ...(selectedSector == index + 1 ? {} : { query: { sector: index + 1 } }),
    });
  };

  // Load user's crag summary if logged in and after server-side render
  const [ascents, setAscents] = useState<Map<string, string>>(new Map());
  const authCtx = useAuth();
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
  useEffect(() => {
    setBreakpoint(
      CragTableColumns.filter((c) =>
        state.selectedColumns.includes(c.name)
      ).reduce((acc, c) => acc + c.width, 0)
    );
  }, [state.selectedColumns, state.selectedColumns.length]);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setCompact((containerRef.current?.offsetWidth ?? 0) <= breakpoint);
    });
    resizeObserver.observe(document.body);
  });

  useEffect(() => {
    setState((state) => ({ ...state, compact }));
  }, [compact]);

  // Search
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce<string>(search, 500);

  useEffect(() => {
    setState((state) => ({ ...state, search: debouncedSearch }));
  }, [debouncedSearch]);

  return (
    <div ref={containerRef}>
      <CragTableContext.Provider value={{ state, setState }}>
        <CragTableActions />
        {/* TODO: clean up */}
        {/* <div className="container mx-auto mt-4 flex justify-end sm:px-8">
          <div className="w-80">
            <TextField
              placeholder="Poišči v seznamu"
              aria-label="Poišči v seznamu"
              onChange={setSearch}
              value={search}
              suffix={
                search != "" && <ClearSearch onClick={() => setSearch("")} />
              }
            />
          </div>
        </div> */}
        <div className="container mx-auto mt-4 sm:px-8">
          {router.query.combine ||
          state.search != "" ||
          crag.sectors.length == 1 ? (
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
                <CragSector
                  crag={crag}
                  sector={sector as Sector}
                  ascents={ascents}
                  isOpen={index + 1 == selectedSector}
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
