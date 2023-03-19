import IconStarFull from "../../components/ui/icons/star-full";
import { Select, Option } from "../../components/ui/select";

function SelectHeadPage() {
  return (
    <div className="m-8">
      <h3>Select demo</h3>

      <div className="mt-14 w-80">
        <Select>
          <Option id="1" value="pleskavica">
            Pleskavica
          </Option>
          <Option id="2" value="hrenovka" disabled>
            Hrenovka
          </Option>
          <Option id="3" value="pecenica">
            Pečenica
          </Option>
          <Option id="4" value="krvavica" icon={<IconStarFull />}>
            Krvavica
          </Option>
          <Option id="5" value="klobasa">
            Klobasa
          </Option>
        </Select>
      </div>
    </div>
  );
}

export default SelectHeadPage;
