import {
  Description,
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import React, {
  Children,
  Fragment,
  ReactElement,
  useEffect,
  useRef,
} from "react";
import IconCheck from "./icons/check";
import IconExpand from "./icons/expand";

interface OptionProps {
  value: string; // the value for the option
  children: string | ReactElement; // the label for the option (can include an icon)
  disabled?: boolean;
}

function Option({ value, children, disabled }: OptionProps) {
  return (
    <ListboxOption
      key={value}
      value={value}
      disabled={disabled}
      className="flex cursor-pointer justify-between gap-4 py-2 pl-4 pr-2 ui-selected:text-blue-500 ui-active:bg-neutral-100 ui-active:text-blue-500 ui-disabled:cursor-default ui-disabled:text-neutral-400"
    >
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {children}
      </span>
      <div className="invisible text-neutral-900 ui-selected:visible">
        <IconCheck />
      </div>
    </ListboxOption>
  );
}

type SelectProps = {
  value: string | string[];
  onChange: ((value: string) => void) | ((value: string[]) => void);
  children: ReactElement<OptionProps>[]; // all of the select's options
  label?: string;
  placeholder?: string;
  description?: string;
  multi?: boolean;
  customTrigger?: ReactElement;
  disabled?: boolean;
  initialScrollToValue?: string;
};

function Select({
  value,
  onChange,
  children,
  label,
  placeholder,
  description,
  multi,
  customTrigger,
  disabled,
  initialScrollToValue,
}: SelectProps) {
  // save association between value and label. get it from children (options). we need to access labels via values later when constructing the field's currently selected label
  let childrenValuesToLabels: {
    [key: string]: {
      label: string | ReactElement;
    };
  } = {};

  let childrenValuesToIndexes: Record<string, number> = {};

  Children.map(children, (child, i) => {
    childrenValuesToLabels[child.props.value] = {
      label: child.props.children,
    };

    childrenValuesToIndexes[child.props.value] = i;
  });

  const constructSelectedLabel = (selected: string | string[]) => {
    // the selected value is either a single value or an array (if this is a mutliselect)
    if (multi) {
      return (selected as string[]).map((value: string, index) => {
        return (
          <Fragment key={value}>
            {childrenValuesToLabels[value].label}
            {index < selected.length - 1 && <>, </>}
          </Fragment>
        );
      });
    } else {
      return childrenValuesToLabels[selected as string].label;
    }
  };

  return (
    <Listbox
      as="div"
      value={value}
      onChange={onChange}
      multiple={multi}
      className="relative bg-white"
      disabled={disabled}
    >
      {({ open }) => (
        <InnerListBox
          label={label}
          customTrigger={customTrigger}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          description={description}
          constructSelectedLabel={constructSelectedLabel}
          open={open}
          childrenValuesToIndexes={childrenValuesToIndexes}
          initialScrollToValue={initialScrollToValue}
        >
          {children}
        </InnerListBox>
      )}
    </Listbox>
  );
}

type InnerListBoxProps = Omit<SelectProps, "onChange"> & {
  constructSelectedLabel: (
    selected: string | string[]
  ) => string | ReactElement | ReactElement[];
  open: boolean;
  childrenValuesToIndexes: Record<string, number>;
};

function InnerListBox({
  label,
  customTrigger,
  disabled,
  value,
  placeholder,
  description,
  constructSelectedLabel,
  open,
  childrenValuesToIndexes,
  initialScrollToValue,
  children,
}: InnerListBoxProps) {
  const listboxOptionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listboxOptionsRef.current && initialScrollToValue && !value) {
      const i = childrenValuesToIndexes[initialScrollToValue];
      listboxOptionsRef.current.scrollTop = (i - 3) * 40; // a child will always be 40px high (with current design :))
    }
  }, [open, childrenValuesToIndexes, initialScrollToValue, value]);

  return (
    <Field>
      {label && <Label>{label}</Label>}
      {customTrigger ? (
        <ListboxButton as={Fragment}>{customTrigger}</ListboxButton>
      ) : (
        <ListboxButton
          className={`relative flex w-full justify-between gap-2 rounded-lg border py-2 pl-4 pr-2 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-100 ${
            label ? "mt-2" : ""
          } ${
            disabled
              ? "border-neutral-300 bg-neutral-100 text-neutral-400"
              : "border-neutral-400"
          }`}
        >
          {!!value?.length ? (
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {constructSelectedLabel(value)}
            </span>
          ) : (
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-neutral-400">
              {placeholder}
            </span>
          )}

          <div>
            <IconExpand />
          </div>
        </ListboxButton>
      )}

      {description && (
        <Description className="text-sm mt-1">{description}</Description>
      )}

      <ListboxOptions
        anchor="bottom start"
        className={`${!customTrigger && "min-w-[var(--button-width)] "} [--anchor-gap:8px] [--anchor-padding:8px] overflow-hidden rounded-lg border border-neutral-400 bg-white focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-100`}
      >
        <div ref={listboxOptionsRef} className="max-h-80 overflow-auto">
          {children}
        </div>
      </ListboxOptions>
    </Field>
  );
}

export { Select, Option };
