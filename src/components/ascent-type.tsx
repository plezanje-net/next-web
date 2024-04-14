import AscentIcon from "@/components/ui/ascent-icon";
import { IconSize } from "@/components/ui/icons/icon-size";

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
    attempt: "neuspel poskus",
  };

  return (
    <div className="flex gap-1">
      <AscentIcon ascent={ascentType} size={IconSize.regular} />
      <span className="hidden sm:inline">{text[ascentType]}</span>
    </div>
  );
}

export default AscentType;
