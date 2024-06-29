"use client";

import SuggestionChip from "@/components/ui/suggestion-chip";
import { useState } from "react";

function SuggestionChipPage() {
  const [state, setState] = useState(false);

  return (
    <div className="m-8">
      <h3>Suggestion chip demo</h3>

      <div className="mt-14 w-80">
        <h5>A suggestion chip</h5>
        <div className="mt-4">
          <SuggestionChip active={state} onClick={() => setState(!state)}>
            danes
          </SuggestionChip>
        </div>
      </div>
    </div>
  );
}

export default SuggestionChipPage;
