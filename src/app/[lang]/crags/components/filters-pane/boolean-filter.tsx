import Checkbox from "@/components/ui/checkbox";

type TBooleanFilterProps = {
  label: string;
  state: boolean;
  onChange: (v: boolean) => void;
};

function BooleanFilter({ label, state, onChange }: TBooleanFilterProps) {
  return (
    <div className="mt-5 border-t border-neutral-200 px-8 pt-5">
      <Checkbox label={label} checked={state} onChange={onChange} />
    </div>
  );
}

export default BooleanFilter;
