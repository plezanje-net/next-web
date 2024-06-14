"use client";

import AscentTypeSelector from "@/components/ascent-type-selector";
import { AscentType } from "@/graphql/generated";
import { useState } from "react";

function AscentTypeSelectorPage() {
  const [ascentType, setAscentType] = useState<AscentType | null>(null);

  return (
    <div className="m-8">
      <h3>Ascent type selector demo</h3>

      <div className="mt-14">
        <h5>An ascent type selector</h5>
        <div className="mt-4">
          <AscentTypeSelector value={ascentType} onChange={setAscentType} />
        </div>
      </div>
    </div>
  );
}

export default AscentTypeSelectorPage;
