import { ElementType, useRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";

interface Props extends AriaButtonProps<ElementType<any>> {
  variant?: "primary" | "secondary";
  loading?: boolean;
  className?: string;
}

function Button(props: Props) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);

  let variantClassNames =
    "text-white bg-blue-500 hover:bg-blue-600 focus:outline-blue-500 active:bg-blue-700 disabled:bg-blue-100 hover:focus:bg-blue-600 hover:focus:outline-blue-100 active:focus:bg-blue-600 active:focus:outline-blue-100";
  if (props.variant === "secondary") {
    variantClassNames =
      "bg-neutral-200 hover:bg-neutral-300 focus:outline-blue-100 active:bg-neutral-400 disabled:bg-neutral-100 disabled:text-neutral-400 hover:focus:outline-blue-100 hover:focus:bg-neutral-300 hover:focus:outline-blue-100 hover:focus:bg-neutral-400";
  }

  return (
    <button
      {...buttonProps}
      className={`rounded-lg py-1 px-7 ${variantClassNames} ${
        props.className || ""
      }`}
      ref={ref}
    >
      {props.loading ? "loading ..." : props.children}
    </button>
  );
}

export default Button;
