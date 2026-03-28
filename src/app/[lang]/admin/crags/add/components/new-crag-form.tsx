import { NewCragPageCountriesQuery } from "@/graphql/generated";
import CragForm from "../../components/crag-form";

type TNewCragFormProps = {
  countriesWithAreas: NewCragPageCountriesQuery["countries"];
};

function NewCragForm({ countriesWithAreas }: TNewCragFormProps) {
  return <CragForm formType="new" countriesWithAreas={countriesWithAreas} />;
}

export default NewCragForm;
