import Dialog from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Route } from "@/graphql/generated";
import updateRouteAction from "../../server-actions/update-route-action";
import TextArea from "@/components/ui/text-area";

type TRejectPublishRouteDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  route: Route;
};

function RejectPublishRouteDialog({
  isOpen,
  setIsOpen,
  route,
}: TRejectPublishRouteDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [rejectionMessage, setRejectionMessage] = useState("");
  const [rejectionMessageError, setRejectionMessageError] = useState("");

  const handleRejectionMessageChange = (message: string) => {
    setRejectionMessageError("");
    setRejectionMessage(message);
  };

  const handleConfirm = async () => {
    setLoading(true);

    // Validate form
    //    - rejection message is required
    if (!rejectionMessage) {
      setRejectionMessageError("Razlog za zavrnitev je obvezen podatek.");
      setLoading(false);
      return;
    }

    const routeData = {
      id: route.id,
      publishStatus: "draft",
      rejectionMessage: rejectionMessage,
    };

    await updateRouteAction(routeData);

    setIsOpen(false);
    setLoading(false);
    router.refresh();
  };

  return (
    <Dialog
      title="Zavrnitev objave"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cancel={{ label: "Prekliči", disabled: loading }}
      confirm={{
        label: "Zavrni objavo",
        callback: handleConfirm,
        dontCloseOnConfirm: true,
        loading: loading,
        disabled: loading,
      }}
    >
      <>
        Ali res želiš zavrniti objavo smeri{" "}
        <span className="font-medium">{route.name}</span>?
        <div className="mt-4">
          <TextArea
            value={rejectionMessage}
            onChange={handleRejectionMessageChange}
            label="Razlog za zavrnitev"
            description="Razlog za zavrnitev smeri bo posredovan osebi, ki je predlagala objavo. Na podlagi tega sporočila bo lahko smer uredila tako, da bo primerna za objavo."
            errorMessage={rejectionMessageError}
            isDisabled={loading}
          />
        </div>
      </>
    </Dialog>
  );
}

export default RejectPublishRouteDialog;
