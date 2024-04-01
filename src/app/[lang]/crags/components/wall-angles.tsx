import { IconSize } from "@/components/ui/icons/icon-size";
import IconOverhang from "@/components/ui/icons/overhang";
import IconRoof from "@/components/ui/icons/roof";
import IconSlab from "@/components/ui/icons/slab";
import IconVertical from "@/components/ui/icons/vertical";
import { WallAngle } from "@/graphql/generated";

type TSeasonsProps = {
  wallAngles: string[];
  align?: "left" | "right";
};

function WallAngles({ wallAngles, align = "left" }: TSeasonsProps) {
  return (
    <div className={`flex gap-2 ${align == "right" ? "justify-end" : ""}`}>
      <div
        className={
          wallAngles.includes(WallAngle.Slab) ? "" : "text-neutral-200"
        }
      >
        <IconSlab size={IconSize.small} />
      </div>

      <div
        className={
          wallAngles.includes(WallAngle.Vertical) ? "" : "text-neutral-200"
        }
      >
        <IconVertical size={IconSize.small} />
      </div>

      <div
        className={
          wallAngles.includes(WallAngle.Overhang) ? "" : "text-neutral-200"
        }
      >
        <IconOverhang size={IconSize.small} />
      </div>

      <div
        className={
          wallAngles.includes(WallAngle.Roof) ? "" : "text-neutral-200"
        }
      >
        <IconRoof size={IconSize.small} />
      </div>
    </div>
  );
}

export default WallAngles;
