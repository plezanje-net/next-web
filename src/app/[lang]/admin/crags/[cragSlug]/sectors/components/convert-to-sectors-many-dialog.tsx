import Dialog from "@/components/ui/dialog";
import TextField from "@/components/ui/text-field";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import updateSectorAction from "../server-actions/update-sector-action";
import { Sector } from "@/graphql/generated";

type TConvertToSectorsManyDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  sector: Sector;
};

function ConvertToSectorsManyDialog({
  isOpen,
  setIsOpen,
  sector,
}: TConvertToSectorsManyDialogProps) {
  const router = useRouter();
  const [name, setName] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNameChange = (name: string) => {
    setNameError("");
    setName(name);
  };

  const handleCancel = () => {
    // reset form state
    setName("");
    setNameError("");
  };

  const handleConfirm = () => {
    formRef.current?.requestSubmit();
  };

  const handleFormAction = async () => {
    setLoading(true);

    // validate form
    if (!name) {
      setNameError("Ime sektorja je obvezen podatek.");
      setLoading(false);
      return;
    }

    const updateSectorData = {
      id: sector.id,
      name: name,
      label: "",
    };

    await updateSectorAction(updateSectorData);

    // TODO: check for errors

    // reset form state and close dialog
    setIsOpen(false);
    setLoading(false);

    router.refresh();
  };

  return (
    <Dialog
      title="Dodajanje sektorja"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cancel={{
        label: "Prekliči",
        callback: handleCancel,
        disabled: loading,
      }}
      confirm={{
        label: "Shrani",
        callback: handleConfirm,
        loading: loading,
        disabled: loading,
        dontCloseOnConfirm: true,
      }}
    >
      <form action={handleFormAction} ref={formRef}>
        <div>
          Vse smeri v plezališču bodo premaknjene v novo ustvarjen sektor.
        </div>

        <div className="mt-4">
          <TextField
            label="Ime sektorja"
            value={name}
            onChange={handleNameChange}
            autoFocus
            disabled={loading}
            errorMessage={nameError}
          />
        </div>
      </form>
    </Dialog>
  );
}

export default ConvertToSectorsManyDialog;
