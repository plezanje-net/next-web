import { Popover as PopoverHUI } from "@headlessui/react";
import { Fragment, ReactElement } from "react";

interface PopoverProps {
  children: ReactElement;
  openTrigger: ReactElement;
}
function Popover({ openTrigger, children }: PopoverProps) {
  return (
    <PopoverHUI className="relative">
      <PopoverHUI.Button as={Fragment}>{openTrigger}</PopoverHUI.Button>

      {/* use a wrap and use padding to get some minimum space below in cases that this would be the bottom most element on screen (margin would not work) */}
      <PopoverHUI.Panel className="absolute z-10 py-2">
        <div className="rounded-lg border border-neutral-100 bg-white p-8 shadow-lg">
          {children}
        </div>
      </PopoverHUI.Panel>
    </PopoverHUI>
  );
}

export default Popover;
