"use client";

import Button from "@/components/ui/button";
import Dialog, { DialogSize } from "@/components/ui/dialog";
import IconPlus from "@/components/ui/icons/plus";
import ActivityDate from "./activity-date";
import { useState } from "react";
import { TDateString } from "@/components/ui/date-picker";
import SelectActivityType from "./select-activity-type";
import Combobox from "@/components/ui/combobox";
import TextField from "@/components/ui/text-field";
import ActivityDuration from "./activity-duration";
import TextArea from "@/components/ui/text-area";

type TAddActivityProps = {
  date: TDateString;
};

function AddActivity({ date }: TAddActivityProps) {
  const [activityDate, setActivityDate] = useState(date);
  const [activityType, setActivityType] = useState("");
  const [activityCustomType, setActivityCustomType] = useState<string | null>(
    null
  );
  const [activityLocation, setActivityLocation] = useState("");
  const [activityDuraton, setActivityDuration] = useState<number | null>(null);
  const [activityNotes, setActivityNotes] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function clearForm() {
    setActivityDate(date);
    setActivityType("");
    setActivityCustomType(null);
    setActivityLocation("");
    setActivityDuration(null);
    setActivityNotes("");
  }

  function handleConfirm() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
    }, 3000);
  }

  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Dodajanje aktivnosti"
      openTrigger={
        <Button variant="quaternary">
          <span className="flex">
            <IconPlus />
            <span className="ml-2">Dodaj aktivnost</span>
          </span>
        </Button>
      }
      dialogSize={DialogSize.large}
      confirm={{
        label: "Shrani",
        callback: handleConfirm,
        disabled: isLoading,
        loading: isLoading,
        dontCloseOnConfirm: true,
      }}
      cancel={{ label: "Prekliči" }}
      closeCallback={clearForm}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-4">
          <div className="flex-1">
            <ActivityDate value={activityDate} setValue={setActivityDate} />
          </div>
          <div className="flex-1">
            <SelectActivityType
              type={activityType}
              setType={setActivityType}
              customType={activityCustomType}
              setCustomType={setActivityCustomType}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-4">
          <div className="flex-1">
            <TextField
              label="Lokacija"
              placeholder="Kje"
              value={activityLocation}
              onChange={setActivityLocation}
            />
          </div>
          <div className="flex-1 flex gap-2">
            <ActivityDuration
              value={activityDuraton}
              setValue={setActivityDuration}
            />
          </div>
        </div>
        <div>
          <TextArea
            label="Opis aktivnosti"
            placeholder="Opombe ali dodaten opis, povzetek aktivnosti, treninga,. ..."
            value={activityNotes}
            onChange={setActivityNotes}
          />
        </div>
      </div>
    </Dialog>
  );
}

export default AddActivity;
