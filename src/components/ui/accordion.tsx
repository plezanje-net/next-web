import Link from "next/link";
import { ReactNode } from "react";
import IconCollapse from "./icons/collapse";
import IconExpand from "./icons/expand";

interface AccordionProps {
  label: string;
  isOpen: boolean;
  children: ReactNode;
  onClick: () => void;
}

function Accordion({ label, isOpen, children, onClick }: AccordionProps) {
  return (
    <div>
      <button
        className={`flex w-full items-center justify-between bg-neutral-100 px-4 py-5 text-left text-xl ${
          isOpen && "bg-white"
        }`}
        onClick={onClick}
      >
        <span>{label}</span>
        {isOpen ? <IconCollapse /> : <IconExpand />}
      </button>
      {isOpen && (
        <div className="border-t border-t-neutral-200">{children}</div>
      )}
    </div>
  );
}

export default Accordion;
