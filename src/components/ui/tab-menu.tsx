import Link from "next/link";

export interface TabMenuItem {
  label: string;
  link: string;
  isActive: boolean;
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
                        ? "-mt-px rounded-t-lg border-t border-l border-r border-neutral-200 bg-white"
                        : "px-px"
                    }
                    `}
        >
          <Link
            href={item.link}
            className={`block px-4 py-2 ${item.isActive && " text-blue-500"}`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default TabMenu;
