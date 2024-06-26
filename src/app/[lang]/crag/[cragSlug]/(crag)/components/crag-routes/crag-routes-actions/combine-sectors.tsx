// import { useRouter } from "next/router";
import Button from "@/components/ui/button";
import IconMerge from "@/components/ui/icons/merge";
import IconUnmerge from "@/components/ui/icons/unmerge";
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

  const disabled = !!cragRoutesState.search?.query || cragRoutesState.noSectors;

  return (
    <Button
      variant="quaternary"
      onClick={disabled ? () => {} : handleToggleCombine}
      disabled={disabled}
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
