import DatePicker, { TDateString } from "@/components/ui/date-picker";
import SuggestionChip from "@/components/ui/suggestion-chip";
import dayjs from "dayjs";

type TLogDateProps = {
  value: TDateString;
  setValue: (d: TDateString) => void;
  disabled?: boolean;
};

function ActivityDate({ value, setValue, disabled = false }: TLogDateProps) {
  const todayDayjs = dayjs();
  const today = todayDayjs.toISOString().substring(0, 10);

  const yesterdayDayjs = todayDayjs.subtract(1, "day");
  const yesterday = yesterdayDayjs.toISOString().substring(0, 10);

  const handleDateChange = (newDate: TDateString) => {
    setValue(newDate);
  };

  const handleTodayChipClick = () => {
    setValue(today);
  };

  const handleYesterdayChipClick = () => {
    setValue(yesterday);
  };

  return (
    <div>
      <DatePicker
        value={value}
        onChange={handleDateChange}
        label="Datum"
        disabled={disabled}
      />
      <div className="mt-2 flex gap-2 flex-wrap">
        <SuggestionChip
          active={value == today}
          onClick={handleTodayChipClick}
          disabled={disabled}
        >
          danes
        </SuggestionChip>

        <SuggestionChip
          active={value == yesterday}
          onClick={handleYesterdayChipClick}
          disabled={disabled}
        >
          včeraj
        </SuggestionChip>
      </div>
    </div>
  );
}

export default ActivityDate;
