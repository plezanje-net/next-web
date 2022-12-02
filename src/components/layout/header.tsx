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

  const [menuOpened, setMenuOpened] = useState(true);

  console.log(authCtx);

  const search = <IconSearch />;
  // if (authCtx) {
  //   loginLink = "Prijava";
  // }
  // const loginOrUserName = authCtx.status ? "Slavko Majonezič" : "Prijava";

  const loggedIn = !!authCtx.status;

  // TODO: get users full name from authCtx ?
  const userLink = "Slavko Majonezič";
  const userLinkShort = "Slavko Majonezič"
    .split(" ")
    .reduce((prev, curr) => prev + curr[0], "");

  const handleMenuClick = () => {
    setMenuOpened(!menuOpened);
  };

  return (
    <header className="flex flex-col justify-between border-b border-b-neutral-200 px-4 xs:px-8 lg:flex-row lg:items-center">
      {/* Logo row */}
      <div className="box-content flex h-20 items-center justify-between ">
        {/* Logo */}
        <div className="bg-[pink] py-1">
          <div className="bg-[coral]">
            <Logo />
          </div>
        </div>
        <div className="flex">
          <div className="hidden bg-[lightgreen] py-2 xs:block lg:hidden">
            {search}
          </div>
          {loggedIn && (
            <div className="bg-[magenta] py-2 lg:hidden">{userLinkShort}</div>
          )}
          <div className="bg-[violet] py-2 lg:hidden" onClick={handleMenuClick}>
            {menuOpened ? <IconClose /> : <IconMenu />}
          </div>
        </div>
      </div>

      <div
        className={`bg-[salmon] pb-4 lg:flex lg:pb-0 ${
          menuOpened ? "block" : "hidden"
        }`}
      >
        <div className="bg-[#6ab26a] py-2 xs:hidden lg:block">{search}</div>

        {!loggedIn && <div className="bg-[beige] py-2 lg:hidden">Prijava</div>}

        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block bg-[orange] py-2
                        ${link.isActive && "text-blue-500"}`}
          >
            <div className="bg-[purple]">{link.label}</div>
          </Link>
        ))}

        <div className="hidden bg-[beige] py-2 lg:block">
          {loggedIn ? userLink : "Prijava"}
        </div>
      </div>
    </header>

    // <header className="box-content flex flex-col border-b border-b-neutral-200 px-2 sm:px-4">
    //   <div className="flex h-20 items-center justify-between">
    //     <Link className="px-2 py-2 sm:px-4" href="/">
    //       <Logo />
    //     </Link>

    //     <div className="flex">
    //       <span className="hidden px-4 py-2 sm:block">
    //         <IconSearch />
    //       </span>
    //       {authCtx.status && (
    //         <span className="px-2 py-2 font-medium sm:px-4 lg:hidden">SM</span>
    //       )}
    //       <span className="px-2 py-2 sm:px-4 lg:hidden">
    //         {menuOpened ? <IconClose /> : <IconMenu />}
    //       </span>
    //     </div>
    //   </div>

    //   <nav className={`flex flex-col`}>
    //     {navLinks.map((link) => (
    //       <Link
    //         key={link.href}
    //         href={link.href}
    //         className={`inline-block px-2 py-2 font-medium sm:px-4
    //                     ${link.isActive && "text-blue-500"}`}
    //       >
    //         {link.label}
    //       </Link>
    //     ))}
    //     <Link
    //       href="/sandbox/auth"
    //       className="inline-block px-2 py-2 font-medium sm:px-4"
    //     >
    //       {authCtx.status ? "Slavko Majonezič" : "Prijava"}
    //     </Link>
    //   </nav>
    // </header>
  );
}

export default Header;
