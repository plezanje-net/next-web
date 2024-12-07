import Dialog from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import mergeSectorsIntoNoneAction from "../server-actions/merge-sectors-into-none-action";

type TConvertToSectorsNoneDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  cragId: string;
};

function ConvertToSectorsNoneDialog({
  isOpen,
  setIsOpen,
  cragId,
}: TConvertToSectorsNoneDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);

    await mergeSectorsIntoNoneAction(cragId);

    // TODO: check for errors

    // reset form state and close dialog
    setIsOpen(false);
    setLoading(false);

    router.refresh();
  };

  return (
    <Dialog
      title="Ukinitev sektorjev"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cancel={{
        label: "Prekliči",
        disabled: loading,
      }}
      confirm={{
        label: "Ukini sektorje",
        callback: handleConfirm,
        loading: loading,
        disabled: loading,
        dontCloseOnConfirm: true,
      }}
    >
      <>
        <div>
          Vsi sektorji v plezališču bodo izbrisani in smeri premaknjene na nivo
          plezališča.
        </div>

        <div className="mt-4">Ali res želiš ukiniti sektorje?</div>
      </>
    </Dialog>
  );
}

export default ConvertToSectorsNoneDialog;
