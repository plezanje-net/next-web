import Breadcrumbs from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";

type TRegisterSentPageProps = {
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

async function RegisterSentPage({ searchParams }: TRegisterSentPageProps) {
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
          Za dokončanje registracije preveri svojo e-pošto, kamor smo ti poslali
          povezavo za aktivacijo računa. Če ne najdeš sporočila, preveri tudi
          mapo z neželeno pošto.
        </p>
      </div>
    </div>
  );
}

export default RegisterSentPage;
