"use client";

import Checkbox from "@/components/ui/checkbox";
import { useState } from "react";

function CheckboxPage() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="m-8">
      <h1 className="text-xl">Checkbox demo</h1>

      {/* hui */}
      <div className="mt-10">
        <Checkbox label="Check me out" />
      </div>

      <div className="mt-1">
        <Checkbox label="Uncheck me" checked />
      </div>

      <div className="mt-1">
        <Checkbox label="Cannot check me" disabled />
      </div>
      <div className="mt-1">
        <Checkbox label="Cannot uncheck me" disabled checked />
      </div>

      <div className="mt-1">
        <Checkbox
          label="Check and control me"
          onChange={(value) => setChecked(value)}
          checked={checked}
        />
      </div>
      <div className="mt-1">
        State of last checkbox is:{" "}
        {checked ? <span>checked</span> : <span>not checked</span>}
      </div>

      <div className="mt-16">
        <h3 className="text-lg">Notes</h3>
        <div className="pl-4">
          <ul className="mt-2 list-outside list-disc">
            <li>Click area for checkbox is expanded with negative margins</li>
            <li>
              Indeterminate and error states are not defined (designed). They
              will be added if/when needed.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default CheckboxPage;
