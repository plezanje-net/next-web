"use client";

import DatePicker, { TDate } from "@/components/ui/date-picker";
import { useState } from "react";

function DatePickerPage() {
  const [value1, setValue1] = useState<TDate>({
    // day: 19,
    // month: 5,
    // year: 2024,
    day: "dd",
    month: "mm",
    year: "llll",
  });

  const [value2, setValue2] = useState<TDate>({
    day: 19,
    month: 5,
    year: 2024,
  });

  const [value3, setValue3] = useState<TDate>({
    day: 19,
    month: 5,
    year: 2024,
  });

  return (
    <div>
      <div className="relative mx-auto mt-8 w-80">
        A regular datepicker
        <div className="mt-2">
          <DatePicker value={value1} onChange={setValue1} />
        </div>
      </div>
      <div className="relative mx-auto mt-8 w-80">
        A disabled date picker
        <div className="mt-2">
          <DatePicker value={value2} onChange={setValue2} disabled />A second
          regular datepicker to test overflow
        </div>
        <div className="mt-2">
          <DatePicker value={value3} onChange={setValue3} />
        </div>
      </div>
    </div>
  );
}

export default DatePickerPage;
