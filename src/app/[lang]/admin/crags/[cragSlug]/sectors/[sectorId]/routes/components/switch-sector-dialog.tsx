import Dialog from "@/components/ui/dialog";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Option, Select } from "@/components/ui/select";
import { Route, Sector } from "@/graphql/generated";
import moveRoutesToSectorAction from "../lib/move-routes-to-sector-action";
import { labelAndNameToString } from "@/lib/sector-helpers";

type TSwitchSectorDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  routes: Route[];
  targetSectors: Sector[];
};

function SwitchSectorDialog({
  isOpen,
  setIsOpen,
  routes,
  targetSectors,
}: TSwitchSectorDialogProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const [targetSector, setTargetSector] = useState("");
  const [targetSectorError, setTargetSectorError] = useState("");

  const handleTargetSectorChange = (targetSector: string) => {
    setTargetSectorError("");
    setTargetSector(targetSector);
  };

  const resetForm = () => {
    // reset fields
    setTargetSector("");

    // clear errors
    setTargetSectorError("");
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleConfirm = async () => {
    formRef.current?.requestSubmit();
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    //    - sector is required
    if (!targetSector) {
      setTargetSectorError("Ciljni sektor je obvezen podatek.");
      setLoading(false);
      return;
    }

    // assuming all routes passed in are sorted by position already
    const routesData = {
      ids: routes.map((route) => route.id),
      sectorId: targetSector,
    };

    await moveRoutesToSectorAction(routesData);
    resetForm();

    // TODO: check for errors

    setIsOpen(false);
    setLoading(false);
    router.refresh();
  };

  return (
    <Dialog
      title="Premik smeri v drug sektor"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cancel={{
        label: "Prekliči",
        callback: handleCancel,
        disabled: loading,
      }}
      confirm={{
        label: "Premakni",
        callback: handleConfirm,
        loading: loading,
        disabled: loading,
        dontCloseOnConfirm: true,
      }}
    >
      <form onSubmit={handleOnSubmit} ref={formRef}>
        <div>
          Izberi sektor, v katerega želiš premakniti{" "}
          {routes.length == 1 ? (
            <span>
              smer <span className="font-medium">{routes[0].name}</span>
            </span>
          ) : (
            <span>vse označene smeri</span>
          )}
          .
        </div>

        <div className="mt-4">
          {/* Dep.: remove sector label after it is removed from BE  */}
          <Select
            value={targetSector}
            onChange={handleTargetSectorChange}
            label="Ciljni sektor"
            disabled={loading}
            errorMessage={targetSectorError}
          >
            {targetSectors.map((sector) => (
              <Option key={sector.id} value={sector.id}>
                <>{labelAndNameToString(sector.label, sector.name)}</>
              </Option>
            ))}
          </Select>
        </div>
      </form>
    </Dialog>
  );
}

export default SwitchSectorDialog;
