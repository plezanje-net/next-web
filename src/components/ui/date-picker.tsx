import {
  Fragment,
  useEffect,
  useRef,
  useState,
  KeyboardEvent as ReactKeyboardEvent,
  useLayoutEffect,
  useMemo,
  ReactElement,
} from "react";
import Button from "./button";
import IconCalendar from "./icons/calendar";
import IconLeft from "./icons/left";
import IconRight from "./icons/right";
import dayjs from "dayjs";
import IconExpand from "./icons/expand";
import IconCheck from "./icons/check";
import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";

type TDate = {
  day: number | "dd";
  month: number | "mm";
  year: number | "llll";
};

type TDateString = string | null;

const monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Maj",
  "Jun",
  "Jul",
  "Avg",
  "Sep",
  "Okt",
  "Nov",
  "Dec",
];

const monthNamesFull = [
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

// Some local helpers //

/**
 * Given a current year it generates an array of 21 years wher given year is as close to the middle as possible (min year is 1 and max is 9999).
 */
const getYearsRange = (year: number) => {
  let shift = year - 10;
  if (shift < 1) {
    shift = 1;
  }
  if (shift + 20 > 9999) {
    shift = 9999 - 20;
  }

  return Array.from({ length: 21 }, (_, i) => i + shift);
};

/**
 * Given a month and a year returns number of days in the month. Assumes max possible nr. of days in case month and/or year is not known
 */
const getDayMax = (month: number | "mm", year: number | "llll") => {
  let date;
  if (month != "mm" && year != "llll") {
    date = dayjs()
      .month(month - 1)
      .year(year);
  } else if (month != "mm") {
    date = dayjs().month(month - 1);
  } else {
    return 31;
  }
  return date.daysInMonth();
};

type TDatePickerProps = {
  value: TDateString;
  onChange: (value: TDateString) => void;
  displayValue?: string;
  label?: string;
  disabled?: boolean;
};

function DatePicker({
  value: inputValue,
  onChange,
  displayValue,
  label,
  disabled = false,
}: TDatePickerProps) {
  const dayInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);

  const value: TDate = useMemo(() => {
    const [year, month, day] = inputValue?.split("-") ?? ["llll", "mm", "dd"];
    return inputValue
      ? { day: +day, month: +month, year: +year }
      : { day: "dd", month: "mm", year: "llll" };
  }, [inputValue]);

  const handleChange = (date: TDate) => {
    onChange(
      date.day == "dd" || date.month == "mm" || date.year == "llll"
        ? null
        : `${date.year}-${date.month.toString().padStart(2, "0")}-${date.day.toString().padStart(2, "0")}`
    );
  };

  const today = dayjs();

  const handleDayClick = (date: TDate, close: () => void) => {
    handleChange(date);
    close();
  };

  const [shownMonthAndYear, setShownMonthAndYear] = useState({
    month: value.month == "mm" ? today.month() + 1 : value.month,
    year: value.year == "llll" ? today.year() : value.year,
  });

  const handlePrevMonthClick = () => {
    if (shownMonthAndYear.month == 1) {
      setShownMonthAndYear({ month: 12, year: shownMonthAndYear.year - 1 });
    } else {
      setShownMonthAndYear({
        month: shownMonthAndYear.month - 1,
        year: shownMonthAndYear.year,
      });
    }
  };

  const handleNextMonthClick = () => {
    if (shownMonthAndYear.month == 12) {
      setShownMonthAndYear({ month: 1, year: shownMonthAndYear.year + 1 });
    } else {
      setShownMonthAndYear({
        month: shownMonthAndYear.month + 1,
        year: shownMonthAndYear.year,
      });
    }
  };

  const handlePrevYearClick = () => {
    setShownMonthAndYear({
      month: shownMonthAndYear.month,
      year: shownMonthAndYear.year - 1,
    });
  };

  const handleNextYearClick = () => {
    setShownMonthAndYear({
      month: shownMonthAndYear.month,
      year: shownMonthAndYear.year + 1,
    });
  };

  const handleDayKeyDown = (e: ReactKeyboardEvent) => {
    let newDay = value.day;
    const dayMax = getDayMax(value.month, value.year);

    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp":
        // If nothing entered yet, start with today
        if (value.day == "dd") {
          newDay = today.date();
        } else {
          const dd = e.key == "ArrowUp" ? 1 : -1;
          newDay = ((value.day + dd - 1 + dayMax) % dayMax) + 1;
        }
        break;

      case "Backspace":
      case "Delete":
        if (value.day != "dd") {
          if (value.day < 10) {
            newDay = "dd";
          } else {
            newDay = +`${value.day}`.slice(0, -1);
          }
        }
        break;

      case "ArrowRight":
        monthInputRef.current?.focus();
        break;

      default:
        if (!isNaN(+e.key)) {
          // day is not set (empty), that is 'dd' --> accept any digit but 0
          if (value.day === "dd" && +e.key !== 0) {
            newDay = +e.key;
          } else if (`${value.day}`.length > 0) {
            // day already has some digits entered, get hypothethical new day value and test if valid
            const hypDay = +`${value.day}${e.key}`;

            // if new number is a valid date use it
            if (hypDay <= dayMax) {
              newDay = hypDay;
            }
            // if it's not start over
            else {
              // but only if it's not a 0 (day cannot start with 0)
              if (e.key !== "0") {
                newDay = +e.key;
              }
            }
          }

          // if another digit is not possible automatically move focus to month
          if (+`${newDay}0` > dayMax) {
            monthInputRef.current?.focus();
          }
        }
    }

    // if day should change, call onChange with the new value
    if (newDay != value.day) {
      handleChange({ ...value, day: newDay });
    }
  };

  const handleMonthKeyDown = (e: ReactKeyboardEvent) => {
    let newMonth = value.month;

    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp":
        // If nothing entered yet, start with today
        if (value.month == "mm") {
          newMonth = today.month() + 1;
        } else {
          const dm = e.key == "ArrowUp" ? 1 : -1;
          newMonth = ((value.month + dm - 1 + 12) % 12) + 1;
        }
        break;

      case "Backspace":
      case "Delete":
        if (value.month != "mm") {
          if (value.month < 10) {
            newMonth = "mm";
          } else {
            newMonth = +`${value.month}`.slice(0, -1);
          }
        }
        break;

      case "ArrowRight":
        yearInputRef.current?.focus();
        break;

      case "ArrowLeft":
        dayInputRef.current?.focus();
        break;

      default:
        if (!isNaN(+e.key)) {
          // month is not set (empty), that is 'mm' --> accept any digit but 0
          if (value.month === "mm" && +e.key !== 0) {
            newMonth = +e.key;
          }

          // month already has a 1 digit entered
          else if (`${value.month}`.length > 0) {
            const hypMonth = +`${value.month}${e.key}`;

            // if new number is a valid month
            if (hypMonth <= 12) {
              newMonth = hypMonth;
            }
            // if not start over
            else {
              // if entered is not a zero, override current entry
              if (e.key !== "0") {
                newMonth = +e.key;
              }
            }
          }

          // if another digit is not possible automatically move focus to year
          if (+`${newMonth}0` > 12) {
            yearInputRef.current?.focus();
          }
        }
    }

    // should month be changed?
    if (newMonth != value.month) {
      // should day also be adjusted? (nr days in month differ per month)
      const dayMax = getDayMax(newMonth, value.year);
      let newDay = value.day;
      if (value.day != "dd" && value.day > dayMax) {
        newDay = dayMax;
      }

      handleChange({ ...value, month: newMonth, day: newDay });

      setShownMonthAndYear({
        ...shownMonthAndYear,
        month: newMonth != "mm" ? newMonth : today.month() + 1,
      });
    }
  };

  const handleYearKeyDown = (e: ReactKeyboardEvent) => {
    let newYear = value.year;

    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp":
        // if nothing entered yet, start with today
        if (value.year === "llll") {
          newYear = today.year();
        } else {
          const dy = e.key == "ArrowUp" ? 1 : -1;
          newYear = ((value.year + dy - 1 + 9999) % 9999) + 1;
        }
        break;

      case "Backspace":
      case "Delete":
        if (value.year != "llll") {
          if (value.year < 10) {
            newYear = "llll";
          } else {
            newYear = +`${value.year}`.slice(0, -1);
          }
        }
        break;

      case "ArrowLeft":
        monthInputRef.current?.focus();
        break;

      default:
        if (!isNaN(+e.key)) {
          // if year is not set (empty), that is 'llll', accept any digit but 0
          if (value.year === "llll" && +e.key !== 0) {
            newYear = +e.key;
          } else {
            if (`${value.year}`.length < 4) {
              newYear = +`${value.year}${e.key}`;
            } else {
              // all 4 digits taken, start over
              if (e.key !== "0") {
                newYear = +e.key;
              }
            }
          }
        }
    }

    // should year change?
    if (newYear != value.year) {
      // should day also change? (leap year)
      const dayMax = getDayMax(value.month, newYear);
      let newDay = value.day;
      if (value.day != "dd" && value.day > dayMax) {
        newDay = dayMax;
      }

      handleChange({ ...value, day: newDay, year: newYear });

      setShownMonthAndYear({
        ...shownMonthAndYear,
        year: newYear == "llll" ? today.year() : newYear,
      });
    }
  };

  /*
  An input cannot be styled so that it hugs its content, so we have to set its width explicitly.
  We get its width with temporarily rendering a span with the same contents.
  */
  const calcInputWidth = (inputValue: string) => {
    const tempSpan = document.createElement("span");
    tempSpan.textContent = inputValue;
    document.body.appendChild(tempSpan);
    const width = tempSpan.getBoundingClientRect().width;
    document.body.removeChild(tempSpan);
    return width;
  };

  const [dayInputWidth, setDayInputWidth] = useState(0);
  const [monthInputWidth, setMonthInputWidth] = useState(0);
  const [yearInputWidth, setYearInputWidth] = useState(0);

  useLayoutEffect(() => {
    document.fonts.ready.then(() => {
      setDayInputWidth(calcInputWidth(`${value.day}`));
      setMonthInputWidth(calcInputWidth(`${value.month}`));
      setYearInputWidth(calcInputWidth(`${value.year}`));
    });
  }, [value]);

  const handleInputFieldClick = () => {
    if (value.day == "dd") {
      dayInputRef.current?.focus();
      return;
    }

    if (value.month == "mm") {
      monthInputRef.current?.focus();
      return;
    }

    yearInputRef.current?.focus();
  };

  return (
    <div className="relative">
      <Field>
        {label && <Label>{label}</Label>}
        {/* day, month, year 'manual' inputs */}
        <div
          className={`relative flex w-full items-center justify-between gap-2 rounded-lg border py-2 pl-4 pr-1 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-100 ${label ? "mt-2" : ""} ${disabled ? "border-neutral-300 bg-neutral-100" : "border-neutral-400 bg-white"}`}
          onClick={handleInputFieldClick}
        >
          {displayValue ? (
            <>{displayValue}</>
          ) : (
            <div>
              <input
                ref={dayInputRef}
                type="text"
                onKeyDown={handleDayKeyDown}
                className={`m-0 inline rounded-sm border-0 p-0 text-center caret-transparent outline-none focus-visible:bg-blue-100 bg-transparent ${
                  value.day == "dd" || disabled
                    ? "text-neutral-400 focus:text-neutral-900"
                    : ""
                }`}
                style={{ width: `${dayInputWidth}px` }}
                value={value.day}
                onChange={() => {}}
                onFocus={(e) => {
                  e.target.selectionEnd = 0;
                }}
                onClick={(e) => e.stopPropagation()}
                disabled={disabled}
              />
              <span className={`${disabled ? "text-neutral-400" : ""}`}>.</span>
              <input
                ref={monthInputRef}
                type="text"
                onKeyDown={handleMonthKeyDown}
                className={`m-0 inline rounded-sm border-0 p-0 text-center caret-transparent outline-none focus-visible:bg-blue-100 bg-transparent ${
                  value.month == "mm" || disabled
                    ? "text-neutral-400 focus:text-neutral-900"
                    : ""
                }`}
                style={{ width: `${monthInputWidth}px` }}
                value={value.month}
                onChange={() => {}}
                onFocus={(e) => {
                  e.target.selectionEnd = 0;
                }}
                onClick={(e) => e.stopPropagation()}
                disabled={disabled}
              />
              <span className={`${disabled ? "text-neutral-400" : ""}`}>.</span>
              <input
                ref={yearInputRef}
                type="text"
                onKeyDown={!disabled ? handleYearKeyDown : () => {}}
                className={`m-0 inline rounded-sm border-0 p-0 text-center caret-transparent outline-none focus-visible:bg-blue-100 bg-transparent ${
                  value.year == "llll" || disabled
                    ? "text-neutral-400 focus:text-neutral-900"
                    : ""
                }`}
                style={{ width: `${yearInputWidth}px` }}
                value={value.year}
                onChange={() => {}}
                onFocus={(e) => {
                  e.target.selectionEnd = 0;
                }}
                onClick={(e) => e.stopPropagation()}
                disabled={disabled}
              />
            </div>
          )}
        </div>
      </Field>
      <div className="absolute right-1 bottom-[1px] items-center flex h-10">
        <Popover className="relative">
          <PopoverButton as={Button} variant="quaternary" disabled={disabled}>
            <IconCalendar />
          </PopoverButton>
          <PopoverPanel
            modal={false}
            anchor="bottom end"
            className="[--anchor-offset:4px] [--anchor-gap:13px]"
          >
            {({ close }) => (
              <div className="w-[256px] min-[400px]:w-[298px] rounded-lg border border-neutral-400 bg-white px-2 py-3 relative">
                <div className="flex justify-between">
                  {/* month shuffler */}
                  <div className="flex items-center">
                    <Button
                      variant="quaternary"
                      onClick={handlePrevMonthClick}
                      disabled={
                        shownMonthAndYear.month == 1 &&
                        shownMonthAndYear.year == 1
                      }
                    >
                      <IconLeft />
                    </Button>

                    {/* 'direct' month select */}
                    <Month
                      value={shownMonthAndYear.month}
                      onChange={(m) => {
                        setShownMonthAndYear((smy) => ({ ...smy, month: m }));
                      }}
                      year={shownMonthAndYear.year}
                    />

                    <Button
                      variant="quaternary"
                      onClick={handleNextMonthClick}
                      disabled={
                        shownMonthAndYear.month == 12 &&
                        shownMonthAndYear.year == 9999
                      }
                    >
                      <IconRight />
                    </Button>
                  </div>

                  {/* year shuffler */}
                  <div className="flex items-center">
                    <Button
                      variant="quaternary"
                      onClick={handlePrevYearClick}
                      disabled={shownMonthAndYear.year == 1}
                    >
                      <IconLeft />
                    </Button>

                    {/* 'direct' year select */}
                    <Year
                      value={shownMonthAndYear.year}
                      onChange={(y) => {
                        setShownMonthAndYear((smy) => ({ ...smy, year: y }));
                      }}
                      month={shownMonthAndYear.month}
                    />

                    <Button
                      variant="quaternary"
                      onClick={handleNextYearClick}
                      disabled={shownMonthAndYear.year == 9999}
                    >
                      <IconRight />
                    </Button>
                  </div>
                </div>

                {/* days */}
                <div className="mt-2">
                  {/* days names */}
                  <div className="flex">
                    {["P", "T", "S", "Č", "P", "S", "N"].map((dayName, i) => (
                      <Fragment key={i}>
                        <div className="flex h-[34px] w-[34px] min-[400px]:h-10 min-[400px]:w-10 items-center justify-center">
                          {dayName}
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  {/* days numbers */}

                  <MonthDays
                    month={shownMonthAndYear.month}
                    year={shownMonthAndYear.year}
                    selectedDate={value}
                    onDayClick={(date) => handleDayClick(date, close)}
                  />
                </div>
              </div>
            )}
          </PopoverPanel>
        </Popover>
      </div>
    </div>
  );
}

type TYearProps = {
  value: number;
  onChange: (year: number) => void;
  month: number;
};

function Year({ value, onChange, month }: TYearProps) {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <ListboxButton as={Fragment}>
            {open ? (
              <div className="absolute left-0 right-0 flex cursor-pointer justify-between bg-white pl-12 pr-4">
                <div className="text-neutral-400">
                  {monthNamesFull[month - 1]}
                </div>

                <div className="flex gap-2">
                  {value}
                  <IconExpand />
                </div>
              </div>
            ) : (
              <Button variant="quaternary">
                <span className="px-1">{value}</span>
              </Button>
            )}
          </ListboxButton>

          <ListboxOptions className="absolute left-0 right-0 bg-white top-[52px] h-[calc(100%-52px)] overflow-hidden rounded-b-lg rounded-lg rounded-t-none border-t border-t-neutral-200  focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-100">
            <div className="h-full overflow-auto ">
              {getYearsRange(value).map((year, index) => (
                <MontOrYearOption key={index} value={year}>
                  {year}
                </MontOrYearOption>
              ))}
            </div>
          </ListboxOptions>
        </>
      )}
    </Listbox>
  );
}

type TMonthProps = {
  value: number;
  onChange: (month: number) => void;
  year: number;
};

function Month({ value, onChange, year }: TMonthProps) {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <ListboxButton as={Fragment}>
            {open ? (
              <div className="absolute left-0 right-0 mx-px flex cursor-pointer justify-between bg-white px-12">
                <div className="flex gap-2">
                  {monthNamesFull[value - 1]}
                  <IconExpand />
                </div>
                <div className="text-neutral-400">{year}</div>
              </div>
            ) : (
              <Button variant="quaternary">
                <span className="px-1">{monthNamesShort[value - 1]}</span>
              </Button>
            )}
          </ListboxButton>

          <ListboxOptions className="absolute left-0 right-0 bg-white top-[52px] h-[calc(100%-52px)] overflow-hidden rounded-b-lg rounded-lg rounded-t-none border-t border-t-neutral-200  focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-100">
            <div className="h-full overflow-auto">
              {monthNamesFull.map((monthName, index) => (
                <MontOrYearOption key={index} value={index + 1}>
                  {monthName}
                </MontOrYearOption>
              ))}
            </div>
          </ListboxOptions>
        </>
      )}
    </Listbox>
  );
}

interface MontOrYearOptionProps {
  value: number;
  children: string | number;
  disabled?: boolean;
}

function MontOrYearOption({
  value,
  children,
  disabled,
}: MontOrYearOptionProps) {
  return (
    <ListboxOption
      key={value}
      value={value}
      disabled={disabled}
      className="flex cursor-pointer justify-between gap-4 py-2 pl-12 pr-2 ui-selected:text-blue-500 ui-active:bg-neutral-100 ui-active:text-blue-500 ui-disabled:cursor-default ui-disabled:text-neutral-400"
    >
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {children}
      </span>
      <div className="invisible text-neutral-900 ui-selected:visible">
        <IconCheck />
      </div>
    </ListboxOption>
  );
}

function MonthDays({
  month,
  year,
  selectedDate,
  onDayClick,
}: {
  month: number;
  year: number;
  selectedDate: TDate;
  onDayClick: (date: TDate) => void;
}) {
  const firstInMonthDate = dayjs()
    .year(year)
    .month(month - 1)
    .date(1);
  const firstDay = (firstInMonthDate.day() - 1 + 7) % 7;
  const daysInMonth = firstInMonthDate.daysInMonth();

  const today = dayjs();

  const days = [new Array(firstDay).fill({ date: null, state: "empty" })];
  let week = 0;

  for (let d = 1; d <= daysInMonth; d++) {
    if (days[week].length >= 7) {
      // create new week
      days.push([]);
      week++;
    }

    const dayState =
      selectedDate.year == year &&
      selectedDate.month == month &&
      selectedDate.day == d
        ? "selected"
        : today.year() == year &&
            today.month() + 1 == month &&
            today.date() == d
          ? "today"
          : "default";

    // add day to week
    days[week].push({ date: d, state: dayState });
  }

  // pad last week with empty days
  days[days.length - 1] = [
    ...days[days.length - 1],
    ...new Array(7 - days[days.length - 1].length).fill({
      date: null,
      state: "empty",
    }),
  ];

  return (
    <div>
      {days.map((week, w) => (
        <div key={w} className="flex">
          {week.map((day, d) => (
            <div key={d}>
              <Day
                number={day.date}
                state={day.state}
                onClick={() => {
                  onDayClick({
                    day: day.date,
                    month: month,
                    year: year,
                  });
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Day({
  number,
  state,
  onClick,
}: {
  number: number;
  state: "default" | "today" | "selected" | "empty";
  onClick: () => void;
}) {
  let stateClasses = "";

  switch (state) {
    case "today":
      stateClasses =
        "font-medium text-blue-500 hover:bg-neutral-100 active:bg-neutral-200";
      break;

    case "selected":
      stateClasses = "bg-blue-500 text-white";
      break;

    default:
      stateClasses = "hover:bg-neutral-100 active:bg-neutral-200";
  }

  return (
    <>
      {state == "empty" ? (
        <div className="w-[34px] h-[34px] min-[400px]:w-10 min-[400px]:h-10"></div>
      ) : (
        <div className="w-[34px] h-[34px] min-[400px]:w-10 min-[400px]:h-10 p-1">
          <button
            className={`flex h-full w-full cursor-pointer items-center justify-center rounded-full text-center align-middle focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-100 ${stateClasses}`}
            onClick={onClick}
          >
            {number}
          </button>
        </div>
      )}
    </>
  );
}

// TODO: calendar days keyboard navigation

export default DatePicker;
export type { TDate, TDateString };
