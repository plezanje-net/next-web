import { Route } from "@/graphql/generated";
import { IconSize } from "./ui/icons/icon-size";
import IconStarEmpty from "./ui/icons/star-empty";
import IconStarFull from "./ui/icons/star-full";

type TRouteStarRatingProps = {
  starRating: number;
  size: IconSize.small | IconSize.regular;
  showText?: boolean;
  showAll?: boolean;
};

function StarRating({
  starRating,
  size,
  showText,
  showAll,
}: TRouteStarRatingProps) {
  return (
    <>
      {starRating == 2 && (
        <div className="flex">
          <IconStarFull size={size} />{" "}
          {showText && <span className="ml-1">čudovita</span>}
        </div>
      )}
      {starRating == 1 && (
        <div className="flex">
          <IconStarEmpty size={size} />{" "}
          {showText && <span className="ml-1">lepa</span>}
        </div>
      )}
      {starRating == 0 && showAll && (
        <div className="flex">{showText && "nič posebnega"}</div>
      )}
    </>
  );
}

export default StarRating;
