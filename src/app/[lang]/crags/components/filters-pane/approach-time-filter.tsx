import IconCollapse from "@/components/ui/icons/collapse";
import IconExpand from "@/components/ui/icons/expand";
import RangeSlider from "@/components/ui/range-slider";
import { useState } from "react";

type TApproachTimeFilterProps = {
  label: string;
  value: { from: number; to: number };
  min: number;
  max: number;
  onChange: (from: number, to: number) => void;
};

function ApproachTimeFilter({
  label,
  value,
  min,
  max,
  onChange,
}: TApproachTimeFilterProps) {
  const [expanded, setExpanded] = useState(true);

  function handleToggleExpanded() {
    setExpanded(!expanded);
  }

  return (
    <div className="mt-5 border-t border-neutral-200 px-8 pt-5">
      {/* Header that can collapse the filter group */}
      <div className="-mx-1">
        <button
          className="w-full rounded px-1 outline-none ring-blue-100 focus-visible:ring"
          onClick={handleToggleExpanded}
        >
          <div className="flex items-start justify-between">
            <div>{label}</div>
            {expanded ? <IconCollapse /> : <IconExpand />}
          </div>
        </button>
      </div>

      {/* Filter content */}
      {expanded && (
        <RangeSlider
          aria-label={label}
          value={[value.from, value.to]}
          minValue={min}
          maxValue={max}
          step={1}
          valueToLabelMap={
            new Map(
              Array(max - +1)
                .fill(0)
                .map((_v, i) => [i + min, `${i + min} min`])
            )
          }
          onChange={(value) =>
            onChange((value as number[])[0], (value as number[])[1])
          }
        />
      )}
    </div>
  );
}

export default ApproachTimeFilter;
