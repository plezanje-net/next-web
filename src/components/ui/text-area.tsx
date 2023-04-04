import { useRef, useState } from "react";
import { useTextField, useFocus, AriaTextFieldOptions } from "react-aria";

type Props = {
  label?: string;
  description?: string;
  errorMessage?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  rows?: number;
} & AriaTextFieldOptions<"textarea">;

function TextArea(props: Props) {
  const {
    isDisabled,
    isInvalid,
    label,
    description,
    errorMessage,
    rows = 6,
  } = props;
  const textareaRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(
      {
        ...props,
        inputElementType: "textarea",
      },
      textareaRef
    );

  const { focusProps } = useFocus({
    onFocusChange: (isFocused) => setIsFocused(isFocused),
  });

  return (
    <div>
      {label && (
        <label {...labelProps} className="block">
          {label}
        </label>
      )}
      <div
        className={`flex items-center rounded-lg border border-neutral-400 focus:ring focus:ring-blue-100
                    ${
                      isDisabled
                        ? "border-neutral-300 bg-neutral-100 text-neutral-400"
                        : ""
                    }
                    ${isFocused ? "ring ring-blue-100" : ""}
                    ${label ? "mt-2" : ""}
                    ${isInvalid || errorMessage ? "border-red-500" : ""}
                  `}
      >
        <textarea
          {...inputProps}
          {...focusProps}
          rows={rows}
          ref={textareaRef}
          className="flex-1 rounded-lg py-2 px-4 placeholder:text-neutral-400 focus:outline-none"
        />
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
}

export default TextArea;
