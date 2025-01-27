import AscentType from "@/components/ascent-type";
import Grade from "@/components/grade";
import Button from "@/components/ui/button";
import { IconSize } from "@/components/ui/icons/icon-size";
import IconMore from "@/components/ui/icons/more";
import { ActivityRoute } from "@/graphql/generated";
import displayDate from "@/lib/display-date";
import { useAscentsContext } from "../../lib/ascents-context";
import CragLink from "@/components/crag-link";
import RouteLink from "@/components/route-link";

type TAscentRowProps = {
  ascent: ActivityRoute;
};

function AscentRow({ ascent }: TAscentRowProps) {
  const { columns } = useAscentsContext();

  return (
    <tr className="border-b border-neutral-200">
      {columns.shown.map((column, index) => {
        let cellContent;
        switch (column.name) {
          case "date":
            cellContent = (
              <span className="whitespace-nowrap">
                {displayDate(ascent.date)}
              </span>
            );
            break;

          case "crag":
            cellContent = <CragLink crag={ascent.route.crag} />;
            break;

          case "route":
            cellContent = <RouteLink route={ascent.route} />;
            break;

          case "difficulty":
            cellContent = ascent.route.difficulty && (
              <Grade difficulty={ascent.route.difficulty} />
            );
            break;

          case "ascentType":
            cellContent = (
              <AscentType
                type={ascent.ascentType}
                compact={false}
                iconSize={IconSize.regular}
              />
            );
            break;

          case "notes":
            cellContent = ascent.notes;
            break;

          case "visibility":
            cellContent =
              ascent.publish == "public"
                ? "javno"
                : ascent.publish == "club"
                  ? "klub in prijatelji"
                  : "samo zame";
            break;

          case "more":
            cellContent = (
              <Button variant="quaternary">
                <span className="-m-1">
                  <IconMore size={IconSize.regular} />
                </span>
              </Button>
            );
            break;
        }

        return (
          <td
            key={index}
            className={`hyphens-auto break-words p-4 [word-break:break-word] first:pl-0 last:pr-0 align-top ${
              columns.shown.length > 1 ? "last:text-right" : ""
            }`}
          >
            {cellContent}
          </td>
        );
      })}
    </tr>
  );
}

export default AscentRow;
