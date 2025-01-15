import { Crag } from "@/graphql/generated";
import EditSectorsNone from "./edit-sectors-none";
import EditSectorsMany from "./edit-sectors-many";

type TEditCragSectorsProps = {
  crag: Crag;
};

function EditSectors({ crag }: TEditCragSectorsProps) {
  // Dep: crag.label is deprecated. remove it's use after api is updated and labels migrated into name
  const cragHasSectors =
    crag.sectors.length > 1 ||
    !!crag.sectors[0]?.name ||
    !!crag.sectors[0]?.label;

  return (
    <div className="px-4 xs:px-8 2xl:container mx-auto">
      {cragHasSectors ? (
        <EditSectorsMany sectors={crag.sectors} cragId={crag.id} />
      ) : (
        <EditSectorsNone dummySector={crag.sectors[0]} />
      )}
    </div>
  );
}

export default EditSectors;
