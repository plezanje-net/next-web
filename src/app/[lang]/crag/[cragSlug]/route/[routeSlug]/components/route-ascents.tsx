"use client";
import { ActivityRoute } from "@/graphql/generated";
import displayDate from "@/utils/display-date";
import Link from "@/components/ui/link";
import AscentType from "@/components/ascent-type";
import { useState } from "react";
import routeAscentsAction from "./server-actions/route-ascents-action";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import useBreakpoint from "@/hooks/useBreakpoint";

type TRouteAscentsProps = {
  routeId: string;
  activityRoutes: ActivityRoute[];
  pageCount: number;
  myAscents?: boolean;
};

function RouteAscents({
  routeId,
  activityRoutes,
  pageCount: initialPageCount,
  myAscents = false,
}: TRouteAscentsProps) {
  const [ascents, setAscents] = useState<ActivityRoute[]>([...activityRoutes]);
  const [pageNumber, setPageNumber] = useState(1);
  const [allAscents, setAllAscents] = useState(false);
  const [pageCount, setPageCount] = useState(initialPageCount);
  const breakpoint = useBreakpoint();

  function loadMore() {
    routeAscentsAction(routeId, pageNumber + 1, allAscents).then(
      ({ items }) => {
        setAscents([...ascents, ...items]);
      }
    );
    setPageNumber(pageNumber + 1);
  }

  function changeType(value: string) {
    routeAscentsAction(routeId, 1, value === "all").then(({ items, meta }) => {
      setAscents([...items]);
      setPageCount(meta.pageCount);
    });
    setAllAscents(value === "all");
    setPageNumber(1);
  }
  
  return (
    <div className="@container">
      <div className="pb-1 ">
        <RadioGroup defaultValue="successful" inline onChange={changeType}>
          <Radio value="successful">samo uspešni</Radio>
          <Radio value="all">vsi</Radio>
        </RadioGroup>
      </div>
      {ascents.length === 0 && "Smer nima zabeleženih javnih vzponov."}
      <table>
        <tbody>
          {ascents.map(({ id, date, user, ascentType }) => (
            <tr key={id}>
              <td className="text-nowrap pb-1 pr-4 align-top">
                {displayDate(date)}
              </td>
              {!myAscents && (
                <td className="text-nowrap pb-1 pr-4 align-top">
                  {user.fullName}
                </td>
              )}
              <td className="pb-1">
                <AscentType type={ascentType} compact={['default', 'xs', 'md', 'lg'].includes(breakpoint)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {pageCount > pageNumber && (
        <div>
          <Link href="" onPress={loadMore}>
            Prikaži več
          </Link>
        </div>
      )}
    </div>
  );
}

export default RouteAscents;
