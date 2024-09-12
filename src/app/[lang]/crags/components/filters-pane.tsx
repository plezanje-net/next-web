import IconFilter from "@/components/ui/icons/filter";
import { Fragment } from "react";
import { Filter, MultiFilter, RangeFilter } from "./filtersHelp";
import Button from "@/components/ui/button";
import IconReset from "@/components/ui/icons/reset";
import { IconSize } from "@/components/ui/icons/icon-size";

type TFiltersPane = {
  open: boolean;
  filtersData: Record<string, Filter>;
  onResetAll: () => void;
};

function FiltersPane({ open, filtersData, onResetAll }: TFiltersPane) {
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

      {Object.values(filtersData)
        .filter((filter) => {
          if (
            filter instanceof MultiFilter &&
            Object.keys(filter.options).length == 0
          ) {
            // do not display a multi filter with no options
            return false;
          }

          if (filter instanceof RangeFilter && filter.min == filter.max) {
            // do not display a range filter with same min and max as it makes no sense then
            return false;
          }

          return true;
        })
        .map((filter) => (
          <Fragment key={filter.label}>{filter.renderFilterGroup()}</Fragment>
        ))}

      <div className="mt-5 border-t border-neutral-200 px-8 pb-5 pt-4">
        <Button variant="tertiary" onClick={onResetAll}>
          <span className="flex gap-2">
            <IconReset size={IconSize.regular} />
            Ponastavi vse
          </span>
        </Button>
      </div>
    </div>
  );
}

export default FiltersPane;
