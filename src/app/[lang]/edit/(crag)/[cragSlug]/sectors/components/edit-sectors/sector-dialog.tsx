import Dialog, { DialogTitleSize } from "@/components/ui/dialog";
import TextField from "@/components/ui/text-field";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import createSectorAction from "../../server-actions/create-sector-action";
import { useRouter } from "next/navigation";
import updateSectorAction from "../../server-actions/update-sector-action";
import { Sector } from "@/graphql/generated";

type TSectorDialogProps = {
  formType: "new" | "edit";
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  position?: number;
  cragId: string;
  sector?: Sector;
};

function SectorDialog({
  formType,
  isOpen,
  setIsOpen,
  position,
  cragId,
  sector,
}: TSectorDialogProps) {
  const router = useRouter();
  const [name, setName] = useState("");

  // sync name if this is an edit
  useEffect(() => {
    setName(formType === "edit" && sector ? sector.name : "");
  }, [sector, formType]);

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

  const handleConfirm = async () => {
    setLoading(true);

    // validate form
    if (!name) {
      setNameError("Ime sektorja je obvezen podatek.");
      setLoading(false);
      return;
    }

    const sectorData = {
      name: name,
      label: "",
    };

    switch (formType) {
      case "new":
        // TODO: either this guard or ! bellow... 🤷‍♂️
        if (!position) {
          throw new Error("position is required in new sector dialog");
        }

        const newSectorData = {
          ...sectorData,
          cragId: cragId,
          position: position!,
          // position: position!,
          publishStatus: "draft",
        };
        await createSectorAction(newSectorData);
        break;

      case "edit":
        // TODO: either this guard or ! bellow... 🤷‍♂️
        if (!sector) {
          throw new Error("sector is required in edit sector dialog");
        }

        const updateSectorData = {
          ...sectorData,
          id: sector.id,
          // id: sector!.id,
        };
        await updateSectorAction(updateSectorData);
        break;
    }

    // TODO: check for errors

    // reset form state and close dialog
    setName("");
    setIsOpen(false);
    setLoading(false);

    router.refresh();
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleConfirm();
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
      titleSize={DialogTitleSize.large}
    >
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Ime sektorja"
          value={name}
          onChange={handleNameChange}
          autoFocus
          disabled={loading}
          errorMessage={nameError}
        />
      </form>
    </Dialog>
  );
}

export default SectorDialog;
