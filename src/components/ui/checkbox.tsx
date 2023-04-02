import { useRef } from "react";
import {
  AriaCheckboxProps,
  mergeProps,
  useCheckbox,
  useFocusRing,
  VisuallyHidden,
} from "react-aria";
import { useToggleState } from "@react-stately/toggle";

function Checkbox(props: AriaCheckboxProps) {
  const { isDisabled, children } = props;
  const inputRef = useRef(null);
  const state = useToggleState(props);
  const { inputProps } = useCheckbox(props, state, inputRef);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <label
      className={`group -my-0.5 -ml-1.5 flex items-center ${
        !isDisabled && "cursor-pointer"
      }`}
    >
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={inputRef} />
      </VisuallyHidden>

      <div
        aria-hidden="true"
        className={`my-1.5 mx-1.5 flex-initial rounded ${
          isFocusVisible && "ring ring-blue-100"
        }`}
      >
        {!state.isSelected && (
          <div
            className={` h-4 w-4 rounded border border-neutral-400 
                        ${!isDisabled && "group-active:border-neutral-500"}
                        ${isDisabled && "border-neutral-300 bg-neutral-100"}`}
          ></div>
        )}

        {state.isSelected && (
          <div
            className={`h-4 w-4 rounded bg-blue-500
                        ${!isDisabled && "group-active:bg-blue-600"} 
                        ${isDisabled && "bg-neutral-300"}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path
                d="M6.36668 12.1333L2.43335 8.19998L3.51668 7.11664L6.36668 9.96664L12.4834 3.84998L13.5667 4.93331L6.36668 12.1333Z"
                fill="white"
              />
            </svg>
          </div>
        )}
      </div>

      <span>{children}</span>
    </label>
  );
}

export default Checkbox;
