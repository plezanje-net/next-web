import { Option, Select } from "@/components/ui/select";

type TSelectMonthProps = {
  value: number;
  onChange: (value: number) => void;
};

function SelectMonth({ value, onChange }: TSelectMonthProps) {
  const monthNames = [
    "Januar",
    "Februar",
    "Marec",
    "April",
    "Maj",
    "Junij",
    "Julij",
    "Avgust",
    "September",
    "Oktober",
    "November",
    "December",
  ];

  function handleChange(value: string) {
    onChange(parseInt(value));
  }

  return (
    <Select value={`${value}`} onChange={handleChange}>
      {monthNames.map((month, i) => (
        <Option key={i} value={`${i}`}>
          {month}
        </Option>
      ))}
    </Select>
  );
}

export default SelectMonth;
