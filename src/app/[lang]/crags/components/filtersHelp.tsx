import Checkbox from "@/components/ui/checkbox";
import IconCollapse from "@/components/ui/icons/collapse";
import IconExpand from "@/components/ui/icons/expand";
import Link from "@/components/ui/link";
import RangeSlider from "@/components/ui/range-slider";
import { Select, Option } from "@/components/ui/select";
import { pluralizeNoun } from "../../../../lib/text-helpers";
import { ReactNode, useState } from "react";

// TODO: rename this file name and/or split to files...

abstract class Filter {
  readonly label: string;

  constructor(label: string, handleReset: () => void) {
    this.label = label;
    this.handleReset = handleReset;
  }

  abstract isActive(): boolean;

  abstract valueToString(): string;

  abstract renderFilterGroup(): ReactNode;

  handleReset: () => void;
}

class MultiFilter extends Filter {
  readonly value: string[];
  readonly options: Record<string, string>;
  readonly nrShown;

  constructor(
    label: string,
    value: string[],
    options: Record<string, string>,
    nrShown: number | "all",
    handleChange: (checked: boolean, option: string) => void,
    handleReset: () => void
  ) {
    super(label, handleReset);
    this.value = value;
    this.options = options;
    this.nrShown = nrShown;
    this.handleChange = handleChange;
  }

  handleChange: (checked: boolean, option: string) => void;

  isActive(): boolean {
    return Object.entries(this.value).length !== 0;
  }

  valueToString() {
    return (this.value as string[]).map((val) => this.options[val]).join(", ");
  }

  renderFilterGroup(): ReactNode {
    return (
      <CheckboxesFilterGroup
        label={this.label}
        options={this.options}
        nrShown={this.nrShown}
        checkedOptions={this.value}
        onChange={this.handleChange}
      />
    );
  }
}

class BooleanFilter extends Filter {
  readonly value: boolean;
  readonly defaultValue: boolean;

  constructor(
    label: string,
    value: boolean,
    defaultValue: boolean,
    handleChange: (checked: boolean) => void,
    handleReset: () => void
  ) {
    super(label, handleReset);
    this.value = value;
    this.defaultValue = defaultValue;
    this.handleChange = handleChange;
  }

  handleChange: (checked: boolean) => void;

  isActive(): boolean {
    return this.value != this.defaultValue;
  }

  valueToString() {
    return this.value ? "da" : "ne";
  }

  renderFilterGroup(): ReactNode {
    return (
      <div className="mt-5 border-t border-neutral-200 px-8 pt-5">
        <Checkbox
          label={this.label}
          checked={this.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

class NrInRangeFilter extends Filter {
  readonly value;
  readonly unit;
  readonly rangeOptions;

  constructor(
    label: string,
    value: { nr: number; from: number; to: number },
    unit: string,
    rangeOptions: Record<string, string>,
    handleChange: (nr: number, from: number, to: number) => void,
    handleReset: () => void
  ) {
    super(label, handleReset);
    this.value = value;
    this.unit = unit;
    this.rangeOptions = rangeOptions;
    this.handleChange = handleChange;
  }

  isActive(): boolean {
    return this.value.nr > 0;
  }

  handleChange: (nr: number, from: number, to: number) => void;

  valueToString(): string {
    return `vsaj ${pluralizeNoun(this.unit, this.value.nr)} med ${
      this.rangeOptions[this.value.from]
    } in ${this.rangeOptions[this.value.to]}`;
  }

  renderFilterGroup(): ReactNode {
    return (
      <NrInRangeFilterGroup
        label={this.label}
        value={this.value}
        unit={this.unit}
        rangeOptions={this.rangeOptions}
        onChange={this.handleChange}
      />
    );
  }
}

class RangeFilter extends Filter {
  readonly value;
  readonly min;
  readonly max;
  readonly unit;

  constructor(
    label: string,
    value: { from: number; to: number },
    min: number,
    max: number,
    unit: string,
    handleChange: (from: number, to: number) => void,
    handleReset: () => void
  ) {
    super(label, handleReset);
    this.value = value;
    this.min = min;
    this.max = max;
    this.unit = unit;
    this.handleChange = handleChange;
  }

  isActive(): boolean {
    return this.value.from != this.min || this.value.to != this.max;
  }

  valueToString(): string {
    return `${this.value.from}-${this.value.to} ${this.unit}`;
  }

  renderFilterGroup(): ReactNode {
    return (
      <RangeFilterGroup
        label={this.label}
        value={this.value}
        min={this.min}
        max={this.max}
        onChange={this.handleChange}
      />
    );
  }

  handleChange: (from: number, to: number) => void;
}

export { Filter, MultiFilter, BooleanFilter, NrInRangeFilter, RangeFilter };

type TCheckboxesFilterGroupProps = {
  label: string;
  nrShown: number | "all";
  options: Record<string, string>;
  checkedOptions: string[];
  onChange: (checked: boolean, optionValue: string) => void;
};

function CheckboxesFilterGroup({
  label,
  options,
  nrShown,
  checkedOptions,
  onChange,
}: TCheckboxesFilterGroupProps) {
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

type TNrInRangeFilterGroup = {
  label: string;
  value: { nr: number; from: number; to: number };
  unit: string;
  rangeOptions: Record<string, string>;
  onChange: (nr: number, from: number, to: number) => void;
};

function NrInRangeFilterGroup({
  label,
  value,
  unit,
  rangeOptions,
  onChange,
}: TNrInRangeFilterGroup) {
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
            {unit}
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
                {Object.entries(rangeOptions).map(([fromValue, fromLabel]) => (
                  <Option key={fromValue} value={`${fromValue}`}>
                    {fromLabel}
                  </Option>
                ))}
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
                {Object.entries(rangeOptions).map(([fromValue, fromLabel]) => (
                  <Option key={fromValue} value={`${fromValue}`}>
                    {fromLabel}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type TRangeFilterGroup = {
  label: string;
  min: number;
  max: number;
  value: { from: number; to: number };
  onChange: (from: number, to: number) => void;
};

function RangeFilterGroup({
  label,
  value,
  min,
  max,
  onChange,
}: TRangeFilterGroup) {
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
