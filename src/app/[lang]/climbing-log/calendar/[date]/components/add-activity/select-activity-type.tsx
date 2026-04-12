import ActivityType from "@/components/activity-type";
import IconHint from "@/components/ui/icons/hint";
import Link from "@/components/ui/link";
import { Option, Select } from "@/components/ui/select";
import TextField from "@/components/ui/text-field";
import { gql } from "graphql-request";
import { useState } from "react";

type TActivityTypeProps = {
  type: string;
  customType: string | null;
  customTypes: string[];
  setType: (v: string) => void;
  setCustomType: (v: string | null) => void;
};

type TActivityTypeOption = {
  value: string;
  label: string;
  customType?: string | null;
  hasSeparator?: boolean;
};

function SelectActivityType({
  type,
  setType,
  customType,
  setCustomType,
  customTypes,
}: TActivityTypeProps) {
  const activityTypes: TActivityTypeOption[] = [
    { value: "crag", label: "Crag" },
    { value: "climbingGym", label: "Climbing Gym" },
    { value: "trainingGym", label: "Training Gym" },
    // { value: "peak", label: "Peak" },
    // { value: "iceFall", label: "Ice Fall" },
  ];

  customTypes.forEach((customType, index) => {
    activityTypes.push({
      value: 'other',
      customType,
      label: customType,
      hasSeparator: index === 0
    });
  });

  activityTypes.push({ value: "other", label: "Drugo", hasSeparator: true });

  const [newCustomType, setNewCustomType] = useState("");

  function handleTypeChange(value: string) {
    if (value.startsWith("other:")) {
      const customType = value.split(":")[1];
      setCustomType(customType);
      setType("other");
      return;
    }

    setType(value);
    setCustomType(null);
    setNewCustomType("");
  }

  return (
    <div className="flex flex-col gap-2">
      <Select
        label="Vrsta aktivnosti"
        value={customType && customTypes.find((t) => t === customType)  ? `other:${customType}` : type}
        onChange={handleTypeChange}
        placeholder="Izberi vrsto aktivnosti"
      >
        {activityTypes.map((option) => (
          <Option
            key={option.customType ? `other:${option.customType}` : option.value}
            value={option.customType ? `other:${option.customType}` : option.value}
            separator={option.hasSeparator}
          >
            <ActivityType activityType={option.value} customType={option.customType} variant="full" />
          </Option>
        ))}
      </Select>
      {type == "crag" && (
        <div className="flex gap-2">
          <div>
            <IconHint />
          </div>
          <div>
            Za vnos aktivnosti v skali uporabi stran{" "}
            <Link variant="primary" href="/plezalisca">
              plezališča
            </Link>
            , kjer najprej odkljukaš preplezane smeri. <br />
            <br />
            Če plezališča še ni v naši bazi, ga lahko{" "}
            <Link variant="primary" href="/plezalisca">
              plezališča
            </Link>
            .
          </div>
        </div>
      )}
      {type == "other" && !customTypes.find((t) => t === customType) && (
        <TextField
          value={newCustomType}
          placeholder="vnesi vrsto aktivnosti"
          onChange={setNewCustomType}
          onBlur={() => setCustomType(newCustomType)}
          description="Ob naslednjem vnosu bo možnost na voljo v spustnem seznamu."
        />
      )}
    </div>
  );
}

export default SelectActivityType;
