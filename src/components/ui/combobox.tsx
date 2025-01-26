import useForwardedRef from "@/hooks/useForwardedRef";
import {
  Combobox as HUICombobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  ComboboxButton,
  Label,
} from "@headlessui/react";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import IconSearch from "./icons/search";

type TComboboxProps = {
  name?: string;
  value?: TComboboxValue | null;
  type?: string;
  onChange: (value: string | null) => void;
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  disabled?: boolean;
  populate: (text: string) => Promise<TComboboxValue[]>;
};

type TComboboxValue = {
  value: string;
  name: string;
};

const Combobox = forwardRef(function Combobox(
  { value, onChange, label, errorMessage, disabled, populate }: TComboboxProps,
  forwardedRef: ForwardedRef<HTMLInputElement>
) {
  const inputRef = useForwardedRef(forwardedRef);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const [selectedValue, setSelectedValue] = useState(value);
  const [query, setQuery] = useState("");

  const [options, setOptions] = useState<TComboboxValue[]>([]);

  useEffect(() => {
    populate(query).then((result) => {
      setOptions(result);
    });
  }, [query, populate]);

  function handleChange(newValue: TComboboxValue) {
    setSelectedValue(newValue);
    onChange(newValue?.value || null);
  }

  return (
    <Field disabled={disabled}>
      {label && <Label>{label}</Label>}
      <HUICombobox
        value={selectedValue}
        onChange={handleChange}
        onClose={() => setQuery("")}
      >
        <div
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
          <ComboboxInput
            ref={inputRef}
            onClick={focusInput}
            displayValue={(value: TComboboxValue) => value?.name}
            onChange={(event) => setQuery(event.target.value)}
            className="flex-1 outline-none min-w-0 rounded-lg w-full py-2 placeholder:text-neutral-400 pl-4"
            autoComplete="off"
          />
          <ComboboxButton>
            <div className="px-2">
              <IconSearch />
            </div>
          </ComboboxButton>
        </div>
        {options.length > 0 && (
          <ComboboxOptions
            modal={false}
            anchor="bottom start"
            className="[--anchor-gap:8px] min-w-[calc(var(--input-width)+40px)] overflow-hidden rounded-lg border border-neutral-400 bg-white focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-100"
          >
            {options.map((option: TComboboxValue) => (
              <ComboboxOption
                key={option.value}
                value={option}
                className="flex cursor-pointer justify-between gap-4 py-2 pl-4 pr-2 ui-selected:text-blue-500 ui-active:bg-neutral-100 ui-active:text-blue-500 ui-disabled:cursor-default ui-disabled:text-neutral-400"
              >
                {option.name}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </HUICombobox>
    </Field>
  );
});

export default Combobox;
