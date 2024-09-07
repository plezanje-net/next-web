import { useContext, useRef } from "react";
import { CragRoutesContext } from "./crag-routes";
import useIsVisible from "@/hooks/useIsVisible";
import { pluralizeNoun } from "@/utils/text-helpers";
import Button from "@/components/ui/button";
import LogDialog from "@/components/log-dialog/log-dialog";

function LogRoutesPopover() {
  const { checkedRoutes, uncheckAllRoutes } = useContext(CragRoutesContext);
  const ref = useRef<HTMLDivElement>(null);
  const dummyVisible = useIsVisible(ref);
  const liftPopover = !dummyVisible;
  const nrUniqueRoutes = new Set(checkedRoutes.map((r) => r.id)).size;

  return (
    <>
      {checkedRoutes.length > 0 && (
        <div
          ref={ref}
          className="sticky bottom-8 inline-flex justify-center mb-8"
        >
          <div>
            <div
              className={`bg-white flex gap-8 flex-col md:flex-row justify-between items-center p-8 border ${liftPopover ? "rounded-lg shadow-lg border-neutral-100" : "border-white"}`}
            >
              <div className="self-start md:self-auto">
                {pluralizeNoun("izbrana smer", nrUniqueRoutes)}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <Button variant="secondary" onClick={uncheckAllRoutes}>
                  Razveljavi izbor
                </Button>

                <LogDialog
                  openTrigger={
                    <Button variant="primary">Shrani v plezalni dnevnik</Button>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* A dummy div, for detecting when the 'stickiness' of the popover ends */}
      <div ref={ref}></div>
    </>
  );
}

export default LogRoutesPopover;
