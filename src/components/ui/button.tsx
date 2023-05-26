import {
  ForwardedRef,
  MouseEventHandler,
  ReactElement,
  forwardRef,
} from "react";

interface ButtonProps {
  children: ReactElement | string;
  variant?: "primary" | "secondary";
  renderStyle?: "button" | "icon";
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { variant, renderStyle, isDisabled, children, ...otherProps } = props;

  let buttonStyles = "flex";
  switch (renderStyle) {
    case "icon":
      buttonStyles +=
        " hover:text-blue-500 fill-current outline-none focus-visible:ring focus-visible:ring-blue-100 rounded";
      break;

    case "button":
    default:
      buttonStyles +=
        " rounded-lg py-2 px-7 outline-none focus-visible:ring focus-visible:ring-blue-100 font-medium";
      switch (variant) {
        case "secondary":
          buttonStyles += `
          ${
            isDisabled
              ? "bg-neutral-100 text-neutral-400 cursor-default"
              : "bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400"
          }`;
          break;

        case "primary":
        default:
          buttonStyles += ` text-white 
          ${
            isDisabled
              ? "bg-blue-100 cursor-default"
              : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
          }`;
          break;
      }
      break;
  }

  return (
    <button ref={ref} {...otherProps} className={buttonStyles}>
      {children}
    </button>
  );
});
export default Button;
