import { ReactElement } from "react";
import { TDate } from "@/components/ui/date-picker";
import Dialog, { DialogSize, DialogTitleSize } from "@/components/ui/dialog";
import { useState } from "react";
import LogDate from "./log-date";
import TextField from "../ui/text-field";
import TextArea from "../ui/text-area";
import LogRoutes from "./log-routes";
import { useLogRoutesContext } from "./log-routes-context";

type TLogDialogProps = {
  openTrigger: ReactElement;
};

function LogDialog({ openTrigger }: TLogDialogProps) {
  const [logDate, setLogDate] = useState<TDate>({
    day: "dd",
    month: "mm",
    year: "llll",
  });

  const [partners, setPartners] = useState("");
  const [notes, setNotes] = useState("");

  const logRoutesContext = useLogRoutesContext();

  const handleSave = () => {
    const {
      crag,
      logRoutes,
      ascentTypes,
      starRatingVotes,
      publishTypes,
      difficultyVotes,
    } = logRoutesContext;

    const activity = {
      date: `${logDate.year}-${logDate.month}-${logDate.day}`,
      name: crag.name,
      type: "crag",
      notes: notes || null,
      partners: partners || null,
      cragId: crag.id,
    };

    const routes = logRoutes.map((route, index) => ({
      date: `${logDate.year}-${logDate.month}-${logDate.day}`,
      partner: partners || null,
      notes: "", // TODO: add notes to each route
      routeId: route.id,
      ascentType: ascentTypes[route.key],
      votedStarRating: starRatingVotes[route.key],
      publish: publishTypes[route.key],
      votedDifficulty: difficultyVotes[route.key],
      position: index, // position of the route within the same activity of ones log
    }));

    console.log("Save: ", activity, routes);
  };

  const formValid = () => {
    // A routes log 'form' is valid if all routes have at least ascent types selected and date is selected
    const { logRoutes, ascentTypes } = logRoutesContext;
    return (
      logRoutes.every((route) => !!ascentTypes[route.key]) &&
      logDate.day != "dd" &&
      logDate.month != "mm" &&
      logDate.year != "llll"
    );
  };

  return (
    <Dialog
      title="Vnos v plezalni dnevnik"
      openTrigger={openTrigger}
      dialogSize={DialogSize.hug}
      titleSize={DialogTitleSize.large}
      confirm={{
        label: "Shrani",
        callback: handleSave,
        disabled: !formValid(),
      }}
      cancel={{ label: "Prekliči" }}
    >
      <>
        <div className="flex gap-4 flex-col xs:flex-row">
          <div className="flex-1">
            <LogDate value={logDate} setValue={setLogDate} />
          </div>

          <div className="flex-1">
            <TextField
              value={partners}
              onChange={setPartners}
              label="Soplezalci"
              placeholder="Vnesi soplezalce"
            />
          </div>
        </div>

        <div className="mt-6">
          <TextArea
            value={notes}
            onChange={setNotes}
            label="Opombe"
            placeholder="Vnesi opombe"
            description="Opombe bodo vidne samo tebi."
          />
        </div>

        <div className="mt-8"></div>

        <LogRoutes />
      </>
    </Dialog>
  );
}

export default LogDialog;

// TODO: save to localstorage last log date when a log is confirmed
// const lld = yesterday.subtract(4, "day");
// localStorage.setItem(
//   "last-log-date",
//   JSON.stringify({
//     day: lld.day(),
//     month: lld.month() + 1,
//     year: lld.year(),
//   })
// );
