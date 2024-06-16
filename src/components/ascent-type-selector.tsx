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
import { useState } from "react";

type TAscentTypeSelectorProps = {
  value: AscentType | null;
  onChange: (at: AscentType) => void;
  disabledOptions?: Set<AscentType>;
};

function AscentTypeSelector({
  value,
  onChange,
  disabledOptions,
}: TAscentTypeSelectorProps) {
  const [toprope, setToprope] = useState(false);

  const ascentTypeOptions = toprope
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
      switch (value) {
        case AscentType.Onsight:
          onChange(AscentType.TOnsight);
          break;
        case AscentType.Flash:
          onChange(AscentType.TFlash);
          break;
        case AscentType.Redpoint:
          onChange(AscentType.TRedpoint);
          break;
        case AscentType.Allfree:
          onChange(AscentType.TAllfree);
          break;
        case AscentType.Attempt:
          onChange(AscentType.TAttempt);
      }
    } else {
      switch (value) {
        case AscentType.TOnsight:
          onChange(AscentType.Onsight);
          break;
        case AscentType.TFlash:
          onChange(AscentType.Flash);
          break;
        case AscentType.TRedpoint:
          onChange(AscentType.Redpoint);
          break;
        case AscentType.TAllfree:
          onChange(AscentType.Allfree);
          break;
        case AscentType.TAttempt:
          onChange(AscentType.Attempt);
      }
    }
    setToprope(tr);
  };

  return (
    <div>
      <RadioGroup
        value={value}
        onChange={onChange}
        className="flex flex-wrap justify-center gap-2"
      >
        {ascentTypeOptions.map((option) => {
          const disabled = disabledOptions && disabledOptions.has(option.value);
          return (
            <Radio
              key={option.value}
              className={`flex flex-col items-center rounded-lg border border-white px-5 py-3 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-100 data-[checked]:border-neutral-400 data-[checked]:text-blue-500 ${disabled ? "text-neutral-300" : "cursor-pointer hover:bg-neutral-100"}`}
              value={option.value}
              disabled={disabled}
            >
              {option.icon}
              {option.label}
            </Radio>
          );
        })}
      </RadioGroup>

      <div className="mt-2">
        <Checkbox
          label="Z varovanjem od zgoraj"
          checked={toprope}
          onChange={handleTopropeChange}
        />
      </div>
    </div>
  );
}

export default AscentTypeSelector;
