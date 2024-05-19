"use client";

import DatePicker, { TDate } from "@/components/ui/date-picker";
import { useState } from "react";

function DatePickerPage() {
  const [value, setValue] = useState<TDate>({
    day: "dd",
    month: "mm",
    year: "llll",
  });

  return (
    <div>
      <div className="relative mx-auto mt-8 w-80">
        <DatePicker value={value} onChange={setValue} />
      </div>
    </div>
  );
}

export default DatePickerPage;
