import {
  Fragment,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  useCallback,
  useLayoutEffect,
} from "react";
import Button from "./button";
import IconCalendar from "./icons/calendar";
import IconLeft from "./icons/left";
import IconRight from "./icons/right";
import dayjs from "dayjs";
import IconExpand from "./icons/expand";
import IconCheck from "./icons/check";
import FocusTrap from "focus-trap-react";

type TDate = {
  day: number | "dd";
  month: number | "mm";
  year: number | "llll";
};

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

type TDatePickerProps = {
  value: TDate;
  onChange: (value: TDate) => void;
};

function DatePicker({ value, onChange }: TDatePickerProps) {
  const [calendarPaneOpened, setCalendarPaneOpened] = useState(false);

  const calendarPaneRef = useRef<HTMLDivElement>(null);
  const calendarButtonRef = useRef<HTMLButtonElement>(null);

  const dayInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);

  const monthsPaneRef = useRef<HTMLDivElement>(null);
  const yearsPaneRef = useRef<HTMLDivElement>(null);

  const today = dayjs();

  const closeCalendarPane = useCallback(() => {
    setCalendarPaneOpened(false);
    setMonthsPaneOpened(false);
    setYearsPaneOpened(false);
    setShownMonthAndYear({
      month: value.month == "mm" ? today.month() + 1 : value.month,
      year: value.year == "llll" ? today.year() : value.year,
    });
  }, [value, today]);

  useEffect(() => {
    const clickOutsideListener = (e: MouseEvent) => {
      // exceptions
      if (
        calendarButtonRef.current &&
        calendarButtonRef.current.contains(e.target as Node)
      ) {
        // calendar icon button was clicked, do nothing, this is handled elsewhere
        return;
      }
      if (
        monthsPaneRef.current &&
        monthsPaneRef.current.contains(e.target as Node)
      ) {
        // month selection dropdown/pane, do not close calendar pane, it is on top and handled elsewhere
        return;
      }
      if (
        yearsPaneRef.current &&
        yearsPaneRef.current.contains(e.target as Node)
      ) {
        // year selection dropdown/pane, do not close calendar pane, year dropdown is on top and handled elsewhere
        return;
      }

      // close the calendar pane if it is opened and a click outside of it ocurred
      if (
        calendarPaneOpened &&
        calendarPaneRef.current &&
        !calendarPaneRef.current.contains(e.target as Node)
      ) {
        closeCalendarPane();
        setMonthsPaneOpened(false);
        setYearsPaneOpened(false);
      }
    };
    document.addEventListener("mousedown", clickOutsideListener);

    return () => {
      document.removeEventListener("mousedown", clickOutsideListener);
    };
  }, [calendarPaneOpened, closeCalendarPane]);

  const handleCalendarButtonClick = () => {
    if (calendarPaneOpened) {
      closeCalendarPane();
    } else {
      setCalendarPaneOpened(true);
    }
  };

  function handleDayClick(date: TDate) {
    onChange(date);
    setCalendarPaneOpened(false);
  }

  const [shownMonthAndYear, setShownMonthAndYear] = useState({
    month: value.month == "mm" ? today.month() + 1 : value.month,
    year: value.year == "llll" ? today.year() : value.year,
  });

  function handlePrevMonthClick() {
    if (shownMonthAndYear.month == 1) {
      setShownMonthAndYear({ month: 12, year: shownMonthAndYear.year - 1 });
    } else {
      setShownMonthAndYear({
        month: shownMonthAndYear.month - 1,
        year: shownMonthAndYear.year,
      });
    }
  }

  function handleNextMonthClick() {
    if (shownMonthAndYear.month == 12) {
      setShownMonthAndYear({ month: 1, year: shownMonthAndYear.year + 1 });
    } else {
      setShownMonthAndYear({
        month: shownMonthAndYear.month + 1,
        year: shownMonthAndYear.year,
      });
    }
  }

  function handlePrevYearClick() {
    setShownMonthAndYear({
      month: shownMonthAndYear.month,
      year: shownMonthAndYear.year - 1,
    });
  }

  function handleNextYearClick() {
    setShownMonthAndYear({
      month: shownMonthAndYear.month,
      year: shownMonthAndYear.year + 1,
    });
  }

  /**
   * Given a month and a year returns number of days in the month. Assumes max possible nr. of days where month and/or year is not known
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

  const handleDayKeyDown = (e: KeyboardEvent) => {
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
      onChange({ ...value, day: newDay });
    }
  };

  const handleMonthKeyDown = (e: KeyboardEvent) => {
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

      onChange({ ...value, month: newMonth, day: newDay });

      setShownMonthAndYear({
        ...shownMonthAndYear,
        month: newMonth != "mm" ? newMonth : today.month() + 1,
      });
    }
  };

  const handleYearKeyDown = (e: KeyboardEvent) => {
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

      onChange({ ...value, day: newDay, year: newYear });

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

  const [dayInputWidth, setDayInputWidth] = useState(
    calcInputWidth(`${value.day}`)
  );
  const [monthInputWidth, setMonthInputWidth] = useState(
    calcInputWidth(`${value.month}`)
  );
  const [yearInputWidth, setYearInputWidth] = useState(
    calcInputWidth(`${value.year}`)
  );

  useLayoutEffect(() => {
    document.fonts.ready.then(() => {
      setDayInputWidth(calcInputWidth(`${value.day}`));
      setMonthInputWidth(calcInputWidth(`${value.month}`));
      setYearInputWidth(calcInputWidth(`${value.year}`));
    });
  }, [value]);

  const [monthsPaneOpened, setMonthsPaneOpened] = useState(false);

  const handleMonthTitleClick = () => {
    setMonthsPaneOpened(true);
  };

  const handleMonthClick = (month: number) => {
    setShownMonthAndYear({ ...shownMonthAndYear, month: month + 1 });
    setMonthsPaneOpened(false);
  };

  const monthsPaneSelectedMonthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (monthsPaneOpened && monthsPaneSelectedMonthRef.current) {
      monthsPaneSelectedMonthRef.current.scrollIntoView(false);
    }
  }, [monthsPaneOpened]);

  const [yearsPaneOpened, setYearsPaneOpened] = useState(false);
  const handleYearTitleClick = () => {
    setYearsPaneOpened(true);
  };

  const handleYearClick = (year: number) => {
    setShownMonthAndYear({ ...shownMonthAndYear, year: year });
    setYearsPaneOpened(false);
  };

  const yearsPaneSelectedYearRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (yearsPaneOpened && yearsPaneSelectedYearRef.current) {
      yearsPaneSelectedYearRef.current.scrollIntoView(false);
    }
  }, [yearsPaneOpened]);

  const getYearsPaneRange = (year: number) => {
    let shift = year - 10;
    if (shift < 1) {
      shift = 1;
    }
    if (shift + 20 > 9999) {
      shift = 9999 - 20;
    }

    return Array.from({ length: 21 }, (_, i) => i + shift);
  };

  return (
    <div>
      {/* day, month, year 'manual' inputs */}
      <div
        className={`relative flex w-full items-center justify-between gap-2 rounded-lg border border-neutral-400 py-1 pl-4 pr-1 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-100 `}
      >
        <div>
          <input
            ref={dayInputRef}
            type="text"
            onKeyDown={handleDayKeyDown}
            className={`m-0 inline rounded-sm border-0 p-0 text-center caret-transparent outline-none focus-visible:bg-blue-100 ${
              value.day == "dd" ? "text-neutral-400 focus:text-neutral-900" : ""
            }`}
            style={{ width: `${dayInputWidth}px` }}
            value={value.day}
            onChange={() => {}}
            onFocus={(e) => {
              e.target.selectionEnd = 0;
            }}
          />
          .
          <input
            ref={monthInputRef}
            type="text"
            onKeyDown={handleMonthKeyDown}
            className={`m-0 inline rounded-sm border-0 p-0 text-center caret-transparent outline-none focus-visible:bg-blue-100 ${
              value.month == "mm"
                ? "text-neutral-400 focus:text-neutral-900"
                : ""
            }`}
            style={{ width: `${monthInputWidth}px` }}
            value={value.month}
            onChange={() => {}}
            onFocus={(e) => {
              e.target.selectionEnd = 0;
            }}
          />
          .
          <input
            ref={yearInputRef}
            type="text"
            onKeyDown={handleYearKeyDown}
            className={`m-0 inline rounded-sm border-0 p-0 text-center caret-transparent outline-none focus-visible:bg-blue-100 ${
              value.year == "llll"
                ? "text-neutral-400 focus:text-neutral-900"
                : ""
            }`}
            style={{ width: `${yearInputWidth}px` }}
            value={value.year}
            onChange={() => {}}
            onFocus={(e) => {
              e.target.selectionEnd = 0;
            }}
          />
        </div>

        <Button
          variant="quaternary"
          onClick={handleCalendarButtonClick}
          ref={calendarButtonRef}
        >
          <IconCalendar />
        </Button>
      </div>

      {/* calendar pane */}
      {calendarPaneOpened && (
        <div
          ref={calendarPaneRef}
          className="absolute mt-2 w-[296px] rounded-lg border border-neutral-400 bg-white px-2 py-3"
        >
          <div className="flex justify-between">
            {/* month choice */}
            <div className="flex items-center">
              <Button
                variant="quaternary"
                onClick={handlePrevMonthClick}
                disabled={
                  shownMonthAndYear.month == 1 && shownMonthAndYear.year == 1
                }
              >
                <IconLeft />
              </Button>
              <Button variant="quaternary" onClick={handleMonthTitleClick}>
                <span className="px-1">
                  {monthNamesShort[shownMonthAndYear.month - 1]}
                </span>
              </Button>
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

            {/* year choice */}
            <div className="flex items-center">
              <Button
                variant="quaternary"
                onClick={handlePrevYearClick}
                disabled={shownMonthAndYear.year == 1}
              >
                <IconLeft />
              </Button>
              <Button variant="quaternary" onClick={handleYearTitleClick}>
                <span className="px-1">{shownMonthAndYear.year}</span>
              </Button>
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
                  <div className="flex h-10 w-10 items-center justify-center">
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
              onDayClick={handleDayClick}
            />
          </div>
        </div>
      )}

      {/* 'direct' month select */}
      {monthsPaneOpened && (
        <div
          ref={monthsPaneRef}
          className="absolute mt-2 w-[296px] overflow-hidden rounded-lg border border-neutral-400 bg-white"
        >
          <div
            className="flex justify-between border-b border-neutral-200 px-12 pb-3 pt-4"
            onClick={() => setMonthsPaneOpened(false)}
          >
            <div className="flex gap-2">
              <div>{monthNamesFull[shownMonthAndYear.month - 1]}</div>
              <IconExpand />
            </div>
            <div className="text-neutral-400">{shownMonthAndYear.year}</div>
          </div>

          <div className="max-h-80 overflow-auto">
            {monthNamesFull.map((monthName, index) => (
              <div
                ref={
                  shownMonthAndYear.month == index + 1
                    ? monthsPaneSelectedMonthRef
                    : null
                }
                key={index}
                onClick={() => {
                  handleMonthClick(index);
                }}
              >
                <MonthOrYearOption
                  selected={shownMonthAndYear.month == index + 1}
                >
                  {monthName}
                </MonthOrYearOption>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 'direct' year select */}
      {yearsPaneOpened && (
        <div
          ref={yearsPaneRef}
          className="absolute mt-2 w-[296px] overflow-hidden rounded-lg border border-neutral-400 bg-white"
        >
          <div
            className="flex justify-between border-b border-neutral-200 pb-3 pl-12 pr-4 pt-4"
            onClick={() => setYearsPaneOpened(false)}
          >
            <div className="text-neutral-400">
              {monthNamesFull[shownMonthAndYear.month - 1]}
            </div>

            <div className="flex gap-2">
              <div>{shownMonthAndYear.year}</div>
              <IconExpand />
            </div>
          </div>

          <div className="max-h-80 overflow-auto">
            {getYearsPaneRange(shownMonthAndYear.year).map((year, index) => (
              <div
                ref={
                  shownMonthAndYear.year == year
                    ? yearsPaneSelectedYearRef
                    : null
                }
                key={index}
                onClick={() => {
                  handleYearClick(year);
                }}
              >
                <MonthOrYearOption selected={shownMonthAndYear.year == +year}>
                  {`${year}`}
                </MonthOrYearOption>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MonthOrYearOption({
  selected,
  children,
}: {
  selected: boolean;
  children: string;
}) {
  return (
    <div className="flex cursor-pointer justify-between gap-4 py-2 pl-12 pr-2 hover:bg-neutral-100 hover:text-blue-500">
      <span
        className={`overflow-hidden text-ellipsis whitespace-nowrap ${
          selected ? "text-blue-500" : ""
        }`}
      >
        {children}
      </span>

      <div className={`text-neutral-900 ${selected ? "visible" : "invisible"}`}>
        <IconCheck />
      </div>
    </div>
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
        <div className="h-10 w-10"></div>
      ) : (
        <div className="h-10 w-10 p-1">
          <div
            className={`flex h-full w-full cursor-pointer items-center justify-center rounded-full text-center align-middle ${stateClasses}`}
            onClick={onClick}
          >
            {number}
          </div>
        </div>
      )}
    </>
  );
}

// TODO: trap focus inside the opened pane
// TODO: handle esc key

export default DatePicker;
export type { TDate };
