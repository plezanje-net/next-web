"use client";

import GradeSelector from "@/components/grade-selector";
import { useState } from "react";

function GradeSelectorPage() {
  const [difficulty, setDifficulty] = useState<number | null>(null);

  return (
    <div className="m-8">
      <h3>Ascent type selector demo</h3>

      <div className="mt-14 mx-auto">
        <GradeSelector
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          gradingSystemId="french"
        />
      </div>
    </div>
  );
}

export default GradeSelectorPage;
