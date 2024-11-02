import Button from "@/components/ui/button";
import IconFilter from "@/components/ui/icons/filter";
import Dialog, { DialogSize } from "@/components/ui/dialog";
import Checkbox from "@/components/ui/checkbox";
import { AscentType, PublishType } from "@/graphql/generated";
import DatePicker, { TDate } from "@/components/ui/date-picker";
import { useState } from "react";

type TVisibilityOption = {
  label: string;
  value: PublishType;
};

type TAscentTypeOption = {
  label: string;
  value: AscentType;
};

function Filter() {
  const nrFiltersActive = 0;

  const [dateFrom, setDateFrom] = useState<TDate>({
    day: "dd",
    month: "mm",
    year: "llll",
  });

  const [dateTo, setDateTo] = useState<TDate>({
    day: "dd",
    month: "mm",
    year: "llll",
  });

  const visibilityOptions: TVisibilityOption[] = [
    { label: "javno", value: PublishType.Public },
    { label: "klub in prijatelji", value: PublishType.Club },
    { label: "samo zame", value: PublishType.Private },
  ];

  const ascentTypeOptions: TAscentTypeOption[] = [
    { label: "na pogled", value: AscentType.Onsight },
    { label: "flash", value: AscentType.Flash },
    { label: "z rdečo piko", value: AscentType.Redpoint },
    { label: "repeat", value: AscentType.Repeat },
    { label: "vse prosto", value: AscentType.Allfree },
    { label: "tehnično", value: AscentType.Aid },
    { label: "neuspel poskus", value: AscentType.Attempt },
  ];

  const handleFilterClose = () => {
    console.log("close");
  };

  const handleApplyFilter = () => {
    console.log("apply");
  };

  function handleDateFromChange(value: TDate) {
    console.log(value);
  }

  return (
    <Dialog
      openTrigger={
        <Button variant="quaternary">
          <span className="flex">
            <IconFilter />
            <span>
              <span className="ml-2 max-lg:hidden">Filtriraj</span>
              {nrFiltersActive > 0 && <>&nbsp;({nrFiltersActive})</>}
            </span>
          </span>
        </Button>
      }
      dialogSize={DialogSize.hug}
      title="Filtriraj vzpone"
      confirm={{ label: "Filtriraj", callback: handleApplyFilter }}
      cancel={{ label: "Prekliči", callback: handleFilterClose }}
      closeCallback={handleFilterClose}
    >
      <div className="flex flex-col flex-wrap gap-8 md:flex-row">
        <div className="w-30 lg:w-80 flex flex-col gap-2">
          <div>
            <div>Od datuma</div>
            <div className="mt-1">
              <DatePicker value={dateFrom} onChange={setDateFrom} />
            </div>
          </div>
          <div>
            <div>Do datuma</div>
            <div className="mt-1">
              <DatePicker value={dateTo} onChange={setDateTo} />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div>Glede na tip vzpona</div>
          <div className="mt-2 flex flex-col gap-1">
            {ascentTypeOptions.map((option) => (
              <div key={option.value}>
                <Checkbox
                  label={option.label}
                  checked={false}
                  onChange={() => {}}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div>Glede na vidnost</div>
          <div className="mt-2 flex flex-col gap-1">
            {visibilityOptions.map((option) => (
              <div key={option.value}>
                <Checkbox
                  label={option.label}
                  checked={false}
                  onChange={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default Filter;
