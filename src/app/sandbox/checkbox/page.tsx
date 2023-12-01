"use client";

import CheckboxHUI from "@/components/ui/checkboxhui";
import Checkbox from "../../../components/ui/checkbox";
import { useState } from "react";

function CheckboxPage() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="m-8">
      <h1 className="text-xl">Checkbox demo</h1>

      {/* hui */}
      <div className="mt-10">
        <CheckboxHUI label="Check me out" />
      </div>

      <div className="mt-1">
        <CheckboxHUI label="Uncheck me" checked />
      </div>

      <div className="mt-1">
        <CheckboxHUI label="Cannot check me" disabled />
      </div>
      <div className="mt-1">
        <CheckboxHUI label="Cannot uncheck me" disabled checked />
      </div>

      <div className="mt-1">
        <CheckboxHUI
          label="Check and control me"
          onChange={(value) => setChecked(value)}
          checked={checked}
        />
      </div>
      <div className="mt-1">
        State of last checkbox is:{" "}
        {checked ? <span>checked</span> : <span>not checked</span>}
      </div>

      {/* aria */}
      <div className="mt-10">
        <Checkbox>Check me, I am unchecked</Checkbox>
      </div>

      <div>
        <Checkbox defaultSelected>Uncheck me, I am checked</Checkbox>
      </div>

      <div>
        <Checkbox isDisabled>Cannot check me</Checkbox>
      </div>

      <div>
        <Checkbox isDisabled defaultSelected>
          Cannot uncheck me
        </Checkbox>
      </div>

      <div>
        <Checkbox aria-label="A checkbox with no visible label"></Checkbox>
      </div>

      <div>
        <Checkbox aria-labelledby="labelDiv"></Checkbox>
      </div>

      <div id="labelDiv">I am a detached label for the last checkbox</div>

      <div className="mt-16">
        <h3 className="text-lg">Notes</h3>
        <div className="pl-4">
          <ul className="mt-2 list-outside list-disc">
            <li>
              Click area should be at least 48x48px. Theoretically, and goes for
              all other ui elements as well ... :)
            </li>
            <li>
              The last checkbox has no label but is labeled by another div. One
              before last has no label at all, but has aria-label set.
            </li>
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
