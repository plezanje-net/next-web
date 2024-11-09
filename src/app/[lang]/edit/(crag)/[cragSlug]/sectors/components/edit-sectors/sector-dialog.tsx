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

type TSectorDialogBaseProps = {
  formType: "new" | "edit";
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

type TNewSectorDialogProps = TSectorDialogBaseProps & {
  formType: "new";
  position: number;
  cragId: string;

  sector?: never;
};

type TEditSectorDialogProps = TSectorDialogBaseProps & {
  formType: "edit";
  sector: Sector;

  position?: never;
  cragId?: never;
};

type TSectorDialogProps = TNewSectorDialogProps | TEditSectorDialogProps;

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

  // set appropriate default
  useEffect(() => {
    if (formType === "edit") {
      setName(sector.name);
    } else {
      setName("");
    }
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
        const newSectorData = {
          ...sectorData,
          cragId: cragId,
          position: position,
          publishStatus: "draft",
        };
        await createSectorAction(newSectorData);
        break;

      case "edit":
        const updateSectorData = {
          ...sectorData,
          id: sector.id,
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
      // titleSize={DialogTitleSize.large}
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
