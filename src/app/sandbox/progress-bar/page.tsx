"use client";
import ProgressBar from "@/components/ui/progress-bar";

function ProgressBarPage() {
  return (
    <div className="m-8">
      <h3>Progress bar demo</h3>

      <div className="mt-14 w-80">
        <h5>At 0%</h5>
        <div className="mt-4">
        <ProgressBar size="small" value={0} />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Size small</h5>
        <div className="mt-4">
        <ProgressBar size="small" value={0.1} />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Default</h5>
        <div className="mt-4">
          <ProgressBar value={0.2} />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Size large</h5>
        <div className="mt-4">
        <ProgressBar size="large" value={0.3} />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Size extra large</h5>
        <div className="mt-4">
        <ProgressBar size="extra-large" value={0.4} />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>With label inside </h5>
        <div className="mt-4">
        <ProgressBar withLabelInside size="extra-large" value={0.5} />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>With label inside 100%</h5>
        <div className="mt-4">
        <ProgressBar withLabelInside size="large" value={1} />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>With label outside 100%</h5>
        <div className="mt-4">
        <ProgressBar size="extra-large" value={1} />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>At 0% with label inside</h5>
        <div className="mt-4">
        <ProgressBar withLabelInside size="large" value={0} />
        </div>
      </div>

    </div>
  );
}

export default ProgressBarPage;
