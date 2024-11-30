import Dialog from "@/components/ui/dialog";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Route } from "@/graphql/generated";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { difficultyToGrade } from "@/utils/grade-helpers";
import displayDate from "@/utils/display-date";
import mergeRoutesAction from "../server-actions/merge-routes-action";

type TMergeRoutesDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  routes: Route[];
};

function MergeRoutesDialog({
  isOpen,
  setIsOpen,
  routes,
}: TMergeRoutesDialogProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const [mainRouteId, setMainRouteId] = useState("");
  const [mainRouteError, setMainRouteError] = useState("");

  const handleMainRouteChange = (mainRouteId: string) => {
    setMainRouteError("");
    setMainRouteId(mainRouteId);
  };

  const resetForm = () => {
    // reset fields
    setMainRouteId("");

    // clear errors
    setMainRouteError("");
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
    //    - main route is required
    if (!mainRouteId) {
      setMainRouteError("'Glavna smer' je obvezen podatek.");
      setLoading(false);
      return;
    }

    // target route is 'main route'. that is, the route that will be 'kept'
    // source route is the route to be deleted and from which related entities are transfered (votes, comments, images, ...)
    const mergeRoutesData = {
      sourceRouteId: mainRouteId != routes[0].id ? routes[0].id : routes[1].id,
      targetRouteId: mainRouteId,
    };

    await mergeRoutesAction(mergeRoutesData);

    resetForm();

    // TODO: check for errors

    setIsOpen(false);
    setLoading(false);
    router.refresh();
  };

  return (
    <Dialog
      title="Združevanje dveh smeri"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cancel={{
        label: "Prekliči",
        callback: handleCancel,
        disabled: loading,
      }}
      confirm={{
        label: "Združi",
        callback: handleConfirm,
        loading: loading,
        disabled: loading,
        dontCloseOnConfirm: true,
      }}
    >
      <form onSubmit={handleOnSubmit} ref={formRef}>
        <div>
          Izberi 'glavno smer' v kateri se bodo združili podatki obeh smeri.
        </div>

        <div className="mt-6">
          <RadioGroup
            value={mainRouteId}
            onChange={(mainRouteId) => {
              handleMainRouteChange(mainRouteId);
            }}
            label="Glavna smer"
            description="Komentarji, vzponi, glasovi  in fotografije se bodo združili. Ime, datum vnosa, bazna ocena, dolžina, avtor in opis se bodo ohranili samo od 'glavne smeri'."
            errorMessage={mainRouteError}
          >
            {routes.map((route) => (
              <Radio value={route.id} key={route.id}>
                {route.name},{" "}
                {
                  difficultyToGrade(
                    route.difficulty || null,
                    route.defaultGradingSystem.id
                  )?.name
                }
                , {displayDate(route.created)}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </form>
    </Dialog>
  );
}

export default MergeRoutesDialog;
