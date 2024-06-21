import AscentIcon from "@/components/ui/ascent-icon";
import { IconSize } from "@/components/ui/icons/icon-size";
import IconToprope from "./ui/icons/toprope";

type TAscentTypeProps = {
  ascentType: string;
};

function AscentType({ ascentType }: TAscentTypeProps) {
  // TODO: this probably belongs somewhere else
  const text: { [key: string]: string } = {
    onsight: "na pogled",
    flash: "flash",
    redpoint: "z rdečo piko",
    repeat: "ponovitev",
    allfree: "vse prosto",
    aid: "tehnično plezanje",
    attempt: "neuspel poskus",
  };

  const isTopRope = ascentType.startsWith("t_");
  const baseAscentType = isTopRope ? ascentType.slice(2) : ascentType;

  return (
    <div className="flex gap-1">
      {isTopRope && <IconToprope size={IconSize.regular} />}
      <AscentIcon ascent={baseAscentType} size={IconSize.regular} />
      <span className="hidden @md:inline">
        {text[baseAscentType]}
        {isTopRope && " z varovanjem od zgoraj"}
      </span>
    </div>
  );
}

export default AscentType;
