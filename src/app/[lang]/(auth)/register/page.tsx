import Breadcrumbs from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";
import Link from "@/components/ui/link";
import RegisterForm from "./components/register-form";

type TRegisterPageProps = {
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

async function RegisterPage({ searchParams }: TRegisterPageProps) {
  const { returnTo } = await searchParams;

  return (
    <div>
      <ContentHeader
        heading="Registracija"
        breadcrumbs={
          <Breadcrumbs
            crumbs={[
              { label: "Plezanje.net", link: "/" },
              { label: "Registracija", link: null },
            ]}
          />
        }
      />

      <div className="mx-auto max-w-xs">
        <p className="mt-7">
          Ustvari svoj račun na portalu Plezanje.net in pridobi dostop do
          lastnega plezalnega dnevnika, oddajanja komentarjev in fotografij, ter
          drugih funkcionalnosti in vsebin, ki so na voljo samo prijavljenim
          uporabnikom.
        </p>

        <RegisterForm returnTo={returnTo} />
        <div className="mt-8 py-8 border-t border-neutral-200 text-center">
          <div>Že imaš uporabniški račun?</div>
          <Link
            href={{
              pathname: "/prijava",
              query: returnTo ? { returnTo } : {},
            }}
          >
            Prijavi se
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
