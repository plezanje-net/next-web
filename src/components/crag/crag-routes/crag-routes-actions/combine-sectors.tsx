// import { useRouter } from "next/router";
import Button from "../../../ui/button";
import IconMerge from "../../../ui/icons/merge";
import IconUnmerge from "../../../ui/icons/unmerge";
import { CragRoutesContext } from "../../crag-routes";
import { useContext } from "react";

function CombineSectors() {
  const { cragRoutesState, setCragRoutesState } = useContext(CragRoutesContext);

  const handleToggleCombine = () => {
    setCragRoutesState({
      ...cragRoutesState,
      combine: !cragRoutesState.combine,
    });
  };

  return (
    <Button
      renderStyle="icon"
      onClick={cragRoutesState.search?.query ? () => {} : handleToggleCombine}
      isDisabled={!!cragRoutesState.search?.query}
    >
      <span className="flex">
        {cragRoutesState.combine || cragRoutesState.search?.query ? (
          <IconUnmerge />
        ) : (
          <IconMerge />
        )}
        <span className="ml-2 max-lg:hidden">
          {cragRoutesState.combine || cragRoutesState.search?.query
            ? "Razdruži sektorje"
            : "Združi sektorje"}
        </span>
      </span>
    </Button>
  );
}

export default CombineSectors;
