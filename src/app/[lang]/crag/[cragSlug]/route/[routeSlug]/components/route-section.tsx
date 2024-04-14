import { ReactNode } from "react";

type TRouteSectionProps = {
  label: string;
  children: ReactNode;
};

function RouteSection({ label, children }: TRouteSectionProps) {
  return (
    <div className="mb-3 mt-7">
      <h4 className="border-b border-b-neutral-200 py-4">{label}</h4>
      <div className="border-b border-b-neutral-200 py-8">{children}</div>
    </div>
  );
}

export default RouteSection;
