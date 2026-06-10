import Breadcrumbs from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";
import Link from "@/components/ui/link";

type TForgotPasswordSuccessPageProps = {
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

async function ForgotPasswordSuccessPage({
  searchParams,
}: TForgotPasswordSuccessPageProps) {
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
        <p className="mt-7">
          Tvoje geslo je bilo uspešno ponastavljeno. Zdaj se lahko{" "}
          <Link
            href={{
              pathname: "/prijava",
              query: returnTo ? { returnTo } : {},
            }}
          >
            prijaviš
          </Link>{" "}
          z novim geslom.
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordSuccessPage;
