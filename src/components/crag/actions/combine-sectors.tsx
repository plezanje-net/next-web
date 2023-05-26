import { useRouter } from "next/router";
import Button from "../../ui/button";
import IconMerge from "../../ui/icons/merge";
import IconUnmerge from "../../ui/icons/unmerge";
import { toggleQueryParam } from "../../../utils/route-helpers";

function CombineSectors() {
  const router = useRouter();

  const handleToggleCombine = () => {
    toggleQueryParam(router, "combine", router.query.combine ? null : "true");
  };

  return (
    <Button renderStyle="icon" onClick={handleToggleCombine}>
      <span className="flex">
        {!router.query.combine && <IconMerge />}
        {router.query.combine && <IconUnmerge />}
        <span className="ml-2 max-lg:hidden">
          {router.query.combine ? "Razdruži sektorje" : "Združi sektorje"}
        </span>
      </span>
    </Button>
  );
}

export default CombineSectors;