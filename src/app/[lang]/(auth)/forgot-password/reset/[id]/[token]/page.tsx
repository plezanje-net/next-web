import ContentHeader from "@/components/content-header";
import ResetPasswordForm from "./components/reset-password-form";
import Breadcrumbs from "@/components/breadcrumbs";

type TResetPasswordPageProps = {
  params: Promise<{
    id: string;
    token: string;
  }>;
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

async function ResetPasswordPage({
  params,
  searchParams,
}: TResetPasswordPageProps) {
  const { id, token } = await params;
  const { returnTo } = await searchParams;

  return (
    <div>
      <ContentHeader
        heading="Ponastavitev gesla"
        breadcrumbs={
          <Breadcrumbs
            crumbs={[
              { label: "Plezanje.net", link: "/" },
              { label: "Ponastavitev gesla", link: null },
            ]}
          />
        }
      />

      <div className="mx-auto max-w-xs">
        <p className="mt-7">Izberi si novo geslo za svoj račun.</p>
        <ResetPasswordForm id={id} token={token} returnTo={returnTo} />
      </div>
    </div>
  );
}

export default ResetPasswordPage;
