import IconPlus from "@/components/ui/icons/plus";
import SectorDialog from "./sector-dialog";
import { useState } from "react";

type TNewFirstSectorButtonProps = {
  cragId: string;
  disabled: boolean;
};

function NewFirstSectorButton({
  cragId,
  disabled,
}: TNewFirstSectorButtonProps) {
  const [sectorDialogIsOpen, setSectorDialogIsOpen] = useState(false);

  return (
    <>
      <div className="h-18 flex items-stretch">
        <button
          disabled={disabled}
          className={`w-full flex justify-end items-center border border-dashed rounded-lg px-4 outline-none focus-visible:ring focus-visible:ring-blue-100  ${disabled ? "text-neutral-400 border-neutral-300" : "text-neutral-500 hover:border-neutral-500 hover:text-neutral-600 active:text-neutral-700 active:border-neutral-600 border-neutral-400"}`}
          onClick={() => setSectorDialogIsOpen(true)}
        >
          <span className="mr-2">dodaj sektor na začetek</span>
          <IconPlus />
        </button>
      </div>

      <SectorDialog
        formType="new"
        isOpen={sectorDialogIsOpen}
        setIsOpen={setSectorDialogIsOpen}
        position={0}
        cragId={cragId}
      />
    </>
  );
}

export default NewFirstSectorButton;
