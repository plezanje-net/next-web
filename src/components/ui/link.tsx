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
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
}

const Link = forwardRef(function Link(
  props: LinkProps,
  forwardedRef: ForwardedRef<HTMLAnchorElement>
) {
  const linkRef = useForwardedRef(forwardedRef);
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
        isPressed
          ? variant === "primary"
            ? "text-blue-600"
            : "text-neutral-600"
          : ""
      }
      ${props.className ? props.className : ""}`}
    >
      {props.children}
    </NextLink>
  );
});

export default Link;
