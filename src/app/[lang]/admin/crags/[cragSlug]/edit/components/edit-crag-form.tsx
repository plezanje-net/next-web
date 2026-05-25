import {
  EditCragPageCountriesQuery,
  EditCragPageCragQuery,
} from "@/graphql/generated";
import CragForm from "../../../components/crag-form";

type TEditCragForm = {
  countriesWithAreas: EditCragPageCountriesQuery["countries"];
  crag: EditCragPageCragQuery["cragBySlug"];
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
