import { ReactNode } from "react";

type TRouteInfoRow = {
  label: string;
  children: ReactNode;
};

function RouteInfoRow({ label, children }: TRouteInfoRow) {
  return (
    <tr>
      <td className="w-0 whitespace-nowrap pr-4">{label}:</td>
      <td>{children}</td>
    </tr>
  );
}

export default RouteInfoRow;
