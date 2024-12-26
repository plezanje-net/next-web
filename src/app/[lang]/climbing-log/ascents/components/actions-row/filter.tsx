import Button from "@/components/ui/button";
import IconFilter from "@/components/ui/icons/filter";
import Dialog, { DialogSize } from "@/components/ui/dialog";
import Checkbox from "@/components/ui/checkbox";
import { AscentType, Crag, PublishType } from "@/graphql/generated";
import DatePicker, { TDateString } from "@/components/ui/date-picker";
import { Dispatch, FormEvent, SetStateAction, useMemo, useState } from "react";
import Combobox from "@/components/ui/combobox";
import populateCragsAction from "./server-actions/populate-crags-action";
import useAdvancedSearchParams from "@/hooks/useSearchParamsHandler";

type TVisibilityOption = {
  label: string;
  value: PublishType;
};

type TAscentTypeOption = {
  label: string;
  value: AscentType;
};

type TRouteTypeOption = {
  label: string;
  value: string;
};

export type TAscentListFilter = {
  crag?: Crag;
  dateFrom?: TDateString;
  dateTo?: TDateString;
  ascentType?: string[];
  visibility?: string[];
  routeType?: string[];
};

type TFilterProps = {
  filterValues: TAscentListFilter;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function Filter({ filterValues, isOpen, setIsOpen }: TFilterProps) {
  
  const [dateFrom, setDateFrom] = useState<TDateString>(
    filterValues.dateFrom ?? null
  );
  const [dateTo, setDateTo] = useState<TDateString>(
    filterValues.dateTo ?? null
  );

  const [ascentTypeValues, setAscentTypeValues] = useState<string[]>(
    filterValues.ascentType ?? []
  );
  const ascentTypeOptions: TAscentTypeOption[] = [
    { label: "na pogled", value: AscentType.Onsight },
    { label: "flash", value: AscentType.Flash },
    { label: "z rdečo piko", value: AscentType.Redpoint },
    { label: "repeat", value: AscentType.Repeat },
    { label: "vse prosto", value: AscentType.Allfree },
    { label: "tehnično", value: AscentType.Aid },
    { label: "neuspel poskus", value: AscentType.Attempt },
  ];

  const [visibilityValues, setVisibilityValues] = useState<string[]>(
    filterValues.visibility ?? []
  );

  const visibilityOptions: TVisibilityOption[] = [
    { label: "javno", value: PublishType.Public },
    { label: "klub in prijatelji", value: PublishType.Club },
    { label: "samo zame", value: PublishType.Private },
  ];

  const [routeTypeValues, setRouteTypeValues] = useState<string[]>(
    filterValues.routeType ?? []
  );
  const routeTypeOptions: TRouteTypeOption[] = [
    { label: "športna", value: "sport" },
    { label: "večraztežajna", value: "multipitch" },
    { label: "balvan", value: "boulder" },
    { label: "alpinistična", value: "alpine" },
    { label: "kombinirana", value: "combined" },
  ];

  async function populateCrags(text: string) {
    if (text === "") {
      return [];
    }
    const crags = await populateCragsAction(text);
    return crags.map((crag) => ({
      value: crag.id,
      name: crag.name,
    }));
  }

  const [cragId, setCragId] = useState<string | null>(null);
  function handleCragChange(value: string | null) {
    setCragId(value);
  }

  const countActiveFilters = () => {
    let nrFilters = 0;
    if (dateFrom) {
      nrFilters++;
    }
    if (dateTo) {
      nrFilters++;
    }
    if (ascentTypeValues.length > 0) {
      nrFilters++;
    }
    if (visibilityValues.length > 0) {
      nrFilters++;
    }
    if (routeTypeValues.length > 0) {
      nrFilters++;
    }
    return (dateFrom || dateTo ? 1 : 0) 
      + (ascentTypeValues.length > 0 ? 1 : 0) 
      + (visibilityValues.length > 0 ? 1 : 0)
      + (routeTypeValues.length > 0 ? 1 : 0)
      + (cragId ? 1 : 0);
  };

  const [nrActiveFilters, setNrActiveFilters] = useState(countActiveFilters());

  const { updateSearchParams } = useAdvancedSearchParams();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleApplyFilter();
  }

  function handleApplyFilter() {
    updateSearchParams({
      page: null,
      crag: cragId,
      dateFrom,
      dateTo,
      ascentType: ascentTypeValues,
      routeType: routeTypeValues,
      visibility: visibilityValues,
    });
    setNrActiveFilters(countActiveFilters());
    setIsOpen(false);
  }

  function handleMultuSelectChange(
    value: string,
    setState: Dispatch<SetStateAction<string[]>>
  ) {
    setState((prev: string[]) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      }
      return [...prev, value];
    });
  }

  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      openTrigger={
        <Button variant="quaternary">
          <span className="flex">
            <IconFilter />
            <span>
              <span className="ml-2 max-lg:hidden">Filtriraj</span>
              {nrActiveFilters > 0 && <>&nbsp;({nrActiveFilters})</>}
            </span>
          </span>
        </Button>
      }
      dialogSize={DialogSize.hug}
      title="Filtriraj vzpone"
      confirm={{
        label: "Filtriraj",
        callback: handleApplyFilter,
        dontCloseOnConfirm: true,
      }}
      cancel={{ label: "Prekliči" }}
    >
      <form
        className="flex flex-col flex-wrap gap-8 md:flex-row"
        onSubmit={handleSubmit}
      >
        <div className="w-30 lg:w-80 flex flex-col gap-4">
          <div>
            <DatePicker
              value={dateFrom}
              onChange={setDateFrom}
              label="Od datuma"
            />
          </div>
          <div>
            <DatePicker value={dateTo} onChange={setDateTo} label="Do datuma" />
          </div>
          <div>
            <Combobox
              value={
                filterValues.crag
                  ? {
                      value: filterValues.crag.id,
                      name: filterValues.crag.name,
                    }
                  : null
              }
              label="Plezališče"
              onChange={handleCragChange}
              populate={populateCrags}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div>Glede na tip vzpona</div>
          <div className="mt-2 flex flex-col gap-1">
            {ascentTypeOptions.map((option) => (
              <div key={option.value}>
                <Checkbox
                  label={option.label}
                  checked={ascentTypeValues.includes(option.value)}
                  onChange={() =>
                    handleMultuSelectChange(option.value, setAscentTypeValues)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <div>Glede na vidnost</div>
            <div className="mt-2 flex flex-col gap-1">
              {visibilityOptions.map((option) => (
                <div key={option.value}>
                  <Checkbox
                    label={option.label}
                    checked={visibilityValues.includes(option.value)}
                    onChange={() =>
                      handleMultuSelectChange(option.value, setVisibilityValues)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>Glede na tip smeri</div>
            <div className="mt-2 flex flex-col gap-1">
              {routeTypeOptions.map((option) => (
                <div key={option.value}>
                  <Checkbox
                    label={option.label}
                    checked={routeTypeValues.includes(option.value)}
                    onChange={() =>
                      handleMultuSelectChange(option.value, setRouteTypeValues)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <input type="submit" className="hidden" />
      </form>
    </Dialog>
  );
}

export default Filter;
