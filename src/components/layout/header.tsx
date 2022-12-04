import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../../utils/providers/auth-provider";
import IconClose from "../ui/icons/close";
import IconMenu from "../ui/icons/menu";
import IconSearch from "../ui/icons/search";
import Logo from "./logo";

type NavLink = {
  label: string;
  href: string;
  isActive: boolean;
};

function Header() {
  const authCtx = useAuth();
  const router = useRouter();

  const navLinks: NavLink[] = [
    {
      label: "Plezališča",
      href: "/plezalisca/slovenija",
      isActive: router.pathname.startsWith("/crags"),
    },
    {
      label: "Alpinizem",
      href: "/alpinizem",
      isActive: router.pathname.startsWith("/alpinizem"),
    },
    {
      label: "Plezalni dnevnik",
      href: "/plezalni-dnevnik",
      isActive: router.pathname.startsWith("/plezalni-dnevnik"),
    },
  ];

  const [menuOpened, setMenuOpened] = useState(false);

  const handleMenuClick = () => {
    setMenuOpened(!menuOpened);
  };

  const loggedIn = !!authCtx.status;

  // TODO: get user's full name from authCtx. adjust BE ?
  const userFullName = authCtx.status?.user?.fullName; //TODO: replace testing dummy
  const userFullNameShort = [
    authCtx.status?.user?.firstname ?? "",
    authCtx.status?.user?.lastname ?? "",
  ]
    .reduce((prev, curr) => prev + curr[0], "")
    .toUpperCase();

  return (
    <header className="flex flex-col justify-between border-b border-b-neutral-200 px-4 xs:px-8 lg:flex-row lg:items-center">
      {/* Logo row */}
      <div className="box-content flex h-20 items-center justify-between">
        {/* Logo */}
        <Link className="-ml-2 py-1 px-2" href="/">
          <Logo />
        </Link>

        {/* Right part of logo row */}
        <div className="flex">
          <div className="hidden cursor-pointer  p-2 xs:block lg:hidden">
            <IconSearch />
          </div>

          {loggedIn && (
            <Link
              className="p-2 font-medium hover:text-blue-500 active:text-blue-600 xs:ml-4 lg:hidden"
              href="/sandbox/auth"
            >
              {userFullNameShort}
            </Link>
          )}

          <div
            className="-mr-2 cursor-pointer p-2 xs:ml-4 lg:hidden"
            onClick={handleMenuClick}
          >
            {menuOpened ? <IconClose /> : <IconMenu />}
          </div>
        </div>
      </div>

      {/* dropdown menu when <lg */}
      <div
        className={`pb-4 lg:flex lg:pb-0 ${menuOpened ? "block" : "hidden"}`}
      >
        <div className="-mx-2 cursor-pointer p-2 xs:hidden lg:mx-0 lg:block">
          <IconSearch />
        </div>

        {!loggedIn && (
          <Link
            className="-mx-2 block p-2 font-medium hover:text-blue-500 active:text-blue-600 lg:hidden"
            href="/sandbox/auth"
          >
            Prijava
          </Link>
        )}

        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`-mx-2 block p-2 font-medium hover:text-blue-500 active:text-blue-600 lg:mx-0 lg:ml-4
                        ${link.isActive && "text-blue-500"}`}
          >
            {link.label}
          </Link>
        ))}

        <Link
          className="-mr-2 hidden p-2 py-2 font-medium hover:text-blue-500 active:text-blue-600 lg:ml-4 lg:block"
          href="/sandbox/auth"
        >
          {loggedIn ? userFullName : "Prijava"}
        </Link>
      </div>
    </header>
  );
}

export default Header;
