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
  href?: string | UrlObject;
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
  const { linkProps, isPressed } = useLink(
    { ...props, elementType: props.href ? "a" : "span" },
    linkRef
  );

  // default classes for a link
  let className = "outline-none focus:underline focus:decoration-double";

  // classes that might be passed in by the parent
  className += props.className ? " " + props.className : "";

  // classes for disabled/not disabled variation
  className += props.isDisabled
    ? " cursor-default text-neutral-400"
    : " cursor-pointer hover:underline";

  // default, hover, active classes for different variants of a link
  switch (props.variant) {
    case "secondary":
      className += " text-neutral-900";
      className += isPressed ? " text-neutral-600" : "";
      break;
    case "tertiary":
      className += " text-neutral-500";
      className += isPressed ? " text-neutral-600" : "";
      break;
    default: // primary
      className += " text-blue-500";
      className += isPressed ? " text-blue-600" : "";
  }

  // use NextLink for 'real' links, and use span for 'appearance' links, where clicks are handled by the client
  if (props.href) {
    return (
      <NextLink
        {...linkProps}
        ref={linkRef}
        href={props.href}
        target={props.target}
        className={className}
        prefetch={false}
      >
        {props.children}
      </NextLink>
    );
  } else {
    return (
      <span {...linkProps} ref={linkRef} className={className}>
        {props.children}
      </span>
    );
  }
});

export default Link;
