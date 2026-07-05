import TextField from "@/components/ui/text-field";
import { useEffect, useState } from "react";

type TActivityDurationProps = {
  value: number | null;
  disabled?: boolean;
  setValue: (v: number | null) => void;
};

function ActivityDuration({
  value,
  setValue,
  disabled,
}: TActivityDurationProps) {
  const [hours, setHours] = useState<number | null>(
    value ? Math.floor(value / 60) : null
  );
  const [minutes, setMinutes] = useState<number | null>(
    value ? value % 60 : null
  );

  useEffect(() => {
    setValue(hours || minutes ? (hours ?? 0) * 60 + (minutes ?? 0) : null);
  }, [hours, minutes, setValue]);

  return (
    <div className="flex gap-2 items-end">
      <TextField
        label="Trajanje"
        value={hours ? hours.toString() : ""}
        onChange={(v) => setHours(v ? parseInt(v) : null)}
        suffix={<>h</>}
        disabled={disabled}
      />
      <TextField
        value={minutes ? minutes.toString() : ""}
        onChange={(v) => setMinutes(v ? parseInt(v) : null)}
        suffix={<>min</>}
        disabled={disabled}
      />
    </div>
  );
}

export default ActivityDuration;
