"use client";

import CoordinatesInput from "@/components/ui/coordinates-input";
import { useState } from "react";

function CoordinatesInputPage() {
  const [value, setValue] = useState("");

  return (
    <div className="m-8">
      <h3>Coordinates input demo</h3>

      <div className="mt-14 w-80">
        <CoordinatesInput
          value={value}
          onChange={setValue}
          dialogTitle="Lokacija parkirišča"
          dialogDescription="Označi lokacijo plezališča na zemljevidu."
          mapDefaultCenter={[45.567706816120364, 13.863458632993037]}
          markerType="parking"
        />
      </div>
    </div>
  );
}

export default CoordinatesInputPage;
