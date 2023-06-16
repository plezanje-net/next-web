"use client";
import Link from "next/link";
import { useRef } from "react";
import {
  AriaBreadcrumbItemProps,
  AriaBreadcrumbsProps,
  useBreadcrumbItem,
  useBreadcrumbs,
} from "react-aria";

export type Breadcrumb = {
  label: string;
  link: string;
};
export interface BreadcrumbsProps extends AriaBreadcrumbsProps {
  items: Breadcrumb[];
}

export function Breadcrumbs(props: BreadcrumbsProps) {
  let { navProps } = useBreadcrumbs(props);

  return (
    <nav {...navProps}>
      <ol className="flex">
        {props.items.map((item, i) => (
          <BreadcrumbItem
            key={i}
            label={item.label}
            link={item.link}
            isCurrent={i === props.items.length - 1}
          ></BreadcrumbItem>
        ))}
      </ol>
    </nav>
  );
}

interface BreadcrumbItemProps
  extends Omit<AriaBreadcrumbItemProps, "children"> {
  label: string;
  link: string;
  isCurrent: boolean;
}

function BreadcrumbItem(props: BreadcrumbItemProps) {
  let ref = useRef(null);
  let { itemProps } = useBreadcrumbItem(
    props as unknown as AriaBreadcrumbItemProps,
    ref
  );
  return (
    <li>
      <Link
        {...itemProps}
        ref={ref}
        href={props.link}
        className={props.isCurrent ? "cursor-default" : "cursor-pointer"}
      >
        {props.label}
      </Link>
      {!props.isCurrent && (
        <span aria-hidden="true" className="px-1">
          /
        </span>
      )}
    </li>
  );
}
