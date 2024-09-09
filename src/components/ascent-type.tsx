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
};

function AscentType({ type, compact = false }: TAscentTypeProps) {
  switch (type) {
    case AscentTypeEnum.Onsight:
      return (
        <div className="flex gap-1">
          <IconOnsight size={IconSize.regular} />
          {!compact && <div>na pogled</div>}
        </div>
      );

    case AscentTypeEnum.Flash:
      return (
        <div className="flex gap-1">
          <IconFlash size={IconSize.regular} />
          {!compact && <div>flash</div>}
        </div>
      );

    case AscentTypeEnum.Redpoint:
      return (
        <div className="flex gap-1">
          <IconRedPoint size={IconSize.regular} />
          {!compact && <div>rdeča pika</div>}
        </div>
      );

    case AscentTypeEnum.Repeat:
      return (
        <div className="flex gap-1">
          <IconRepeat size={IconSize.regular} />
          {!compact && <div>ponovitev</div>}
        </div>
      );

    case AscentTypeEnum.Allfree:
      return (
        <div className="flex gap-1">
          <IconAllFree size={IconSize.regular} />
          {!compact && <div>vse prosto</div>}
        </div>
      );

    case AscentTypeEnum.Aid:
      return (
        <div className="flex gap-1">
          <IconAid size={IconSize.regular} />
          {!compact && <div>tehnično</div>}
        </div>
      );

    case AscentTypeEnum.Attempt:
      return (
        <div className="flex gap-1">
          <IconAttempt size={IconSize.regular} />
          {!compact && <div>neuspešno</div>}
        </div>
      );

    case AscentTypeEnum.TOnsight:
      return (
        <div className="flex gap-1">
          <div className="flex flex-shrink-0">
            <IconToprope size={IconSize.regular} />
            <IconOnsight size={IconSize.regular} />
          </div>
          {!compact && <div>na pogled z varovanjem od zgoraj</div>}
        </div>
      );

    case AscentTypeEnum.TFlash:
      return (
        <div className="flex gap-1">
          <div className="flex flex-shrink-0">
            <IconToprope size={IconSize.regular} />
            <IconFlash size={IconSize.regular} />
          </div>
          {!compact && <div>flash z varovanjem od zgoraj</div>}
        </div>
      );

    case AscentTypeEnum.TRedpoint:
      return (
        <div className="flex gap-1">
          <div className="flex flex-shrink-0">
            <IconToprope size={IconSize.regular} />
            <IconRedPoint size={IconSize.regular} />
          </div>
          {!compact && <div>rdeča pika z varovanjem od zgoraj</div>}
        </div>
      );

    case AscentTypeEnum.TRepeat:
      return (
        <div className="flex gap-1">
          <div className="flex flex-shrink-0">
            <IconToprope size={IconSize.regular} />
            <IconRepeat size={IconSize.regular} />
          </div>
          {!compact && <div>ponovitev z varovanjem od zgoraj</div>}
        </div>
      );

    case AscentTypeEnum.TAllfree:
      return (
        <div className="flex gap-1">
          <div className="flex flex-shrink-0">
            <IconToprope size={IconSize.regular} />
            <IconAllFree size={IconSize.regular} />
          </div>
          {!compact && <div>vse prosto z varovanjem od zgoraj</div>}
        </div>
      );

    case AscentTypeEnum.TAid:
      return (
        <div className="flex gap-1">
          <div className="flex flex-shrink-0">
            <IconToprope size={IconSize.regular} />
            <IconAid size={IconSize.regular} />
          </div>
          {!compact && <div>tehnično z varovanjem od zgoraj</div>}
        </div>
      );

    case AscentTypeEnum.TAttempt:
      return (
        <div className="flex gap-1">
          <div className="flex flex-shrink-0">
            <IconToprope size={IconSize.regular} />
            <IconAttempt size={IconSize.regular} />
          </div>
          {!compact && <div>neuspešno z varovanjem od zgoraj</div>}
        </div>
      );

    default:
      throw Error(`Neznan tip vzpona: ${type}.`);
  }
}

export default AscentType;
