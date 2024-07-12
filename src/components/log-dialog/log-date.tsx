import DatePicker, { TDate } from "@/components/ui/date-picker";
import SuggestionChip from "@/components/ui/suggestion-chip";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

type TLogDateProps = {
  value: TDate;
  setValue: (d: TDate) => void;
  disabled?: boolean;
};

function LogDate({ value, setValue, disabled = false }: TLogDateProps) {
  const compareDates = (d1: TDate, d2: TDate) => {
    return d1.day == d2.day && d1.month == d2.month && d1.year == d2.year;
  };

  const todayDayjs = dayjs();
  const today = {
    day: todayDayjs.date(),
    month: todayDayjs.month() + 1,
    year: todayDayjs.year(),
  };

  const yesterdayDayjs = todayDayjs.subtract(1, "day");
  const yesterday = {
    day: yesterdayDayjs.date(),
    month: yesterdayDayjs.month() + 1,
    year: yesterdayDayjs.year(),
  };

  const [lastLogDate, setLastLogDate] = useState<TDate | null>(null);
  useEffect(() => {
    const lld = localStorage.getItem("last-log-date");
    if (lld) {
      setLastLogDate(JSON.parse(lld));
    }
  }, []);

  const handleDateChange = (newDate: TDate) => {
    setValue(newDate);
  };

  const handleTodayChipClick = () => {
    setValue(today);
  };

  const handleYesterdayChipClick = () => {
    setValue(yesterday);
  };

  const handleAsLastLogChipClick = () => {
    if (lastLogDate) {
      setValue(lastLogDate);
    }
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
          active={compareDates(value, today)}
          onClick={handleTodayChipClick}
          disabled={disabled}
        >
          danes
        </SuggestionChip>

        <SuggestionChip
          active={compareDates(value, yesterday)}
          onClick={handleYesterdayChipClick}
          disabled={disabled}
        >
          včeraj
        </SuggestionChip>

        {lastLogDate && (
          <SuggestionChip
            active={compareDates(value, lastLogDate)}
            onClick={handleAsLastLogChipClick}
            disabled={disabled}
          >
            kot zadnji vnos
          </SuggestionChip>
        )}
      </div>
    </div>
  );
}

export default LogDate;
