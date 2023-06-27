import { useRouter } from "next/router";
import Button from "../../../ui/button";
import IconMerge from "../../../ui/icons/merge";
import IconUnmerge from "../../../ui/icons/unmerge";
import { toggleQueryParam } from "../../../../utils/route-helpers";
import { CragRoutesContext } from "../../crag-routes";
import { useContext } from "react";

function CombineSectors() {
  const router = useRouter();

  const { cragRoutesState } = useContext(CragRoutesContext);

  const handleToggleCombine = () => {
    toggleQueryParam(router, "combine", router.query.combine ? null : "true");
  };

  return (
    <Button
      renderStyle="icon"
      onClick={cragRoutesState.search?.query ? () => {} : handleToggleCombine}
      isDisabled={!!cragRoutesState.search?.query}
    >
      <span className="flex">
        {router.query.combine || cragRoutesState.search?.query ? (
          <IconUnmerge />
        ) : (
          <IconMerge />
        )}
        <span className="ml-2 max-lg:hidden">
          {router.query.combine || cragRoutesState.search?.query
            ? "Razdruži sektorje"
            : "Združi sektorje"}
        </span>
      </span>
    </Button>
  );
}

export default CombineSectors;
