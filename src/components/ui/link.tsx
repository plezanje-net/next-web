"use client";
import {
  ForwardedRef,
  forwardRef,
  HTMLAttributeAnchorTarget,
  ReactNode,
} from "react";
import { UrlObject } from "url";
import NextLink from "next/link";
import { AriaLinkOptions, useLink } from "react-aria";
import useForwardedRef from "../../hooks/useForwardedRef";

interface LinkProps extends AriaLinkOptions {
  href: string | UrlObject;
  target?: HTMLAttributeAnchorTarget;
  variant?: "primary" | "secondary" | "tertiary";
  children: ReactNode;
  className?: string;
}

const Link = forwardRef(function Link(
  props: LinkProps,
  forwardedRef: ForwardedRef<HTMLAnchorElement>
) {
  const linkRef = useForwardedRef(forwardedRef);
  const { linkProps, isPressed } = useLink(props, linkRef);

  let classDefault;
  let classPressed;
  switch (props.variant) {
    case "secondary":
      classDefault = "text-neutral-900";
      classPressed = "text-neutral-600";
      break;
    case "tertiary":
      classDefault = "text-neutral-500";
      classPressed = "text-neutral-600";
      break;
    default: // primary
      classDefault = "text-blue-500";
      classPressed = "text-blue-600";
  }

  return (
    <NextLink
      {...linkProps}
      ref={linkRef}
      href={props.href}
      target={props.target}
      className={`outline-none focus:underline focus:decoration-double
      ${classDefault}
      ${isPressed ? classPressed : ""}
      ${
        props.isDisabled ? "cursor-default text-neutral-400" : "hover:underline"
      }
      ${props.className ? props.className : ""}`}
    >
      {props.children}
    </NextLink>
  );
});

export default Link;
