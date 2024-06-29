import { ReactElement } from "react";
import Dialog, { DialogSize, DialogTitleSize } from "@/components/ui/dialog";
import { useState } from "react";
import LogDate from "./log-date";
import TextField from "../ui/text-field";
import TextArea from "../ui/text-area";
import LogRoutes from "./log-routes";
import { useLogRoutesContext } from "./log-routes-context";
import createActivityAction from "./server-actions/create-activity-action";
import dryRunCreateActivityAction from "./server-actions/dry-run-create-activity-action";
import {
  CreateActivityInput,
  CreateActivityRouteInput,
  SideEffect,
} from "@/graphql/generated";
import dayjs from "dayjs";
import IconArrowRight from "../ui/icons/arrow-right";
import trAscentTypes from "@/utils/constants/tr-ascent-types";
import AscentType from "../ascent-type";
import { useRouter } from "next/navigation";

type TLogDialogProps = {
  openTrigger: ReactElement;
};

function LogDialog({ openTrigger }: TLogDialogProps) {
  const [partners, setPartners] = useState("");
  const [notes, setNotes] = useState("");

  const {
    logDate,
    setLogDate,
    ascentTypesMap,
    crag,
    starRatingVotesMap,
    publishTypesMap,
    difficultyVotesMap,
    logRoutes,
    resetAll,
  } = useLogRoutesContext();

  const router = useRouter();

  const formValid = () => {
    // A routes log 'form' is valid if all routes have at least ascent types selected and date is selected
    return (
      logRoutes.every((route) => !!ascentTypesMap[route.key]) &&
      logDate.day != "dd" &&
      logDate.month != "mm" &&
      logDate.year != "llll"
    );
  };

  const prepareCreateActivityData = () => {
    const activity = {
      date: `${logDate.year}-${logDate.month}-${logDate.day}`,
      partners: partners || null,
      notes: notes || null,
      type: "crag",
      cragId: crag.id,
      name: crag.name,
    };

    const routes = [];
    for (let i = 0; i < logRoutes.length; i++) {
      const route = logRoutes[i];

      const ascentType = ascentTypesMap[route.key];
      const publishType = publishTypesMap[route.key];
      if (!ascentType || !publishType) {
        throw Error("Log form invalid.");
      }

      routes.push({
        date: `${logDate.year}-${logDate.month}-${logDate.day}`,
        partner: partners || null,
        notes: null, // TODO: add notes field to each route
        routeId: route.id,
        ascentType: ascentType.toLowerCase(),
        votedDifficulty: difficultyVotesMap[route.key] || null,
        votedStarRating: starRatingVotesMap[route.key] || null,
        publish: publishType.toLowerCase(),
        position: i, // position of the route within the same activity of ones log
      });
    }

    return { activity, routes };
  };

  const handleConfirmLog = async () => {
    const { activity, routes } = prepareCreateActivityData();

    /**
     * 
     // TODO: should we implement this on FE instead of calling dryRun?
    is this log a tick?
       is the date of this log before the date of first tick?
           -> log will change: type of first tick will become repeat
    
       is the date of this log before the date of first trTick?
           -> log will change: type of first trTick will becomer trRepeat

    is this log a try?
       is the date of this log before the date of first tick?
           is type of first tick onsight or flash
               -> log will change: type of first tick will become redpoint
    
           is type of first trTick trOnsight or trFlash
               -> log will change: type of first trTick will become trRedpoint

    is this log a trTick?
       is the date of this log before the date of first trTick?
           -> log wil change: type of first trTick will become trRepeat
    */

    // TODO: loading/disabled state of dialog while we wait
    const dryRun = await dryRunCreateActivityAction(activity, routes);
    if (dryRun.dryRunCreateActivity.length > 0) {
      // some changes in user's existing log will be triggered if these log routes are logged. user needs to confirm theese changes

      setConfirmDialogData(dryRun.dryRunCreateActivity);
      setLogDialogIsOpen(false);
      setConfirmDialogIsOpen(true);
    } else {
      await saveActivity(activity, routes);
    }
  };

  const handleConfirmConfirm = async () => {
    const { activity, routes } = prepareCreateActivityData();
    await saveActivity(activity, routes);
  };

  const saveActivity = async (
    activity: CreateActivityInput,
    routes: CreateActivityRouteInput[]
  ) => {
    await createActivityAction(activity, routes);
    resetAll();
    router.refresh();
  };

  const [logDialogIsOpen, setLogDialogIsOpen] = useState(false);
  const [confirmDialogIsOpen, setConfirmDialogIsOpen] = useState(false);
  const [confirmDialogData, setConfirmDialogData] = useState<SideEffect[]>([]);

  return (
    <>
      <Dialog
        title="Vnos v plezalni dnevnik"
        openTrigger={openTrigger}
        dialogSize={DialogSize.hug}
        titleSize={DialogTitleSize.large}
        confirm={{
          label: "Shrani",
          callback: handleConfirmLog,
          disabled: !formValid(),
          dontCloseOnConfirm: true,
        }}
        cancel={{
          label: "Prekliči",
        }}
        isOpen={logDialogIsOpen}
        setIsOpen={setLogDialogIsOpen}
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

      <Dialog
        title="Potrditev avtomatske spremembe načinov vzponov"
        dialogSize={DialogSize.large}
        isOpen={confirmDialogIsOpen}
        setIsOpen={setConfirmDialogIsOpen}
        confirm={{
          label: "Potrdi",
          callback: handleConfirmConfirm,
        }}
        cancel={{
          label: "Prekliči",
        }}
      >
        <div>
          <p>
            Nekatere smeri, ki jih želiš vnesti v dnevnik, imaš v dnevniku že
            zabeležene s kasnejšimi datumi vzpona in z načini vzpona, ki so
            glede na trenutni vnos nemogoči.
          </p>
          <p className="mt-6">
            Načini vzponov pri teh vnosih bodo zato avtomatsko spremenjeni kot
            sledi:
          </p>

          <div className="xs:hidden mt-6">
            {confirmDialogData.map(({ before, after }, index) => (
              <table
                key={index}
                className="border-t border-neutral-200 last:border-b w-full table-auto"
              >
                <tbody>
                  <tr>
                    <td className="text-neutral-500 pt-4">Datum:</td>
                    <td className="pl-4 pt-4 w-full">
                      {dayjs(before.date).format("D.M.YYYY")}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-neutral-500">Ime smeri:</td>
                    <td className="pl-4">{before.route.name}</td>
                  </tr>
                  <tr>
                    <td className="text-neutral-500 pb-4 align-top">
                      Sprememba:
                    </td>
                    <td className="pl-4 pb-4">
                      <div className="flex gap-x-2 flex-shrink-0 flex-wrap">
                        <AscentType type={before.ascentType} compact />
                        <div className="flex-shrink-0">
                          <IconArrowRight />
                        </div>
                        <AscentType type={after.ascentType} compact />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
          <div className="xs:block hidden">
            <table className="w-full mt-2">
              <thead>
                <tr className="border-b border-neutral-200 text-left text-neutral-500">
                  <th className="py-4 pl-0 pr-4 font-normal">Datum</th>
                  <th className="py-4 px-4 font-normal">Ime smeri</th>
                  <th className="py-4 pr-0 pl-4 font-normal">
                    <span className="sm:hidden">Sprememba</span>
                    <span className="hidden sm:block">
                      Sprememba načina vzpona
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {confirmDialogData.map(({ before, after }, index) => (
                  <tr
                    key={index}
                    className="border-b border-neutral-200 text-left"
                  >
                    <td className="pl-0 pr-4 py-4">
                      {dayjs(before.date).format("D.M.YYYY")}
                    </td>
                    <td className="px-4 py-4">{before.route.name}</td>
                    <td className="py-4 pr-0 pl-4">
                      <div className="flex gap-2">
                        {trAscentTypes.includes(before.ascentType) &&
                        trAscentTypes.includes(after.ascentType) ? (
                          <>
                            <div className="md:hidden">
                              <AscentType type={before.ascentType} compact />
                            </div>
                            <div className="hidden md:block">
                              <AscentType type={before.ascentType} />
                            </div>
                            <div className="flex-shrink-0">
                              <IconArrowRight />
                            </div>
                            <div className="md:hidden">
                              <AscentType type={after.ascentType} compact />
                            </div>
                            <div className="hidden md:block">
                              <AscentType type={after.ascentType} />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="sm:hidden">
                              <AscentType type={before.ascentType} compact />
                            </div>
                            <div className="hidden sm:block">
                              <AscentType type={before.ascentType} />
                            </div>
                            <div className="flex-shrink-0">
                              <IconArrowRight />
                            </div>
                            <div className="sm:hidden">
                              <AscentType type={after.ascentType} compact />
                            </div>
                            <div className="hidden sm:block">
                              <AscentType type={after.ascentType} />
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Dialog>
    </>
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
