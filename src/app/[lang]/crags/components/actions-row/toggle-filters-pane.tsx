import Button from "@/components/ui/button";
import IconFilter from "@/components/ui/icons/filter";
import { useCragsContext } from "../../lib/crags-context";

function ToggleFiltersPane() {
  const {
    filtersPane: { toggleOpen },
  } = useCragsContext();

  return (
    <div className="flex items-center md:hidden">
      <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>
      <Button variant="quaternary" onClick={toggleOpen}>
        <IconFilter />
      </Button>
    </div>
  );
}

export default ToggleFiltersPane;
