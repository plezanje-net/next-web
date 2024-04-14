import { ActivityRoute } from "@/graphql/generated";
import displayDate from "@/utils/display-date";
import Link from "@/components/ui/link";
import AscentType from "@/components/ascent-type";

type TRouteAscentsProps = {
  routeId: string;
  activityRoutes: ActivityRoute[];
  myAscents?: boolean;
};

function RouteAscents({
  routeId,
  activityRoutes,
  myAscents = false,
}: TRouteAscentsProps) {
  return (
    <>
      <table>
        <tbody>
          {activityRoutes.map(({ id, date, user, ascentType }) => (
            <tr key={id}>
              <td className="pb-1 pr-4">{displayDate(date)}</td>
              {!myAscents && <td className="pb-1 pr-4">{user.fullName}</td>}
              <td className="pb-1">
                <AscentType ascentType={ascentType} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Link href={`/vzponi?route=${routeId}`}>Prikaži vse</Link>
      </div>
    </>
  );
}

export default RouteAscents;
