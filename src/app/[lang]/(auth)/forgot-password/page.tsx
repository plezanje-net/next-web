import Breadcrumbs from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";
import ForgotPasswordForm from "./components/forgot-password-form";

type TForgotPasswordPageProps = {
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

async function ForgotPasswordPage({ searchParams }: TForgotPasswordPageProps) {
  const { returnTo } = await searchParams;

  return (
    <div>
      <ContentHeader
        heading="Pozabljeno geslo"
        breadcrumbs={
          <Breadcrumbs
            crumbs={[
              { label: "Plezanje.net", link: "/" },
              { label: "Pozabljeno geslo", link: null },
            ]}
          />
        }
      />

      <div className="mx-auto max-w-xs">
        <p className="mt-7">
          Vnesi svoj e-naslov s katerim si registriran na portalu plezanje.net
          in nanj ti bomo poslali navodila za ponastavitev gesla.
        </p>
        <ForgotPasswordForm returnTo={returnTo} />
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
