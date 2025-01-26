import useForwardedRef from "@/hooks/useForwardedRef";
import { Description, Field, Input, Label } from "@headlessui/react";
import {
  ForwardedRef,
  ReactElement,
  forwardRef,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import Button from "./button";

type TTextFieldProps = {
  name?: string;
  value: string;
  type?: "text" | "number" | "password" | "natural";
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  disabled?: boolean;
  prefix?: ReactElement;
  suffix?: ReactElement;
  onBlur?: () => void;
  autoFocus?: boolean;
};

const TextField = forwardRef(function TextField(
  {
    name,
    value,
    type = "text",
    onChange,
    label,
    placeholder,
    description,
    errorMessage,
    disabled,
    prefix,
    suffix,
    onBlur,
    autoFocus,
  }: TTextFieldProps,
  forwardedRef: ForwardedRef<HTMLInputElement>
) {
  const inputType = type == "natural" ? "number" : type;

  const inputRef = useForwardedRef(forwardedRef);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const buttonPrefix = prefix?.type === Button;
  const buttonSuffix = suffix?.type === Button;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (type == "natural") {
      if (e.key == "." || e.key == "," || e.key == "-" || e.key == "e") {
        e.preventDefault();
      }
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Field disabled={disabled}>
      {label && <Label className="mb-2 block">{label}</Label>}

      <div
        onClick={focusInput}
        className={`focus-within:ring flex items-center rounded-lg border
          ${!disabled && !errorMessage ? "border-neutral-400" : ""}
          ${
            errorMessage
              ? "border-red-500 focus-within:ring-red-100"
              : "focus-within:ring-blue-100"
          }
          ${
            disabled ? "border-neutral-300 bg-neutral-100 text-neutral-400" : ""
          }`}
      >
        {prefix && (
          <div className={`${buttonPrefix ? "pl-1 relative z-10" : "pl-2"}`}>
            {prefix}
          </div>
        )}

        <Input
          ref={inputRef}
          onBlur={onBlur}
          type={inputType}
          name={name}
          value={value}
          placeholder={placeholder}
          className={`flex-1 outline-none min-w-0 rounded-lg w-full py-2 placeholder:text-neutral-400
            ${prefix ? (buttonPrefix ? "pl-1" : "pl-2") : "pl-4"}
            ${suffix ? (buttonSuffix ? "pr-1" : "pr-2") : "pr-4"}
            `}
          min={type == "natural" ? "0" : undefined}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
        />

        {suffix && (
          <div className={`${buttonSuffix ? "pr-1" : "pr-2"}`}>{suffix}</div>
        )}
      </div>

      {description && !errorMessage && (
        <Description className="text-sm mt-1">{description}</Description>
      )}
      {errorMessage && (
        <div className="text-sm mt-1 text-red-500">{errorMessage}</div>
      )}
    </Field>
  );
});

export default TextField;
export type { TTextFieldProps };

/* 
TODO:
prefix and suffix could also be immlemented as an absolute positioned icon and increased padding, but then the width od them should be fixed. leaving this here in case focus, blur, icon click will give trouble and will have to refactor
  <div className="relative">
        <div className="absolute left-2 top-2 pointer-events-none"> */
