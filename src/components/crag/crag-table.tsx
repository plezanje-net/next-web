import { useRouter } from "next/router";
import { Crag, Sector } from "../../graphql/generated";
import CragSector from "./crag-sector";
import CragTableActions from "./crag-table-actions";

interface Props {
  crag: Crag;
}

function CragTable({ crag }: Props) {
  const router = useRouter();
  const selectedSector = parseInt(router.query.sector as string) ?? null;

  const toggleSector = (index: number) => {
    router.push({
      pathname: `/plezalisce/${crag.slug}`,
      ...(selectedSector == index ? {} : { query: { sector: index } }),
    });
  };

  return (
    <>
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
    </>
  );
}

export default CragTable;
