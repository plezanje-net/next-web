import { useRouter } from "next/router";
import { createContext, ReactNode, useState } from "react";
import { Crag, Sector } from "../../graphql/generated";
import IconCheck from "../ui/icons/check";
import IconComment from "../ui/icons/comment";
import IconStarFull from "../ui/icons/star-full";
import CragSector from "./crag-sector";
import CragTableActions from "./crag-table-actions";

interface Props {
  crag: Crag;
}
interface CragTableState {
  selectedSector: number | null;
  combine: boolean;
  selectedColumns: string[];
}

interface CragTableColumn {
  label: string;
  name: string;
  icon?: ReactNode;
  isOptional: boolean;
  isDefault: boolean;
  displayCondition?: () => boolean;
}

interface CragTableContextType {
  state: CragTableState;
  setState: (CragTableState: CragTableState) => void;
}

const CragTableContext = createContext<CragTableContextType>({
  state: {
    selectedSector: null,
    combine: false,
    selectedColumns: [],
  },
  setState: () => {},
});

const CragTableColumns: CragTableColumn[] = [
  {
    name: "select",
    label: "#",
    isOptional: false,
    isDefault: true,
  },
  {
    name: "sector",
    label: "Sektor",
    isOptional: false,
    displayCondition: () => false,
    isDefault: true,
  },
  {
    name: "name",
    label: "Ime",
    isOptional: false,
    isDefault: true,
  },
  {
    name: "difficulty",
    label: "Težavnost",
    isOptional: true,
    isDefault: true,
  },
  {
    name: "length",
    label: "Dolžina",
    isOptional: true,
    isDefault: true,
  },
  {
    name: "nrTicks",
    label: "Št. uspešnih vzponov",
    isOptional: true,
    isDefault: false,
  },
  {
    name: "nrTries",
    label: "Št. poskusov",
    isOptional: true,
    isDefault: false,
  },
  {
    name: "nrClimbers",
    label: "Št. plezalcev",
    isOptional: true,
    isDefault: false,
  },
  {
    name: "starRating",
    label: "Lepota",
    icon: <IconStarFull />,
    isOptional: true,
    isDefault: true,
  },
  {
    name: "comments",
    label: "Komentarji",
    icon: <IconComment />,
    isOptional: true,
    isDefault: true,
  },
  {
    name: "myAscents",
    label: "Moji vzponi",
    icon: <IconCheck />,
    isOptional: true,
    isDefault: true,
  },
];

function CragTable({ crag }: Props) {
  const router = useRouter();
  const selectedSector = parseInt(router.query.sector as string) ?? null;

  const [state, setState] = useState<CragTableState>({
    selectedSector: null,
    combine: false,
    selectedColumns: CragTableColumns.filter(({ isDefault }) => isDefault).map(
      ({ name }) => name
    ),
  });

  const toggleSector = (index: number) => {
    router.push({
      pathname: `/plezalisce/${crag.slug}`,
      ...(selectedSector == index ? {} : { query: { sector: index } }),
    });
  };

  return (
    <CragTableContext.Provider value={{ state, setState }}>
      <CragTableActions />
      <div className="container mx-auto mt-4 md:px-8">
        {crag.sectors.map((sector, index) => (
          <div
            key={sector.id}
            className={`${index > 0 && "border-t border-t-neutral-200"}`}
          >
            <CragSector
              sector={sector as Sector}
              isOpen={index == selectedSector}
              onToggle={() => toggleSector(index)}
            />
          </div>
        ))}
      </div>
    </CragTableContext.Provider>
  );
}

export { CragTableColumns, CragTableContext };
export default CragTable;
