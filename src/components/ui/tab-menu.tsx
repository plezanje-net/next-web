import Link from "next/link";
import { ReactNode } from "react";

export interface TabMenuItem {
  label: string;
  link: string;
  isActive: boolean;
  icon?: ReactNode;
}

interface TabMenuProps {
  items: TabMenuItem[];
}

function TabMenu({ items }: TabMenuProps) {
  return (
    <ul className="flex justify-center border-b border-b-neutral-200">
      {items.map((item, index) => (
        <li
          key={index}
          className={`-mb-px block pb-px
                    ${
                      item.isActive
                        ? "-mt-px rounded-t-lg border-l border-r border-t border-neutral-200 bg-white"
                        : "px-px"
                    }
                    `}
        >
          <Link
            href={item.link}
            className={`flex gap-2 px-4 py-2 hover:fill-blue-500 hover:text-blue-500 ${
              item.isActive && " fill-blue-500 text-blue-500"
            }`}
          >
            {item.icon}
            <span
              className={`${item.icon && !item.isActive && "hidden md:inline"}`}
            >
              {item.label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default TabMenu;
