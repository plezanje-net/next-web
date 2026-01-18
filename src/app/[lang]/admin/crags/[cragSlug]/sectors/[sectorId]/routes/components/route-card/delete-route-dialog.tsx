import Dialog from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import deleteRouteAction from "../../lib/delete-route-action";
import { EditRoutesPageSectorQuery } from "@/graphql/generated";

type TDeleteRouteDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  route: EditRoutesPageSectorQuery["sector"]["routes"][number];
};

function DeleteRouteDialog({
  isOpen,
  setIsOpen,
  route,
}: TDeleteRouteDialogProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await deleteRouteAction(route.id);
    setIsOpen(false);
    setLoading(false);
    router.refresh();
  };

  return (
    <Dialog
      title="Brisanje smeri"
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
        Ali res želiš izbrisati smer{" "}
        <span className="font-medium">{route.name}</span>?
      </>
    </Dialog>
  );
}

export default DeleteRouteDialog;
