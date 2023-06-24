// import { useRouter } from "next/router";
import Button from "../../../ui/button";
import IconMerge from "../../../ui/icons/merge";
import IconUnmerge from "../../../ui/icons/unmerge";
import { toggleQueryParam } from "../../../../utils/route-helpers";
import { useContext } from "react";
import { CragRoutesContext } from "../../crag-routes";

function CombineSectors() {
  const { cragRoutesState, setCragRoutesState } = useContext(CragRoutesContext);

  const handleToggleCombine = () => {
    setCragRoutesState({
      ...cragRoutesState,
      combine: !cragRoutesState.combine,
    });
  };

  return (
    <Button renderStyle="icon" onClick={handleToggleCombine}>
      <span className="flex">
        {!cragRoutesState.combine && <IconMerge />}
        {cragRoutesState.combine && <IconUnmerge />}
        <span className="ml-2 max-lg:hidden">
          {cragRoutesState.combine ? "Razdruži sektorje" : "Združi sektorje"}
        </span>
      </span>
    </Button>
  );
}

export default CombineSectors;
