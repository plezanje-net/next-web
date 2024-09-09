"use client";
import { ActivityRoute } from "@/graphql/generated";
import displayDate from "@/utils/display-date";
import Link from "@/components/ui/link";
import AscentType from "@/components/ascent-type";
import { useEffect, useState } from "react";
import routeAscentsAction from "./server-actions/route-ascents-action";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import routeMyAscentsAction from "./server-actions/route-my-ascents-action";

type TRouteAscentsProps = {
  routeId: string;
  userId: string;
  activityRoutes: ActivityRoute[];
  pageCount: number;
};

function RouteMyAscents({
  routeId,
  activityRoutes,
  pageCount: initialPageCount,
  userId,
}: TRouteAscentsProps) {
  const [ascents, setAscents] = useState<ActivityRoute[]>([...activityRoutes]);
  const [pageNumber, setPageNumber] = useState(1);
  const [allAscents, setAllAscents] = useState(true);
  const [pageCount, setPageCount] = useState(initialPageCount);

  function loadMore() {
    routeMyAscentsAction(routeId, userId, pageNumber + 1, allAscents).then(
      ({ items }) => {
        setAscents([...ascents, ...items]);
      }
    );
    setPageNumber(pageNumber + 1);
  }

  function changeType(value: string) {
    routeMyAscentsAction(routeId, userId, 1, value === "all").then(
      ({ items, meta }) => {
        setAscents([...items]);
        setPageCount(meta.pageCount);
      }
    );
    setAllAscents(value === "all");
    setPageNumber(1);
  }

  return (
    <div className="@container">
      <div className="pb-1 ">
        <RadioGroup defaultValue="all" inline onChange={changeType}>
          <Radio value="successful">samo uspešni</Radio>
          <Radio value="all">vsi</Radio>
        </RadioGroup>
      </div>
      {ascents.length === 0 &&
        `Za to smer še nimaš zabeleženih ${
          allAscents ? "" : "uspešnih"
        } vzponov.`}
      <table>
        <tbody>
          {ascents.map(({ id, date, ascentType }) => (
            <tr key={id}>
              <td className="text-nowrap pb-1 pr-4 align-top">
                {displayDate(date)}
              </td>
              <td className="pb-1">
                <AscentType type={ascentType} />
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

export default RouteMyAscents;
