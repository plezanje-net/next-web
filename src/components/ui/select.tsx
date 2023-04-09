import { Listbox } from "@headlessui/react";
import { Children, cloneElement, ReactElement } from "react";
import IconCheck from "./icons/check";
import IconExpand from "./icons/expand";

interface OptionProps {
  children: string;
  id: string;
  value: string;
  disabled?: boolean;
  icon?: ReactElement;
}

function Option({ children, id, value, disabled, icon }: OptionProps) {
  return (
    <Listbox.Option
      key={id}
      value={value}
      disabled={disabled}
      className="flex cursor-pointer justify-between py-2 pl-4 pr-2 ui-selected:text-blue-500 ui-active:bg-neutral-100 ui-active:text-blue-500 ui-disabled:cursor-default ui-disabled:text-neutral-400"
    >
      <span>
        {icon &&
          cloneElement(icon, { size: "small", className: "mb-1 inline mr-1" })}
        {children}
      </span>
      <IconCheck className="hidden text-neutral-900 ui-selected:block" />
    </Listbox.Option>
  );
}

interface SelectProps {
  children: ReactElement<OptionProps>[];
  defaultValue?: string | string[];
  label: string;
  placeholder?: string;
  multi?: boolean;
}

function Select({
  children,
  defaultValue,
  label,
  placeholder,
  multi,
}: SelectProps) {
  // map options (children) to a temporary 'associative array' to be able to access labels an icons later
  let options: {
    [key: string]: {
      label: string;
      value: string;
      icon?: ReactElement;
    };
  } = {};
  Children.map(children, (option) => {
    options[option.props.value] = {
      value: option.props.value,
      label: option.props.children,
      ...(option.props.icon && {
        icon: cloneElement(option.props.icon, {
          size: "small",
          className: "mb-1 inline mr-1",
        }),
      }),
    };
  });

  const getOptionLabel = (selected: string | string[]) => {
    // the selected value is eiter a single value or an array (if this is a mutliselect)
    if (multi) {
      return (selected as string[]).map((value: string, index) => (
        <span key={value}>
          {options[value].icon}
          {options[value].label}
          {index < selected.length - 1 && <>, </>}
        </span>
      ));
    } else {
      return (
        <>
          {options[selected as string].icon}
          {options[selected as string].label}
        </>
      );
    }
  };

  return (
    <Listbox
      defaultValue={defaultValue}
      as="div"
      className="w-80"
      multiple={multi}
    >
      <Listbox.Label>{label}</Listbox.Label>
      <Listbox.Button className="mt-1 flex w-80 justify-between gap-2 rounded-lg border border-neutral-400 py-2 pl-4 pr-2 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-100">
        {({ value }) => (
          <>
            {!!value?.length ? (
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {getOptionLabel(value)}
              </span>
            ) : (
              <span className="text-neutral-400">{placeholder}</span>
            )}

            <IconExpand className="shrink-0" />
          </>
        )}
      </Listbox.Button>

      <Listbox.Options className="absolute mt-2 w-80 overflow-hidden rounded-lg border border-neutral-400 bg-white focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-100">
        {children}
      </Listbox.Options>
    </Listbox>
  );
}

export { Select, Option };
