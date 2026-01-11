import Dialog from "@/components/ui/dialog";
import { Sector } from "@/graphql/generated";
import { Dispatch, SetStateAction, useState } from "react";
import deleteSectorAction from "../lib/delete-sector-action";
import { useRouter } from "next/navigation";
import { labelAndNameToString } from "@/lib/sector-helpers";

type TDeleteSectorDialog = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  sector: Sector;
};

function DeleteSectorDialog({
  isOpen,
  setIsOpen,
  sector,
}: TDeleteSectorDialog) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await deleteSectorAction(sector.id);
    setIsOpen(false);
    setLoading(false);
    router.refresh();
  };

  return (
    <Dialog
      title="Brisanje sektorja"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cancel={{ label: "Prekliči", disabled: loading }}
      confirm={{
        label: "Izbriši",
        callback: handleConfirm,
        dontCloseOnConfirm: true,
        loading: loading,
        disabled: loading,
      }}
    >
      <>
        Ali res želiš izbrisati sektor{" "}
        <span className="font-medium">
          {/* Dep.: sector.label is deprecated. remove after removed in BE */}
          {labelAndNameToString(sector.label, sector.name)}
        </span>{" "}
        in vse smeri v njem?
      </>
    </Dialog>
  );
}

export default DeleteSectorDialog;
