import Breadcrumbs from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";

function ForgotPasswordSentPage() {
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
          Na vneseni e-naslov smo ti poslali navodila za ponastavitev gesla. Če
          ne najdeš sporočila, preveri tudi mapo z neželeno pošto.
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordSentPage;
