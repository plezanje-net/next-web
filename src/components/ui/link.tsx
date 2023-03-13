import { HTMLAttributeAnchorTarget, ReactNode, useRef } from "react";
import { UrlObject } from "url";
import NextLink from "next/link";
import { AriaLinkOptions, useLink } from "react-aria";

interface LinkProps extends AriaLinkOptions {
  href: string | UrlObject;
  target?: HTMLAttributeAnchorTarget;
  variant?: "primary" | "secondary";
  children: ReactNode;
}

function Link(props: LinkProps) {
  let linkRef = useRef(null);
  const { linkProps, isPressed } = useLink(props, linkRef);

  const variant = props.variant || "primary";

  return (
    <NextLink
      {...linkProps}
      ref={linkRef}
      href={props.href}
      target={props.target}
      className={`focus:underline focus:decoration-double
      ${
        variant === "primary" ? "text-blue-500" : "text-neutral-900"
      } outline-none
      ${
        props.isDisabled ? "cursor-default text-neutral-400" : "hover:underline"
      }
      ${
        isPressed &&
        (variant === "primary" ? "text-blue-600" : "text-neutral-600")
      }`}
    >
      {props.children}
    </NextLink>
  );
}

export default Link;
