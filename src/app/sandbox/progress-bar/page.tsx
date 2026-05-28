"use client";

import ProgressBar from "@/components/ui/progress-bar";

function ProgressBarPage() {
  return (
    <div className="m-8">
      <h3>Progress bar demo</h3>

      <div className="mt-14 w-80">
        <h5>At 0 %</h5>
        <div className="mt-4">
          <ProgressBar progress={0} />
        </div>
      </div>
      <div className="mt-14 w-80">
        <h5>At 20 %</h5>
        <div className="mt-4">
          <ProgressBar progress={20} />
        </div>
      </div>
      <div className="mt-14 w-80">
        <h5>At 40 %</h5>
        <div className="mt-4">
          <ProgressBar progress={40} />
        </div>
      </div>
      <div className="mt-14 w-80">
        <h5>At 100 %</h5>
        <div className="mt-4">
          <ProgressBar progress={100} />
        </div>
      </div>
    </div>
  );
}

export default ProgressBarPage;
