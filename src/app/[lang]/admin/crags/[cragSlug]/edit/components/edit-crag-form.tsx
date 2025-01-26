import { Country, Crag } from "@/graphql/generated";
import CragForm from "../../../components/crag-form";

type TEditCragForm = {
  countriesWithAreas: Country[];
  crag: Crag;
};

function EditCragForm({ countriesWithAreas, crag }: TEditCragForm) {
  return (
    <CragForm
      formType="edit"
      countriesWithAreas={countriesWithAreas}
      crag={crag}
    />
  );
}

export default EditCragForm;
