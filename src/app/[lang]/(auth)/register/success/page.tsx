import Breadcrumbs from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";
import Link from "@/components/ui/link";

type TRegisterSuccessPageProps = {
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

async function RegisterSuccessPage({
  searchParams,
}: TRegisterSuccessPageProps) {
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
          Registracija tvojega računa na portalu plezanje.net je uspešno
          zaključena. Zdaj se lahko{" "}
          <Link
            href={{
              pathname: "/prijava",
              query: returnTo ? { returnTo } : {},
            }}
          >
            prijaviš
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default RegisterSuccessPage;
