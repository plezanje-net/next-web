import Dialog from "@/components/ui/dialog";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Option, Select } from "@/components/ui/select";
import { Route } from "@/graphql/generated";
import updateRoutesAction from "../lib/update-routes-action";

type TMoveRoutesDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  routes: Route[];
  targetRoutes: Route[];
};

function MoveRoutesDialog({
  isOpen,
  setIsOpen,
  routes,
  targetRoutes,
}: TMoveRoutesDialogProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const [targetPosition, setTargetPosition] = useState("");
  const [targetPositionError, setTargetPositionError] = useState("");

  const resetForm = () => {
    // reset fields
    setTargetPosition("");

    // clear errors
    setTargetPositionError("");
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
    if (!targetPosition) {
      setTargetPositionError("Ciljna smer je obvezen podatek.");
      setLoading(false);
      return;
    }

    // sort routes by their current positions in reverse order (be is 'pushing' what is at current (target) position and below, so we need to reposition routes from the back)
    const routesReversed = [...routes].sort(
      (r1, r2) => r2.position - r1.position
    );

    const routesData = [];
    for (let i = 0; i < routesReversed.length; i++) {
      routesData.push({
        id: routesReversed[i].id,
        position: +targetPosition + 1,
      });
    }

    await updateRoutesAction(routesData);
    resetForm();

    // TODO: check for errors

    setIsOpen(false);
    setLoading(false);
    router.refresh();
  };

  const handleTargetRouteChange = (targetPosition: string) => {
    setTargetPositionError("");
    setTargetPosition(targetPosition);
  };

  return (
    <Dialog
      title="Premik smeri znotraj sektorja"
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
          Izberi smer, za katero želiš premakniti{" "}
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
          <Select
            value={targetPosition}
            onChange={handleTargetRouteChange}
            label="Ciljna smer"
            disabled={loading}
            errorMessage={targetPositionError}
          >
            {[
              <Option key="sol" value="0">
                -- na začetek --
              </Option>,
              ...targetRoutes.map((route) => (
                <Option key={route.id} value={`${route.position}`}>
                  {route.name}
                </Option>
              )),
            ]}
          </Select>
        </div>
      </form>
    </Dialog>
  );
}

export default MoveRoutesDialog;
