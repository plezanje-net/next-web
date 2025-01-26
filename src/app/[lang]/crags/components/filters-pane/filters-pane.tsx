import IconFilter from "@/components/ui/icons/filter";
import Button from "@/components/ui/button";
import IconReset from "@/components/ui/icons/reset";
import { IconSize } from "@/components/ui/icons/icon-size";
import {
  TApproachTimeFilter,
  TBooleanFilter,
  TDifficultyFilter,
  TMultiFilter,
  useCragsContext,
} from "../../lib/crags-context";
import MultiFilter from "./multi-filter";
import DifficultyFilter from "./difficulty-filter";
import ApproachTimeFilter from "./approach-time-filter";
import BooleanFilter from "./boolean-filter";

function FiltersPane() {
  const {
    filters,
    filtersPane: { open },
  } = useCragsContext();

  /**
   * on >=md filters pane is always visible and is displayed as a card
   * on <md filters pane slides in from the side when filters are being changed
   **/
  return (
    <div
      className={`absolute left-0 w-80 shrink-0 rounded-r-lg bg-neutral-100 transition-transform md:relative md:block md:rounded-lg ${
        open ? "translate-x-0" : "-translate-x-80 md:translate-x-0"
      }`}
    >
      <div className="flex px-8 pb-1 pt-6">
        <div>
          <IconFilter />
        </div>
        <div className="ml-4">Filtriraj</div>
      </div>

      {filters.filters
        .filter((filter) => {
          switch (filter.type) {
            case "multi":
              if (Object.keys((filter as TMultiFilter).options).length == 0) {
                return false;
              }
              break;
          }
          return true;
        })
        .map((filter, index) => {
          switch (filter.type) {
            case "boolean":
              const booleanFilter = filter as TBooleanFilter;
              return (
                <BooleanFilter
                  key={index}
                  label={booleanFilter.label}
                  state={booleanFilter.state}
                  onChange={booleanFilter.onChange}
                />
              );
            case "multi":
              const multiFilter = filter as TMultiFilter;
              return (
                <MultiFilter
                  key={index}
                  label={multiFilter.label}
                  options={multiFilter.options}
                  checkedOptions={multiFilter.state}
                  nrShown={multiFilter.nrShown}
                  onChange={multiFilter.onChange}
                />
              );
            case "difficulty":
              const difficultyFilter = filter as TDifficultyFilter;
              return (
                <DifficultyFilter
                  key={index}
                  label={difficultyFilter.label}
                  value={{
                    nr: difficultyFilter.state[0],
                    from: difficultyFilter.state[1],
                    to: difficultyFilter.state[2],
                  }}
                  onChange={difficultyFilter.onChange}
                  difficultyGradeMap={difficultyFilter.difficultyGradeMap}
                />
              );
            case "approachTime":
              const approachTimeFilter = filter as TApproachTimeFilter;
              return (
                <ApproachTimeFilter
                  key={index}
                  label={approachTimeFilter.label}
                  value={{
                    from: approachTimeFilter.state[0],
                    to: approachTimeFilter.state[1],
                  }}
                  onChange={approachTimeFilter.onChange}
                  min={approachTimeFilter.minApproachTime}
                  max={approachTimeFilter.maxApproachTime}
                />
              );
          }
        })}

      <div className="mt-5 border-t border-neutral-200 px-8 pb-5 pt-4">
        <Button variant="tertiary" onClick={filters.resetAll}>
          <span className="flex gap-2">
            <IconReset />
            Ponastavi vse
          </span>
        </Button>
      </div>
    </div>
  );
}

export default FiltersPane;
