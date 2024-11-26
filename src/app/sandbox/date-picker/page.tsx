"use client";

import DatePicker from "@/components/ui/date-picker";
import { useState } from "react";

function DatePickerPage() {
  const [value1, setValue1] = useState<string | null>(null);
  const [value2, setValue2] = useState<string | null>("2024-05-19");
  const [value3, setValue3] = useState<string | null>("2024-05-19");

  function handleDateChange(value: string | null) {
    console.log("Date changed", value);
    setValue1(value);
  }

  return (
    <div>
      <div className="relative mx-auto mt-8 w-80">
        A regular datepicker
        <div className="mt-2">
          <DatePicker
            value={value1}
            onChange={handleDateChange}
            label="Datepicker label"
          />
        </div>
      </div>
      <div className="relative mx-auto mt-8 w-80">
        A disabled date picker
        <div className="mt-2">
          <DatePicker value={value2} onChange={setValue2} disabled />
        </div>
      </div>
      <div className="relative mx-auto mt-8 w-80">
        A second regular datepicker to test overflow
        <div className="mt-2">
          <DatePicker value={value3} onChange={setValue3} />
        </div>
      </div>
    </div>
  );
}

export default DatePickerPage;
