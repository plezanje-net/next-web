import Dialog from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Route } from "@/graphql/generated";
import deleteRoutesAction from "../lib/delete-routes-action";

type TDeleteRoutesDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  routes: Route[];
};

function DeleteRoutesDialog({
  isOpen,
  setIsOpen,
  routes,
}: TDeleteRoutesDialogProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await deleteRoutesAction(routes.map((route) => route.id));
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
        <div>
          Ali res želiš izbrisati{" "}
          {routes.length == 1 ? (
            <span>
              smer <span className="font-medium">{routes[0].name}</span>
            </span>
          ) : (
            <span>vse označene smeri</span>
          )}
          ?
        </div>
      </>
    </Dialog>
  );
}

export default DeleteRoutesDialog;
