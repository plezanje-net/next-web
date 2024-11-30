import Dialog from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import deleteRouteAction from "../server-actions/delete-route-action";
import { Route } from "@/graphql/generated";

type TDeleteRouteDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  route: Route;
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
