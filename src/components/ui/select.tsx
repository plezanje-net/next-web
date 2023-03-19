import { Listbox } from "@headlessui/react";
import { cloneElement, ReactElement } from "react";
import IconCheck from "./icons/check";
import IconExpand from "./icons/expand";

interface OptionProps {
  children: string;
  id: string;
  value: string;
  disabled?: boolean;
  icon?: ReactElement;
}

function Option(props: OptionProps) {
  return (
    <Listbox.Option
      key={props.id}
      value={props.value}
      disabled={props.disabled}
      className="flex cursor-pointer justify-between py-2 pl-4 pr-2 ui-selected:text-blue-500 ui-active:bg-neutral-100 ui-active:text-blue-500 ui-disabled:cursor-default ui-disabled:text-neutral-400"
    >
      <span className="flex items-center justify-start gap-1">
        {props.icon && cloneElement(props.icon, { size: "small" })}
        {props.children}
      </span>
      <IconCheck className="hidden text-neutral-900 ui-selected:block" />
    </Listbox.Option>
  );
}

interface SelectProps {
  children: ReactElement<OptionProps>[];
}

function Select(props: SelectProps) {
  const { children } = props;

  let options: {
    [key: string]: {
      label: string;
      value: string;
      icon?: ReactElement;
    };
  } = {};
  children.map((option) => {
    options[option.props.value] = {
      value: option.props.value,
      label: option.props.children,
      ...(option.props.icon && {
        icon: cloneElement(option.props.icon, { size: "small" }),
      }),
    };
  });

  return (
    <Listbox defaultValue="" as="div" className="w-80">
      <Listbox.Button className="flex w-80 justify-between rounded-lg border border-neutral-400 py-2 pl-4 pr-2 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-100">
        {({ value }) => (
          <>
            {value ? (
              <span className="flex items-center justify-start gap-1">
                {options[value].icon}
                <span>{options[value].label}</span>
              </span>
            ) : (
              <span className="text-neutral-400">Izberi možnost</span>
            )}
            <IconExpand />
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
