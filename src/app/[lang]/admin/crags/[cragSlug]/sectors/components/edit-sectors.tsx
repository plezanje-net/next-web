import { Crag, User } from "@/graphql/generated";
import EditSectorsNone from "./edit-sectors-none";
import EditSectorsMany from "./edit-sectors-many";

type TEditCragSectorsProps = {
  crag: Crag;
  loggedInUserIsEditor: boolean;
  loggedInUser: User | undefined;
};

function EditSectors({
  crag,
  loggedInUser,
  loggedInUserIsEditor,
}: TEditCragSectorsProps) {
  // Dep: crag.label is deprecated. remove it's use after api is updated and labels migrated into name
  const cragHasSectors =
    crag.sectors.length > 1 ||
    !!crag.sectors[0]?.name ||
    !!crag.sectors[0]?.label;

  return (
    <div className="px-4 xs:px-8">
      {cragHasSectors ? (
        <EditSectorsMany
          sectors={crag.sectors}
          cragId={crag.id}
          loggedInUserIsEditor={loggedInUserIsEditor}
          loggedInUser={loggedInUser}
        />
      ) : (
        <EditSectorsNone
          dummySector={crag.sectors[0]}
          loggedInUserIsEditor={loggedInUserIsEditor}
          loggedInUser={loggedInUser}
        />
      )}
    </div>
  );
}

export default EditSectors;
