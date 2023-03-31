import { RadioGroupState, useRadioGroupState } from "@react-stately/radio";
import React, { createContext, ReactNode, useContext, useRef } from "react";
import {
  AriaRadioGroupProps,
  AriaRadioProps,
  useFocusRing,
  useRadio,
  useRadioGroup,
  VisuallyHidden,
} from "react-aria";

const RadioContext = createContext<RadioGroupState | null>(null);

interface RadioGroupProps extends AriaRadioGroupProps {
  children: ReactNode[];
  inline?: boolean;
}

function RadioGroup(props: RadioGroupProps) {
  const {
    children,
    label,
    description,
    errorMessage,
    inline,
    validationState,
  } = props;
  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps, descriptionProps, errorMessageProps } =
    useRadioGroup(props, state);

  return (
    <div {...radioGroupProps}>
      <div {...labelProps} className="inline-block">
        {label}
      </div>
      <div
        className={`mt-2 flex items-start ${
          inline ? "space-x-4" : "flex-col space-y-1"
        }`}
      >
        <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
      </div>
      {description && !errorMessage && (
        <div {...descriptionProps} className="mt-1 text-sm">
          {description}
        </div>
      )}
      {errorMessage && validationState === "invalid" && (
        <div {...errorMessageProps} className="mt-1 text-sm text-red-500">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

interface RadioProps extends AriaRadioProps {
  children: ReactNode;
}

function Radio(props: RadioProps) {
  const { children } = props;
  const state = useContext(RadioContext);
  const inputRef = useRef(null);
  const { inputProps, isSelected, isDisabled } = useRadio(
    props,
    state as RadioGroupState,
    inputRef
  );
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <label
      className={`group inline-flex items-center 
                ${!isDisabled && "cursor-pointer"}`}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={inputRef} />
      </VisuallyHidden>
      <div
        aria-hidden="true"
        className={`rounded-lg ${isFocusVisible && "ring ring-blue-100"}`}
      >
        <div
          className={`flex h-4 w-4 items-center justify-center rounded-lg border
                    ${
                      isSelected
                        ? !isDisabled
                          ? "border-blue-500 group-active:border-blue-600"
                          : "border-neutral-300"
                        : !isDisabled
                        ? "border-neutral-400 group-active:border-neutral-500"
                        : "border-neutral-300 bg-neutral-100"
                    }`}
        >
          {isSelected && (
            <div
              className={`h-2 w-2 rounded 
                          ${
                            !isDisabled
                              ? "bg-blue-500  group-active:bg-blue-600"
                              : "bg-neutral-300"
                          } `}
            ></div>
          )}
        </div>
      </div>
      <span className={`ml-2 ${isDisabled && "text-neutral-400"}`}>
        {children}
      </span>
    </label>
  );
}

export { Radio, RadioGroup };
