import ContentHeader from "@/components/content-header";
import Breadcrumbs from "@/components/breadcrumbs";
import activateAccountAction from "./lib/activate-account-action";
import Link from "@/components/ui/link";

type TActivateAccountPageProps = {
  params: Promise<{
    id: string;
    token: string;
  }>;
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

async function ActivateAccountPage({
  params,
  searchParams,
}: TActivateAccountPageProps) {
  const { id, token } = await params;
  const { returnTo } = await searchParams;

  const activateAccountResponse = await activateAccountAction({
    id,
    token,
  });

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
          {activateAccountResponse.success ? (
            <>
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
            </>
          ) : (
            <>Tvojega računa ni bilo mogoče aktivirati.</>
          )}
        </p>
      </div>
    </div>
  );
}

export default ActivateAccountPage;
