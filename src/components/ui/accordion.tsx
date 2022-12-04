import Link from "next/link";
import { ReactNode } from "react";
import IconCollapse from "./icons/collapse";
import IconExpand from "./icons/expand";

interface AccordionProps {
  label: string;
  isOpen: boolean;
  children: ReactNode;
}

function Accordion({ label, isOpen, children }: AccordionProps) {
  return (
    <div>
      <button className="flex w-full items-center justify-between bg-neutral-100 px-4 py-5 text-left text-xl">
        <span>{label}</span>
        {isOpen ? <IconCollapse /> : <IconExpand />}
      </button>
    </div>
  );
}

export default Accordion;
