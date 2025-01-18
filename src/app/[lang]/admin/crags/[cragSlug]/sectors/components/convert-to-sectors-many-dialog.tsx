import Dialog from "@/components/ui/dialog";
import TextField from "@/components/ui/text-field";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import updateSectorAction from "../server-actions/update-sector-action";
import { Crag, Sector } from "@/graphql/generated";
import createSectorAction from "../server-actions/create-sector-action";

type TConvertToSectorsManyDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dummySector: Sector | null;
  crag: Crag;
};

function ConvertToSectorsManyDialog({
  isOpen,
  setIsOpen,
  dummySector,
  crag,
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

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // validate form
    if (!name) {
      setNameError("Ime sektorja je obvezen podatek.");
      setLoading(false);
      return;
    }

    // We have two cases here:
    // 1. Crag has no sector -> a new sector has to be created.
    // 2. Crag has a (nameless) dummy sector -> dummy sector just needs to be renamed.
    if (dummySector === null) {
      const newSectorData = {
        name: name,
        label: "",
        cragId: crag.id,
        position: 0,
        publishStatus: "draft",
      };
      await createSectorAction(newSectorData);
    } else {
      const updateSectorData = {
        id: dummySector.id,
        name: name,
        label: "",
      };
      await updateSectorAction(updateSectorData);
    }

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
      <form onSubmit={handleOnSubmit} ref={formRef}>
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
