import { Switch } from "@headlessui/react";

type TCheckboxProps = {
  disabled?: boolean;
  label: string;
  onChange?: (value: boolean) => void;
  checked?: boolean;
  hideLabel?: boolean | string;
};

function Checkbox({
  disabled = false,
  label,
  onChange,
  checked = false,
  hideLabel = false,
}: TCheckboxProps) {
  let hideLabelClass = "";
  if (hideLabel === true) {
    hideLabelClass = "sr-only";
  } else if (hideLabel !== false) {
    hideLabelClass = hideLabel;
  } else {
    hideLabelClass = "";
  }

  return (
    <div className="flex items-center">
      <Switch
        defaultChecked={!onChange ? checked : undefined}
        checked={onChange ? checked : undefined}
        onChange={onChange}
        className="group -my-0.5 -ml-1.5 flex items-start outline-none"
        disabled={disabled}
      >
        {({ checked }) => (
          <>
            <div
              className={`mx-1.5 my-1.5 h-4 w-4 rounded ring-blue-100 group-focus-visible:ring    
            ${
              checked
                ? `${
                    !disabled
                      ? "bg-blue-500 group-active:bg-blue-600"
                      : "bg-neutral-300"
                  }`
                : `border ${
                    !disabled
                      ? "border-neutral-400 bg-white group-active:border-neutral-600"
                      : "border-neutral-300 bg-neutral-100"
                  }`
            }
            `}
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M6.36668 12.1333L2.43335 8.19998L3.51668 7.11664L6.36668 9.96664L12.4834 3.84998L13.5667 4.93331L6.36668 12.1333Z"
                  fill="white"
                />
              </svg>
            </div>
            <span className={`mt-0.5 text-left ${hideLabelClass}`}>
              {label}
            </span>
          </>
        )}
      </Switch>
    </div>
  );
}

export default Checkbox;
