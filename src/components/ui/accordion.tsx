import { ReactNode } from "react";
import IconCollapse from "./icons/collapse";
import IconExpand from "./icons/expand";

type TAccordionProps = {
  label: string;
  isOpen: boolean;
  children: ReactNode;
  onClick: () => void;
  first?: boolean;
  last?: boolean;
  status?: "default" | "draft" | "in_review";
};

function Accordion({
  label,
  isOpen,
  children,
  onClick,
  first,
  last,
  status = "default",
}: TAccordionProps) {
  const bgClassName =
    status === "draft"
      ? "bg-red-25 hover:bg-red-50"
      : status === "in_review"
        ? "bg-amber-25 hover:bg-amber-50"
        : "bg-neutral-100 hover:bg-neutral-200";

  return (
    <div
      className={`overflow-hidden ${first ? "xs:rounded-t-lg" : ""}
      ${last ? "xs:rounded-b-lg" : ""}`}
    >
      <button
        className={`flex w-full items-center justify-between px-4 py-5 text-left text-xl ${bgClassName}`}
        onClick={onClick}
      >
        <span>{label}</span>
        {isOpen ? <IconCollapse /> : <IconExpand />}
      </button>
      {isOpen && (
        <div className="border-b border-t border-b-neutral-200 border-t-neutral-200">
          {children}
        </div>
      )}
    </div>
  );
}

export default Accordion;
