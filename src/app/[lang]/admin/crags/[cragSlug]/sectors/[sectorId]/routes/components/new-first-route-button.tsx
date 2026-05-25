import IconPlus from "@/components/ui/icons/plus";
import RouteDialog from "./route-card/route-dialog";
import { useState } from "react";

type TNewFirstRouteButtonProps = {
  sectorId: string;
  disabled: boolean;
};
function NewFirstRouteButton({
  sectorId,
  disabled,
}: TNewFirstRouteButtonProps) {
  const [newRouteDialogIsOpen, setNewRouteDialogIsOpen] = useState(false);

  return (
    <>
      <div className="h-12 flex items-stretch">
        <button
          disabled={disabled}
          className={`w-full flex justify-end items-center border border-dashed rounded-lg px-4 outline-none focus-visible:ring focus-visible:ring-blue-100  ${disabled ? "text-neutral-400 border-neutral-300" : "text-neutral-500 hover:border-neutral-500 hover:text-neutral-600 active:text-neutral-700 active:border-neutral-600 border-neutral-400"}`}
          onClick={() => setNewRouteDialogIsOpen(true)}
        >
          <span className="mr-2">dodaj smer na začetek</span>
          <IconPlus />
        </button>
      </div>

      <RouteDialog
        formType="new"
        isOpen={newRouteDialogIsOpen}
        setIsOpen={setNewRouteDialogIsOpen}
        position={0}
        sectorId={sectorId}
      />
    </>
  );
}

export default NewFirstRouteButton;
