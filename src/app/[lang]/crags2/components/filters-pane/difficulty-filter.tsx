import IconCollapse from "@/components/ui/icons/collapse";
import IconExpand from "@/components/ui/icons/expand";
import { Select, Option } from "@/components/ui/select";
import { useState } from "react";

type TDifficultyFilterProps = {
  label: string;
  value: { nr: number; from: number; to: number };
  difficultyGradeMap: Record<string, string>;
  onChange: (nr: number, from: number, to: number) => void;
};

function DifficultyFilter({
  label,
  value,
  difficultyGradeMap,
  onChange,
}: TDifficultyFilterProps) {
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

      {/* Filter group content */}
      {expanded && (
        <div className="mt-2">
          <div className="flex items-center gap-2">
            vsaj
            <div className="w-30">
              <Select
                value={`${value.nr}`}
                onChange={(newNrValue: string) =>
                  onChange(+newNrValue, value.from, value.to)
                }
              >
                {Array(11)
                  .fill(0)
                  .map((_, i) => (
                    <Option key={i} value={`${i}`}>
                      {`${i}`}
                    </Option>
                  ))}
              </Select>
            </div>
            smeri
          </div>
          <div className="mt-2 flex items-center gap-2">
            med
            <div className="w-30 shrink-0">
              <Select
                disabled={value.nr == 0}
                value={`${value.from}`}
                onChange={(newFromValue: string) =>
                  onChange(value.nr, +newFromValue, value.to)
                }
              >
                {Object.entries(difficultyGradeMap).map(
                  ([fromValue, fromLabel]) => (
                    <Option key={fromValue} value={`${fromValue}`}>
                      {fromLabel}
                    </Option>
                  )
                )}
              </Select>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            in
            <div className="w-30 shrink-0">
              <Select
                disabled={value.nr == 0}
                value={`${value.to}`}
                onChange={(newToValue: string) =>
                  onChange(value.nr, value.from, +newToValue)
                }
              >
                {Object.entries(difficultyGradeMap).map(
                  ([fromValue, fromLabel]) => (
                    <Option key={fromValue} value={`${fromValue}`}>
                      {fromLabel}
                    </Option>
                  )
                )}
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DifficultyFilter;
