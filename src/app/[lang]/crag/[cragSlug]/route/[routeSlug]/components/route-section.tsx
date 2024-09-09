import { ReactNode } from "react";

type TRouteSectionProps = {
  label: string;
  className?: string;
  children: ReactNode;
};

function RouteSection({ label, className, children }: TRouteSectionProps) {
  return (
    <div className={`mb-3 mt-7 w-full ${className}`}>
      <h4 className="border-b border-b-neutral-200 py-4">{label}</h4>
      <div className="border-b border-b-neutral-200 py-8">{children}</div>
    </div>
  );
}

export default RouteSection;
