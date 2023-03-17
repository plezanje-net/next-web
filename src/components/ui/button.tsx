import React, { ForwardedRef, forwardRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";
import useForwardedRef from "../../hooks/useForwardedRef";

interface Props extends AriaButtonProps {
  variant?: "primary" | "secondary";
  renderStyle?: "button" | "icon" | "link"; // TODO: link type can be removed if we decide to use radix instead of react-aria
  className?: string;
}

// TODO: design button with icon

const Button = forwardRef(function Button(
  props: Props,
  forwarededRef: ForwardedRef<HTMLButtonElement>
) {
  const buttonRef = useForwardedRef(forwarededRef);
  const { buttonProps, isPressed } = useButton(props, buttonRef);

  const variant = props.variant || "primary";
  const renderStyle = props.renderStyle || "button";
  const disabled = props.isDisabled || false;

  let buttonStyles = "";
  switch (renderStyle) {
    case "button":
      buttonStyles =
        "rounded-lg py-2 px-7 outline-none focus:ring focus:ring-blue-100 font-medium";
      switch (variant) {
        case "primary":
          buttonStyles += ` text-white 
          ${
            disabled
              ? "bg-blue-100"
              : isPressed
              ? "bg-blue-700"
              : "bg-blue-500 hover:bg-blue-600"
          }`;
          break;
        case "secondary":
          buttonStyles += `
          ${
            disabled
              ? "bg-neutral-100 text-neutral-400"
              : isPressed
              ? "bg-neutral-400"
              : "bg-neutral-200 hover:bg-neutral-300"
          }`;
          break;
      }
      break;

    case "icon":
      buttonStyles =
        "hover:text-blue-500 fill-current outline-none focus:ring focus:ring-blue-100 rounded";
      break;

    case "link":
      buttonStyles = "focus:underline focus:decoration-double outline-none";
      switch (variant) {
        case "primary":
          buttonStyles += ` text-blue-500 ${isPressed && "text-blue-600"}`;
          break;
        case "secondary":
          buttonStyles += ` text-neutral-900 ${
            isPressed && "text-neutral-600"
          }`;
          break;
      }
      buttonStyles += ` ${
        disabled ? "cursor-default text-neutral-400" : "hover:underline"
      }`;
      break;
  }

  return (
    <button
      {...buttonProps}
      className={`${buttonStyles} ${props.className || ""}`}
      ref={buttonRef}
    >
      {props.children}
    </button>
  );
});

export default Button;
