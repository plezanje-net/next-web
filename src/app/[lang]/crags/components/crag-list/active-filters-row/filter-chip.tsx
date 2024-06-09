import Button from "@/components/ui/button";
import IconClose from "@/components/ui/icons/close";

type TFilterChipProps = {
  label: string;
  value: string;
  onReset: () => void;
};

function FilterChip({ label, value, onReset }: TFilterChipProps) {
  return (
    <div className="inline-flex items-center rounded-lg bg-blue-50 py-px pl-3 pr-2">
      <div>
        {label}: {value}
      </div>
      <Button variant="quaternary" onClick={onReset}>
        <IconClose />
      </Button>
    </div>
  );
}

export default FilterChip;
