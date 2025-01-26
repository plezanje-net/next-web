import Dialog from "@/components/ui/dialog";
import { Crag } from "@/graphql/generated";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import deleteCragAction from "../lib/delete-crag-action";


type TDeleteCragDialog = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  crag: Crag;
};

function DeleteCragDialog({ isOpen, setIsOpen, crag }: TDeleteCragDialog) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const cragHasSectors =
    crag.sectors.length > 1 ||
    !!crag.sectors[0]?.name ||
    !!crag.sectors[0]?.label;

  const handleConfirm = async () => {
    setLoading(true);
    await deleteCragAction(crag.id);
    setIsOpen(false);
    setLoading(false);
    router.push(`/`);
  };

  return (
    <Dialog
      title="Brisanje plezališča"
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
        Ali res želiš izbrisati plezališče{" "}
        <span className="font-medium">{crag.name}</span> vključno z vsemi
        {cragHasSectors && <> sektorji in vsemi</>} smermi v njem?
      </>
    </Dialog>
  );
}

export default DeleteCragDialog;
