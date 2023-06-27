import IconAid from "./icons/aid";
import IconAllFree from "./icons/all-free";
import IconClose from "./icons/close";
import IconFlash from "./icons/flash";
import { IconSize } from "./icons/icon";
import IconOnsight from "./icons/onsight";
import IconRedPoint from "./icons/red-point";
import IconRepeat from "./icons/repeat";

interface Props {
  ascent: string;
  size?: IconSize;
  className?: string;
}

function AscentIcon({ ascent, size, className }: Props) {
  switch (ascent) {
    case "onsight":
      return <IconOnsight className={className} size={size} />;
    case "flash":
      return <IconFlash className={className} size={size} />;
    case "redpoint":
      return <IconRedPoint className={className} size={size} />;
    case "repeat":
      return <IconRepeat className={className} size={size} />;
    case "allfree":
      return <IconAllFree className={className} size={size} />;
    case "aid":
      return <IconAid className={className} size={size} />;
    case "attempt":
      return <IconClose className={className} size={size} />;
  }

  return <></>;
}

export default AscentIcon;
