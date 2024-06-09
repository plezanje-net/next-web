import Checkbox from "@/components/ui/checkbox";
import IconCollapse from "@/components/ui/icons/collapse";
import IconExpand from "@/components/ui/icons/expand";
import Link from "@/components/ui/link";
import { useState } from "react";

type TMultiFilterProps = {
  label: string;
  nrShown: number | "all";
  options: Record<string, string>;
  checkedOptions: string[];
  onChange: (checked: boolean, optionValue: string) => void;
};

function MultiFilter({
  label,
  options,
  nrShown,
  checkedOptions,
  onChange,
}: TMultiFilterProps) {
  const [expanded, setExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);

  function handleToggleExpanded() {
    setExpanded(!expanded);
  }

  function handleToggleShowAll() {
    setShowAll(!showAll);
  }

  if (nrShown != "all" && Object.keys(options).length <= nrShown) {
    nrShown = "all";
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

      {/* Filter group content/options(checkboxes) */}
      {expanded && (
        <div className="mt-2">
          {Object.entries(options)
            .slice(
              0,
              showAll || nrShown === "all"
                ? Object.keys(options).length
                : nrShown
            )
            .map(([optionValue, optionLabel], index) => (
              <div key={optionValue} className={`${index > 0 ? "mt-1" : ""}`}>
                <Checkbox
                  label={optionLabel}
                  onChange={(checked) => {
                    onChange(checked, optionValue);
                  }}
                  checked={checkedOptions.includes(optionValue)}
                />
              </div>
            ))}
          {nrShown !== "all" && (
            <div className="mt-1">
              <Link onPress={handleToggleShowAll}>
                {showAll ? "Prikaži manj" : "Prikaži vse"}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MultiFilter;
