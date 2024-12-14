import Dialog from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Route } from "@/graphql/generated";
import updateRouteAction from "../../server-actions/update-route-action";

type TPublishRouteDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  route: Route;
};

function PublishRouteDialog({
  isOpen,
  setIsOpen,
  route,
}: TPublishRouteDialogProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);

    const routeData = { id: route.id, publishStatus: "published" };

    await updateRouteAction(routeData);

    setIsOpen(false);
    setLoading(false);
    router.refresh();
  };

  return (
    <Dialog
      title="Objava smeri"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cancel={{ label: "Prekliči", disabled: loading }}
      confirm={{
        label: "Objavi",
        callback: handleConfirm,
        dontCloseOnConfirm: true,
        loading: loading,
        disabled: loading,
      }}
    >
      <>
        Ali res želiš objaviti smer{" "}
        <span className="font-medium">{route.name}</span>?
      </>
    </Dialog>
  );
}

export default PublishRouteDialog;
