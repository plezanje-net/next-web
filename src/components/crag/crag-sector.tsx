import { useContext } from "react";
import { Sector } from "../../graphql/generated";
import Accordion from "../ui/accordion";
import CragRoute from "./crag-route";
import CragRouteCompact from "./crag-route-compact";
import { CragTableColumns, CragTableContext } from "./crag-table";

interface Props {
  sector: Sector;
  onToggle: () => void;
  isOpen: boolean;
}

function CragSector({ sector, isOpen, onToggle }: Props) {
  let compact = false; // move to state?

  const { state } = useContext(CragTableContext);

  return (
    <Accordion
      label={[sector.label, sector.name]
        .filter((part) => part != "")
        .join(" - ")}
      isOpen={isOpen}
      onClick={onToggle}
    >
      <div className="md:mx-4">
        {!compact ? (
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
                    {column.icon ? column.icon : column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sector.routes.map((route) => (
                <CragRoute key={route.id} route={route} />
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            {sector.routes.map((route) => (
              <CragRouteCompact key={route.id} route={route} />
            ))}
          </div>
        )}
      </div>
    </Accordion>
  );
}

export default CragSector;
