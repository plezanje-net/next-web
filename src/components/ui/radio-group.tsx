import { ReactNode } from "react";
import {
  Description,
  Label,
  RadioGroup as RadioGroupHUI,
  Radio as RadioHUI,
} from "@headlessui/react";

type TRadioGroupProps = {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  description?: string;
  defaultValue?: string;
  disabled?: boolean;
  errorMessage?: string;
  inline?: boolean;
  children: ReactNode[];
};

function RadioGroup({
  name,
  value,
  onChange,
  label,
  description,
  defaultValue,
  disabled,
  errorMessage,
  inline,
  children,
}: TRadioGroupProps) {
  return (
    <RadioGroupHUI
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      disabled={disabled}
    >
      <Label>{label}</Label>

      <div
        className={`flex items-start
                    ${label ? "mt-2" : ""}
                    ${inline ? "space-x-4" : "flex-col space-y-1"}`}
      >
        {children}
      </div>

      {description && !errorMessage && (
        <Description className="mt-1 text-sm">{description}</Description>
      )}

      {errorMessage && (
        <div className="mt-1 text-sm text-red-500">{errorMessage}</div>
      )}
    </RadioGroupHUI>
  );
}

type TRadioProps = {
  value: string;
  disabled?: boolean;
  children: ReactNode;
};

function Radio({ value, disabled, children }: TRadioProps) {
  return (
    <RadioHUI
      value={value}
      as="label"
      className="group inline-flex items-center outline-none"
      disabled={disabled}
    >
      {({ focus, checked, disabled }) => (
        <>
          <div
            aria-hidden="true"
            className={`rounded-lg ${focus ? "ring ring-blue-100" : ""}`}
          >
            <RadioCircle checked={checked} disabled={disabled} />
          </div>

          <span className={`ml-2 ${disabled ? "text-neutral-400" : ""}`}>
            {children}
          </span>
        </>
      )}
    </RadioHUI>
  );
}

type TRadioCircleProps = {
  checked: boolean;
  disabled: boolean;
};

function RadioCircle({ checked, disabled }: TRadioCircleProps) {
  return (
    <div
      // radio circle (outer)
      className={`flex h-4 w-4 items-center justify-center rounded-lg border 
               ${
                 !disabled && !checked
                   ? "border-neutral-400 group-active:border-neutral-500"
                   : ""
               }             
               ${
                 !disabled && checked
                   ? "border-blue-500 group-active:border-blue-600"
                   : ""
               }                                                 
               ${
                 disabled && !checked ? "border-neutral-300 bg-neutral-100" : ""
               }
               ${disabled && checked ? "border-neutral-300" : ""}`}
    >
      {checked && (
        <div
          // radio dot (inner)
          className={`h-2 w-2 rounded
                   ${
                     !disabled
                       ? "bg-blue-500 group-active:bg-blue-600"
                       : "bg-neutral-300"
                   } `}
        ></div>
      )}
    </div>
  );
}

export { RadioGroup, Radio, RadioCircle };
