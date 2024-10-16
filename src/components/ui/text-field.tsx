import { ForwardedRef, ReactNode, forwardRef, useState } from "react";
import { useTextField, useFocus, AriaTextFieldOptions } from "react-aria";
import useForwardedRef from "../../hooks/useForwardedRef";

type TextFieldProps = {
  label?: string;
  description?: string;
  errorMessage?: string;
  isDisabled?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onBlur?: () => void;
} & AriaTextFieldOptions<"input">;

const TextField = forwardRef(function TextField(
  props: TextFieldProps,
  forwardedRef: ForwardedRef<HTMLInputElement>
) {
  const {
    isDisabled,
    label,
    description,
    errorMessage,
    prefix,
    suffix,
    onBlur,
  } = props;

  const inputRef = useForwardedRef(forwardedRef);
  const [isFocused, setIsFocused] = useState(false);

  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, inputRef);

  const { focusProps } = useFocus({
    onFocusChange: (isFocused) => setIsFocused(isFocused),
    onBlur: onBlur,
  });

  return (
    <div>
      {label && (
        <label {...labelProps} className="block">
          {label}
        </label>
      )}
      <div
        className={`flex items-center rounded-lg border focus:ring focus:ring-blue-100
                    ${
                      isDisabled
                        ? "border-neutral-300 bg-neutral-100 text-neutral-400"
                        : "border-neutral-400"
                    }
                    ${
                      isFocused
                        ? "ring" +
                          (errorMessage ? " ring-red-100" : " ring-blue-100")
                        : ""
                    }
                    ${label ? "mt-2" : ""}
                    ${errorMessage ? "border-red-500 focus:ring-red-100" : ""}
                  `}
      >
        {prefix && <div className="mx-2">{prefix}</div>}

        <input
          {...inputProps}
          {...focusProps}
          ref={inputRef}
          className={`min-w-0 flex-1 rounded-lg py-2 placeholder:text-neutral-400 focus:outline-none
                      ${!prefix ? "pl-4" : ""}
                      ${!suffix ? "pr-4" : ""}
                    `}
        />

        {suffix && <div className="mx-1">{suffix}</div>}
      </div>

      {description && !errorMessage && (
        <div {...descriptionProps} className="mt-1 text-sm">
          {description}
        </div>
      )}

      {errorMessage && (
        <div {...errorMessageProps} className="mt-1 text-sm text-red-500">
          {props.errorMessage}
        </div>
      )}
    </div>
  );
});

export default TextField;
