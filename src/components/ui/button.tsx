import {
  ForwardedRef,
  MouseEventHandler,
  ReactElement,
  forwardRef,
} from "react";
import Spinner from "./spinner";

type TButtonProps = {
  children: ReactElement<any> | string;
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "asLinkPrimary"
    | "asLinkSecondary"
    | "asLinkTertiary";
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button";
  className?: string;
};

const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    disabled = false,
    loading = false,
    onClick,
    type = "button",
    className,
    ...rest
  }: TButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  let buttonStyles = "outline-none";
  buttonStyles += className ? " " + className : "";

  switch (variant) {
    case "primary":
    case "secondary":
    case "tertiary":
    case "quaternary":
      buttonStyles += " flex focus-visible:ring focus-visible:ring-blue-100";
      break;

    case "asLinkPrimary":
    case "asLinkSecondary":
    case "asLinkTertiary":
      buttonStyles +=
        " focus-visible:underline focus-visible:decoration-double";
      break;
  }

  switch (variant) {
    case "primary":
      buttonStyles += " rounded-lg py-2 px-7 font-medium text-white";
      buttonStyles += disabled
        ? " bg-blue-100 cursor-default"
        : " bg-blue-500 hover:bg-blue-600 active:bg-blue-700";
      break;

    case "secondary":
      buttonStyles += " rounded-lg py-2 px-7 font-medium";
      buttonStyles += disabled
        ? " bg-neutral-100 text-neutral-400 cursor-default"
        : " bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400";
      break;

    case "tertiary":
      buttonStyles += " rounded p-1";
      buttonStyles += disabled
        ? " text-blue-100 cursor-default"
        : " text-blue-500 hover:text-blue-600 active:text-blue-700";
      break;

    case "quaternary":
      buttonStyles += " rounded p-1";
      buttonStyles += disabled
        ? " text-neutral-400 cursor-default"
        : " hover:text-blue-500 active:text-blue-600";
      break;

    case "asLinkPrimary":
      buttonStyles += disabled
        ? " text-neutral-400 cursor-default"
        : " text-blue-500 hover:text-blue-600 hover:underline active:text-blue-700";
      break;

    case "asLinkSecondary":
      buttonStyles += disabled
        ? " text-neutral-400 cursor-default"
        : " text-neutral-900 hover:text-neutral-800 hover:underline active:text-neutral-600";
      break;

    case "asLinkTertiary":
      buttonStyles += disabled
        ? " text-neutral-400 cursor-default"
        : " text-neutral-500 hover:text-neutral-600 hover:underline active:text-neutral-700";
      break;
  }

  return (
    <button
      ref={ref}
      className={buttonStyles}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {loading ? (
        <div className="relative">
          <div className="text-transparent">{children}</div>
          <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4">
            <Spinner />
          </div>
        </div>
      ) : (
        children
      )}
    </button>
  );
});

export default Button;
