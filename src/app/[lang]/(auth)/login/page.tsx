import Breadcrumbs from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";
import LoginForm from "./components/login-form";
import Link from "@/components/ui/link";

type TLoginPageProps = {
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

async function LoginPage({ searchParams }: TLoginPageProps) {
  const { returnTo } = await searchParams;

  return (
    <div>
      <ContentHeader
        heading="Prijava"
        breadcrumbs={
          <Breadcrumbs
            crumbs={[
              { label: "Plezanje.net", link: "/" },
              { label: "Prijava", link: null },
            ]}
          />
        }
      />

      <div className="mx-auto max-w-xs">
        <p className="mt-7">
          Za ogled plezalnega dvevnika, dodajanje komentarjev in fotografij, ter
          dostop do še več funkcionalnosti portala Plezanje.net se prijavi.
        </p>
        <LoginForm returnTo={returnTo} />
        <div className="mt-8 py-8 border-t border-neutral-200 text-center">
          <div>Še nimaš uporabniškega računa?</div>
          <Link
            href={{
              pathname: "/registracija",
              query: returnTo ? { returnTo } : {},
            }}
          >
            Ustvari račun
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
