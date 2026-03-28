"use client";

import NextLink from "next/link";
import { ComponentProps } from "react";

type TLinkProps = ComponentProps<typeof NextLink> & {
  variant?: "primary" | "secondary" | "tertiary";
};

function Link({ variant = "primary", className, ...rest }: TLinkProps) {
  let linkClassName = className ? className + " " : "";
  linkClassName +=
    "outline-none focus-visible:underline focus-visible:decoration-double cursor-pointer hover:underline";

  // default, hover, active classes for different variants of a link
  switch (variant) {
    case "primary":
      linkClassName +=
        " text-blue-500 hover:text-blue-600 active:text-blue-700";
      break;
    case "secondary":
      linkClassName +=
        " text-neutral-900 hover:text-neutral-800 active:text-neutral-600";
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
