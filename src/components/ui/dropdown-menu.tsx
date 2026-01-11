import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

type TDropdownMenuProps = {
  openTrigger: ReactNode;
  children: ReactNode[] | ReactNode;
};

function DropdownMenu({ openTrigger, children }: TDropdownMenuProps) {
  return (
    <Menu>
      <MenuButton as="div" className="inline-block">
        {openTrigger}
      </MenuButton>

      <MenuItems
        modal={false}
        anchor="bottom start"
        className="bg-white shadow-lg rounded-lg border border-neutral-100 flex flex-col [--anchor-gap:8px] py-2 outline-none [--anchor-padding:8px] xs:[--anchor-padding:16px] whitespace-nowrap"
      >
        {children}
      </MenuItems>
    </Menu>
  );
}

type TDropdownMenuItemBaseProps = {
  disabled?: boolean;
  children: string;
};

type TDropdownMenuItemButtonProps = TDropdownMenuItemBaseProps & {
  onClick?: () => void;
  href?: never;
};

type TDropdownMenuItemLinkProps = TDropdownMenuItemBaseProps & {
  href?: LinkProps["href"];
  onClick?: never;
};

type TDropdownMenuItemProps =
  | TDropdownMenuItemButtonProps
  | TDropdownMenuItemLinkProps;

function DropdownMenuItem({
  disabled,
  onClick,
  href,
  children,
}: TDropdownMenuItemProps) {
  const classNames =
    "w-auto px-4 py-2 text-left outline-none active:text-neutral-600 data-[active]:bg-neutral-100 focus-visible:border-l-4 focus-visible:pl-3 focus-visible:border-blue-100 data-[disabled]:text-neutral-400 data-[disabled]:bg-white data-[disabled]:cursor-default";

  return (
    <MenuItem disabled={disabled}>
      {href ? (
        <Link href={href} className={classNames}>
          {children}
        </Link>
      ) : (
        <button onClick={onClick} className={classNames}>
          {children}
        </button>
      )}
    </MenuItem>
  );
}

export default DropdownMenu;
export { DropdownMenuItem };
