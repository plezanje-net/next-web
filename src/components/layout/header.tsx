import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../utils/providers/auth-provider";
import Logo from "./logo";

type NavLink = {
  label: string;
  href: string;
  isActive: boolean;
};

function Header() {
  const authCtx = useAuth();
  const router = useRouter();

  console.log(router.pathname);

  const nav: NavLink[] = [
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

  return (
    <header className="flex h-20 items-center justify-between border-b border-b-neutral-200 px-4">
      <Link className="px-4 py-2" href="/">
        <Logo />
      </Link>
      <nav>
        {nav.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`inline-block px-4 py-3 ${
              link.isActive ? "text-blue-500" : ""
            }`}
          >
            Plezališča
          </Link>
        ))}
        <Link href="/sandbox/auth" className="inline-block px-4 py-3">
          {authCtx.status ? authCtx.status.email : "Prijava"}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
