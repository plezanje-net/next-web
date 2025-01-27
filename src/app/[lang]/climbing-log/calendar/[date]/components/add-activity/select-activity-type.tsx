import ActivityType from "@/components/activity-type";
import IconHint from "@/components/ui/icons/hint";
import Link from "@/components/ui/link";
import { Option, Select } from "@/components/ui/select";
import TextField from "@/components/ui/text-field";

type TActivityTypeProps = {
  type: string;
  customType: string | null;
  setType: (v: string) => void;
  setCustomType: (v: string | null) => void;
};

function SelectActivityType({
  type,
  setType,
  customType,
  setCustomType,
}: TActivityTypeProps) {
  const acitivtyTypes = [
    "crag",
    "climbingGym",
    "trainingGym",
    // "peak",
    // "iceFall",
    "other",
  ];

  function handleTypeChange(value: string) {
    setType(value);
    if (value != "other") {
      setCustomType(null);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Select
        label="Vrsta aktivnosti"
        value={type}
        onChange={handleTypeChange}
        placeholder="Izberi vrsto aktivnosti"
      >
        {acitivtyTypes.map((option) => (
          <Option key={option} value={option} separator={option == "other"}>
            <ActivityType activityType={option} variant="full" />
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
      {type == "other" && (
        <TextField
          value={customType ?? ""}
          placeholder="vnesi vrsto aktivnosti"
          onChange={setCustomType}
          description="Ob naslednjem vnosu bo možnost na voljo v spustnem seznamu."
        />
      )}
    </div>
  );
}

export default SelectActivityType;
