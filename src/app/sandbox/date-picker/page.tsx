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
      <div>
        <DatePicker value={value} onChange={setValue} />
      </div>
    </div>
  );
}

export default DatePickerPage;
