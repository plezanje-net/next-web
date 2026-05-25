"use client";

import Checkbox from "@/components/ui/checkbox";
import { useState } from "react";

function CheckboxPage() {
  const [checked, setChecked] = useState(false);
  const [checkedA, setCheckedA] = useState(false);
  const [checkedB, setCheckedB] = useState(true);

  return (
    <div className="m-8">
      <h1 className="text-xl">Checkbox demo</h1>

      <div className="mt-10">
        A regular checkbox
        <Checkbox
          label="Check me out"
          checked={checked}
          onChange={setChecked}
        />
      </div>

      <div className="mt-1">
        Checkbox is: {checked ? <span>checked</span> : <span>not checked</span>}
      </div>

      <div className="mt-4">
        Indeterminate checkbox
        <Checkbox
          label="All Checked"
          checked={checkedA && checkedB}
          indeterminate={checkedA != checkedB}
          onChange={() => {
            if (checkedA && checkedB) {
              setCheckedA(false);
              setCheckedB(false);
            } else {
              setCheckedA(true);
              setCheckedB(true);
            }
          }}
        />
        <Checkbox
          label="Checkbox A"
          checked={checkedA}
          onChange={setCheckedA}
        />
        <Checkbox
          label="Checkbox B"
          checked={checkedB}
          onChange={setCheckedB}
        />
      </div>

      <div className="mt-4">
        A disabled unchecked checkbox
        <Checkbox
          label="Cannot check me"
          disabled
          checked={false}
          onChange={() => {}}
        />
      </div>

      <div className="mt-4">
        A disabled checked checkbox
        <Checkbox
          label="Cannot uncheck me"
          disabled
          checked
          onChange={() => {}}
        />
      </div>

      <div className="mt-4">
        A disabled indeterminate checkbox
        <Checkbox
          label="Cannot determine me"
          indeterminate
          disabled
          checked
          onChange={() => {}}
        />
      </div>

      <div className="mt-16">
        <h3 className="text-lg">Notes</h3>
        <div className="pl-4">
          <ul className="mt-2 list-outside list-disc">
            <li>Click area for checkbox is expanded with negative margins</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CheckboxPage;
