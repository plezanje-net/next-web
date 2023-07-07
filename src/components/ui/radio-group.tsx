import { ReactNode } from "react";
import { RadioGroup as RadioGroupHUI } from "@headlessui/react";

interface RadioProps {
  value: string;
  disabled?: boolean;
  children: ReactNode;
}

function Radio({ value, disabled, children }: RadioProps) {
  return (
    <RadioGroupHUI.Option
      value={value}
      as="label"
      className="group inline-flex items-center outline-none"
      disabled={disabled}
    >
      {({ active, checked, disabled }) => (
        <>
          <div
            aria-hidden="true"
            className={`rounded-lg ${active ? "ring ring-blue-100" : ""}`}
          >
            {/* radio circle (outer) */}
            <div
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
                            disabled && !checked
                              ? "border-neutral-300 bg-neutral-100"
                              : ""
                          }
                          ${disabled && checked ? "border-neutral-300" : ""}`}
            >
              {/* radio dot (inner) */}
              {checked && (
                <div
                  className={`h-2 w-2 rounded
                              ${
                                !disabled
                                  ? "bg-blue-500 group-active:bg-blue-600"
                                  : "bg-neutral-300"
                              } `}
                ></div>
              )}
            </div>
          </div>

          <span className={`ml-2 ${disabled ? "text-neutral-400" : ""}`}>
            {children}
          </span>
        </>
      )}
    </RadioGroupHUI.Option>
  );
}

interface RadioGroupProps {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  description?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: string;
  inline?: boolean;
  children: ReactNode[];
}

function RadioGroup({
  name,
  value,
  onChange,
  label,
  description,
  defaultValue,
  disabled,
  error,
  inline,
  children,
}: RadioGroupProps) {
  return (
    <RadioGroupHUI
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      disabled={disabled}
    >
      <RadioGroupHUI.Label>{label}</RadioGroupHUI.Label>

      <div
        className={`flex items-start
                    ${label ? "mt-2" : ""}
                    ${inline ? "space-x-4" : "flex-col space-y-1"}`}
      >
        {children}
      </div>

      {description && (
        <RadioGroupHUI.Description className="mt-1 text-sm">
          {description}
        </RadioGroupHUI.Description>
      )}

      {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </RadioGroupHUI>
  );
}

export { RadioGroup, Radio };
