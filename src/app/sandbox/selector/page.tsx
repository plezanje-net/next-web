"use client";

import { IconSize } from "@/components/ui/icons/icon-size";
import IconOverhang from "@/components/ui/icons/overhang";
import IconRoof from "@/components/ui/icons/roof";
import IconSlab from "@/components/ui/icons/slab";
import IconVertical from "@/components/ui/icons/vertical";

import { Selector, SelectorOption } from "@/components/ui/selector";
import { WallAngle } from "@/graphql/generated";
import { useState } from "react";

function SelectorPage() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className="m-8">
      <h3>Selector demo</h3>

      <div className="mt-14">
        <h5>A selector for wall angles</h5>
        <div className="mt-2">
          <Selector
            value={value}
            onChange={setValue}
            label="Select wall angles"
          >
            <SelectorOption value={WallAngle.Slab}>
              <div className="flex flex-col items-center">
                <IconSlab size={IconSize.large} />
                <span>plošče</span>
              </div>
            </SelectorOption>
            <SelectorOption value={WallAngle.Vertical}>
              <div className="flex flex-col items-center">
                <IconVertical size={IconSize.large} />
                <span>vertikale</span>
              </div>
            </SelectorOption>
            <SelectorOption value={WallAngle.Overhang}>
              <div className="flex flex-col items-center">
                <IconOverhang size={IconSize.large} />
                <span>previsi</span>
              </div>
            </SelectorOption>
            <SelectorOption value={WallAngle.Roof}>
              <div className="flex flex-col items-center">
                <IconRoof size={IconSize.large} />
                <span>strehe</span>
              </div>
            </SelectorOption>
          </Selector>
        </div>
      </div>
    </div>
  );
}

export default SelectorPage;
