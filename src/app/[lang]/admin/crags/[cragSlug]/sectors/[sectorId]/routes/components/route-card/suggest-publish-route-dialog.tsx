import Dialog, { DialogSize } from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Route } from "@/graphql/generated";
import updateRouteAction from "../../server-actions/update-route-action";

type TSuggestPublishRouteDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  route: Route;
};

function SuggestPublishRouteDialog({
  isOpen,
  setIsOpen,
  route,
}: TSuggestPublishRouteDialogProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);

    const routeData = { id: route.id, publishStatus: "in_review" };
    await updateRouteAction(routeData);
    setIsOpen(false);
    setLoading(false);
    router.refresh();
  };

  return (
    <Dialog
      title="Predlog uredništvu"
      dialogSize={DialogSize.medium}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cancel={{ label: "Prekliči", disabled: loading }}
      confirm={{
        label: "Predlagaj objavo",
        callback: handleConfirm,
        dontCloseOnConfirm: true,
        loading: loading,
        disabled: loading,
      }}
    >
      <>
        Ali res želiš uredništvu predlagati objavo smeri{" "}
        <span className="font-medium">{route.name}</span>?
      </>
    </Dialog>
  );
}

export default SuggestPublishRouteDialog;
