import { AscentType as AscentTypeEnum } from "@/graphql/generated";
import IconOnsight from "./ui/icons/onsight";
import { IconSize } from "./ui/icons/icon-size";
import IconFlash from "./ui/icons/flash";
import IconRedPoint from "./ui/icons/red-point";
import IconRepeat from "./ui/icons/repeat";
import IconAllFree from "./ui/icons/all-free";
import IconAid from "./ui/icons/aid";
import IconAttempt from "./ui/icons/attempt";
import IconToprope from "./ui/icons/toprope";

type TAscentTypeProps = {
  type: AscentTypeEnum;
  compact?: boolean;
  iconSize?: IconSize.small | IconSize.regular;
};

function AscentType({
  type,
  compact = false,
  iconSize = IconSize.regular,
}: TAscentTypeProps) {
  switch (type) {
    case AscentTypeEnum.Onsight:
      return (
        <div className="flex gap-1">
          <IconOnsight size={iconSize} />
          {!compact && <div>na pogled</div>}
        </div>
      );

    case AscentTypeEnum.Flash:
      return (
        <div className="flex gap-1">
          <IconFlash size={iconSize} />
          {!compact && <div>flash</div>}
        </div>
      );

    case AscentTypeEnum.Redpoint:
      return (
        <div className="flex gap-1">
          <IconRedPoint size={iconSize} />
          {!compact && <div>rdeča pika</div>}
        </div>
      );

    case AscentTypeEnum.Repeat:
      return (
        <div className="flex gap-1">
          <IconRepeat size={iconSize} />
          {!compact && <div>ponovitev</div>}
        </div>
      );

    case AscentTypeEnum.Allfree:
      return (
        <div className="flex gap-1">
          <IconAllFree size={iconSize} />
          {!compact && <div>vse prosto</div>}
        </div>
      );

    case AscentTypeEnum.Aid:
      return (
        <div className="flex gap-1">
          <IconAid size={iconSize} />
          {!compact && <div>tehnično</div>}
        </div>
      );

    case AscentTypeEnum.Attempt:
      return (
        <div className="flex gap-1">
          <IconAttempt size={iconSize} />
          {!compact && <div>neuspešno</div>}
        </div>
      );

    case AscentTypeEnum.TOnsight:
      return (
        <div className="flex gap-1">
          <div className="flex flex-shrink-0">
            <IconToprope size={iconSize} />
            <IconOnsight size={iconSize} />
          </div>
          {!compact && <div>na pogled z varovanjem od zgoraj</div>}
        </div>
      );

    case AscentTypeEnum.TFlash:
      return (
        <div className="flex gap-1">
          <div className="flex flex-shrink-0">
            <IconToprope size={iconSize} />
            <IconFlash size={iconSize} />
          </div>
          {!compact && <div>flash z varovanjem od zgoraj</div>}
        </div>
      );

    case AscentTypeEnum.TRedpoint:
      return (
        <div className="flex gap-1">
          <div className="flex flex-shrink-0">
            <IconToprope size={iconSize} />
            <IconRedPoint size={iconSize} />
          </div>
          {!compact && <div>rdeča pika z varovanjem od zgoraj</div>}
        </div>
      );

    case AscentTypeEnum.TRepeat:
      return (
        <div className="flex gap-1">
          <div className="flex flex-shrink-0">
            <IconToprope size={iconSize} />
            <IconRepeat size={iconSize} />
          </div>
          {!compact && <div>ponovitev z varovanjem od zgoraj</div>}
        </div>
      );

    case AscentTypeEnum.TAllfree:
      return (
        <div className="flex gap-1">
          <div className="flex flex-shrink-0">
            <IconToprope size={iconSize} />
            <IconAllFree size={iconSize} />
          </div>
          {!compact && <div>vse prosto z varovanjem od zgoraj</div>}
        </div>
      );

    case AscentTypeEnum.TAid:
      return (
        <div className="flex gap-1">
          <div className="flex flex-shrink-0">
            <IconToprope size={iconSize} />
            <IconAid size={iconSize} />
          </div>
          {!compact && <div>tehnično z varovanjem od zgoraj</div>}
        </div>
      );

    case AscentTypeEnum.TAttempt:
      return (
        <div className="flex gap-1">
          <div className="flex flex-shrink-0">
            <IconToprope size={iconSize} />
            <IconAttempt size={iconSize} />
          </div>
          {!compact && <div>neuspešno z varovanjem od zgoraj</div>}
        </div>
      );

    default:
      throw Error(`Neznan tip vzpona: ${type}.`);
  }
}

export default AscentType;
