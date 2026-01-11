"use client";

import TextArea from "@/components/ui/text-area";
import { useState } from "react";

function TextAreaPage() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("Raje idi spat!");
  const [value3, setValue3] = useState("Ti bo dalo malo notranjega miru.");

  return (
    <div className="m-8">
      <h1 className="text-xl">Text area demo</h1>

      <div className="mt-10 w-96">
        <TextArea
          value={value1}
          onChange={setValue1}
          label="Default"
          description="Leave a comment"
          placeholder="Your comment goes here."
        />
      </div>

      <div className="mt-10 w-96">
        <TextArea value={value2} label="Prefilled" onChange={setValue2} />
      </div>

      <div className="mt-10 w-96">
        <TextArea
          value={value3}
          onChange={setValue3}
          label="Invalid"
          errorMessage="That's nonsense"
        />
      </div>

      <div className="mt-10 w-96">
        <TextArea
          value="Namesto da daješ svoje nebulozne predloge."
          onChange={() => {}}
          label="Disabled"
          disabled
        />
      </div>
    </div>
  );
}

export default TextAreaPage;
