import IconAid from "./icons/aid";
import IconAllFree from "./icons/all-free";
import IconAttempt from "./icons/attempt";
import IconFlash from "./icons/flash";
import { IconSize } from "./icons/icon-size";
import IconOnsight from "./icons/onsight";
import IconRedPoint from "./icons/red-point";
import IconRepeat from "./icons/repeat";

interface Props {
  ascent: string;
  size: IconSize.small | IconSize.regular;
}

function AscentIcon({ ascent, size }: Props) {
  switch (ascent) {
    case "onsight":
      return <IconOnsight size={size} />;
    case "flash":
      return <IconFlash size={size} />;
    case "redpoint":
      return <IconRedPoint size={size} />;
    case "repeat":
      return <IconRepeat size={size} />;
    case "allfree":
      return <IconAllFree size={size} />;
    case "aid":
      return <IconAid size={size} />;
    case "attempt":
      return <IconAttempt size={size} />;
  }

  return <></>;
}

export default AscentIcon;
