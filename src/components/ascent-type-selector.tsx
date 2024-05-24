import { AscentType } from "@/graphql/generated";
import IconOnsight from "./ui/icons/onsight";
import { IconSize } from "./ui/icons/icon-size";
import IconRedPoint from "./ui/icons/red-point";
import IconFlash from "./ui/icons/flash";
import IconAllFree from "./ui/icons/all-free";
import IconAttempt from "./ui/icons/attempt";
import { Radio, RadioGroup } from "@headlessui/react";
import Checkbox from "./ui/checkbox";
import IconToprope from "./ui/icons/toprope";

type TAscentTypeSelectorProps = {
  ascentTypeValue: AscentType | null;
  onAscentTypeChange: (at: AscentType | null) => void;
  topropeValue: boolean;
  onTopropeChange: (tr: boolean) => void;
};

function AscentTypeSelector({
  ascentTypeValue,
  onAscentTypeChange,
  topropeValue,
  onTopropeChange,
}: TAscentTypeSelectorProps) {
  const ascentTypeOptions = topropeValue
    ? [
        {
          value: AscentType.TOnsight,
          label: "na pogled",
          icon: (
            <div className="flex">
              <IconOnsight size={IconSize.regular} />
              <IconToprope size={IconSize.regular} />
            </div>
          ),
        },
        {
          value: AscentType.TFlash,
          label: "flash",
          icon: (
            <div className="flex">
              <IconFlash size={IconSize.regular} />
              <IconToprope size={IconSize.regular} />
            </div>
          ),
        },
        {
          value: AscentType.TRedpoint,
          label: "rdeča pika",
          icon: (
            <div className="flex">
              <IconRedPoint size={IconSize.regular} />
              <IconToprope size={IconSize.regular} />
            </div>
          ),
        },
        {
          value: AscentType.TAllfree,
          label: "vse prosto",
          icon: (
            <div className="flex">
              <IconAllFree size={IconSize.regular} />
              <IconToprope size={IconSize.regular} />
            </div>
          ),
        },
        {
          value: AscentType.TAttempt,
          label: "neuspešno",
          icon: (
            <div className="flex">
              <IconAttempt size={IconSize.regular} />
              <IconToprope size={IconSize.regular} />
            </div>
          ),
        },
      ]
    : [
        {
          value: AscentType.Onsight,
          label: "na pogled",
          icon: <IconOnsight size={IconSize.regular} />,
        },
        {
          value: AscentType.Flash,
          label: "flash",
          icon: <IconFlash size={IconSize.regular} />,
        },
        {
          value: AscentType.Redpoint,
          label: "rdeča pika",
          icon: <IconRedPoint size={IconSize.regular} />,
        },
        {
          value: AscentType.Allfree,
          label: "vse prosto",
          icon: <IconAllFree size={IconSize.regular} />,
        },
        {
          value: AscentType.Attempt,
          label: "neuspešno",
          icon: <IconAttempt size={IconSize.regular} />,
        },
      ];

  const handleTopropeChange = (tr: boolean) => {
    if (tr) {
      switch (ascentTypeValue) {
        case AscentType.Onsight:
          onAscentTypeChange(AscentType.TOnsight);
          break;
        case AscentType.Flash:
          onAscentTypeChange(AscentType.TFlash);
          break;
        case AscentType.Redpoint:
          onAscentTypeChange(AscentType.TRedpoint);
          break;
        case AscentType.Allfree:
          onAscentTypeChange(AscentType.TAllfree);
          break;
        case AscentType.Attempt:
          onAscentTypeChange(AscentType.TAttempt);
      }
    } else {
      switch (ascentTypeValue) {
        case AscentType.TOnsight:
          onAscentTypeChange(AscentType.Onsight);
          break;
        case AscentType.TFlash:
          onAscentTypeChange(AscentType.Flash);
          break;
        case AscentType.TRedpoint:
          onAscentTypeChange(AscentType.Redpoint);
          break;
        case AscentType.TAllfree:
          onAscentTypeChange(AscentType.Allfree);
          break;
        case AscentType.TAttempt:
          onAscentTypeChange(AscentType.Attempt);
      }
    }
    onTopropeChange(tr);
  };

  return (
    <div>
      <RadioGroup
        value={ascentTypeValue}
        onChange={onAscentTypeChange}
        className="flex flex-wrap justify-center gap-2"
      >
        {ascentTypeOptions.map((option) => (
          <Radio
            key={option.value}
            className="flex cursor-pointer flex-col items-center rounded-lg border border-white px-5 py-3 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-100 data-[checked]:border-neutral-400 data-[checked]:text-blue-500"
            value={option.value}
          >
            {option.icon}
            {option.label}
          </Radio>
        ))}
      </RadioGroup>

      <div className="mt-2">
        <Checkbox
          label="Z varovanjem od zgoraj"
          checked={topropeValue}
          onChange={handleTopropeChange}
        />
      </div>
    </div>
  );
}

export default AscentTypeSelector;
