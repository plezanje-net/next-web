import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Crag, Route, Sector } from "../../graphql/generated";
import IconCheck from "../ui/icons/check";
import IconComment from "../ui/icons/comment";
import IconStarFull from "../ui/icons/star-full";
import CragRoutes from "./crag-routes";
import CragSector from "./crag-sector";
import CragTableActions from "./crag-table-actions";

interface Props {
  crag: Crag;
}
interface CragTableState {
  compact: boolean;
  combine: boolean; //
  selectedColumns: string[];
  search: string | null;
  // filters
}

interface CragTableColumn {
  label: string;
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
    compact: true,
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
  const selectedSector = parseInt(router.query.sector as string) ?? null;

  const [state, setState] = useState<CragTableState>({
    compact: true,
    combine: false,
    search: null,
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

  return (
    <div ref={containerRef}>
      <CragTableContext.Provider value={{ state, setState }}>
        <CragTableActions />
        <div className="container mx-auto mt-4 sm:px-8">
          {router.query.combine ? (
            <CragRoutes
              crag={crag}
              routes={crag.sectors.reduce(
                (acc: Route[], sector) => [...acc, ...sector.routes],
                []
              )}
            />
          ) : (
            crag.sectors.map((sector, index) => (
              <div
                key={sector.id}
                className={`${index > 0 && "border-t border-t-neutral-200"}`}
              >
                <CragSector
                  crag={crag}
                  sector={sector as Sector}
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

export { CragTableColumns, CragTableContext };
export default CragTable;
