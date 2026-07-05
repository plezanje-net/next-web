"use client";

import NextLink from "next/link";
import { ComponentProps } from "react";

type TLinkProps = ComponentProps<typeof NextLink> & {
  variant?: "primary" | "secondary" | "tertiary";
  status?: "default" | "draft" | "in_review";
};

function Link({
  variant = "primary",
  status = "default",
  className,
  ...rest
}: TLinkProps) {
  let linkClassName = className ? className + " " : "";
  linkClassName +=
    "outline-none focus-visible:underline focus-visible:decoration-double cursor-pointer hover:underline";

  // default, hover, active classes for different variants of a link
  switch (variant) {
    case "primary":
      switch (status) {
        case "in_review":
          linkClassName +=
            " text-amber-500 hover:text-amber-600 active:text-amber-700";
          break;
        case "draft":
          linkClassName +=
            " text-red-500 hover:text-red-600 active:text-red-700";
          break;
        case "default":
        default:
          linkClassName +=
            " text-blue-500 hover:text-blue-600 active:text-blue-700";
          break;
      }
      break;

    case "secondary":
      switch (status) {
        case "in_review":
          linkClassName +=
            " text-amber-500 hover:text-amber-600 active:text-amber-700";
          break;
        case "draft":
          linkClassName +=
            " text-red-500 hover:text-red-600 active:text-red-700";
          break;
        case "default":
        default:
          linkClassName +=
            " text-neutral-900 hover:text-neutral-800 active:text-neutral-600";
          break;
      }
      break;

    case "tertiary":
      linkClassName +=
        " text-neutral-500 hover:text-neutral-600 active:text-neutral-700";
      break;
  }

  return <NextLink className={linkClassName} {...rest} />;
}

Link.displayName = "Link";

export default Link;
