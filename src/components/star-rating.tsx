import { IconSize } from "./ui/icons/icon-size";
import IconStarEmpty from "./ui/icons/star-empty";
import IconStarFull from "./ui/icons/star-full";

type TStarRatingProps = {
  rating: number;
  size: "regular" | "small";
};

function StarRating({ rating, size }: TStarRatingProps) {
  if (rating != 0 && rating != 1 && rating != 2) {
    throw new Error(`Star rating ${rating} does not exist.`);
  }

  const textSize = size == "regular" ? "text-base" : "text-sm";
  const iconSize = size == "regular" ? IconSize.regular : IconSize.small;

  switch (rating) {
    case 2:
      return (
        <div className={`flex ${textSize}`}>
          <IconStarFull size={iconSize} />
          <span>čudovita</span>
        </div>
      );
    case 1:
      return (
        <div className={`flex ${textSize}`}>
          <IconStarEmpty size={iconSize} />
          <span>lepa</span>
        </div>
      );
    case 0:
      return (
        <div className={textSize}>
          <span>nič posebnega</span>
        </div>
      );
  }
}

export default StarRating;
