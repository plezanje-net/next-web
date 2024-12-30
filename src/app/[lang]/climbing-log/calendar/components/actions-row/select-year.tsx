import { Option, Select } from "@/components/ui/select";
import dayjs from "dayjs";

type TSelectYearProps = {
  firstEntryYear: number;
  value: number;
  onChange: (value: number) => void;
};

function SelectYear({ firstEntryYear, value, onChange }: TSelectYearProps) {
  const currentYear = dayjs().year();

  function handleChange (value: string) {
    onChange(parseInt(value));
  }

  return <Select value={`${value}`} onChange={handleChange}>
    {Array.from({ length: currentYear - firstEntryYear + 1 }, (_, i) => (
      <Option key={i} value={`${firstEntryYear + i}`}>
        {`${firstEntryYear + i}`}
      </Option>
    ))}
  </Select>;
}

export default SelectYear;