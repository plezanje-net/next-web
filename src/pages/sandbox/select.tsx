import Button from "../../components/ui/button";
import IconAid from "../../components/ui/icons/aid";
import IconColumns from "../../components/ui/icons/columns";
import IconStarFull from "../../components/ui/icons/star-full";
import { Select, Option } from "../../components/ui/select";

function SelectPage() {
  return (
    <div className="m-8">
      <h3>Select demo</h3>

      <div className="mt-14 w-80">
        <h5>A default select</h5>
        <div className="mt-4">
          <Select label="Izberi možnost" placeholder="Izberi možnost">
            <Option id="1" value="pleskavica">
              Pleskavica
            </Option>
            <Option id="2" value="hrenovka">
              Hrenovka
            </Option>
            <Option id="3" value="pecenica">
              Pečenica
            </Option>
            <Option id="4" value="krvavica">
              Krvavica
            </Option>
            <Option id="5" value="klobasa">
              Klobasa
            </Option>
            <Option id="6" value="sunka">
              Šunka
            </Option>
          </Select>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>With initial value</h5>
        <div className="mt-4">
          <Select
            label="Izberi možnost"
            defaultValue="pleskavica"
            placeholder="Izberi možnost"
          >
            <Option id="1" value="pleskavica">
              Pleskavica
            </Option>
            <Option id="2" value="hrenovka">
              Hrenovka
            </Option>
            <Option id="3" value="pecenica">
              Pečenica
            </Option>
            <Option id="4" value="krvavica">
              Krvavica
            </Option>
            <Option id="5" value="klobasa">
              Klobasa
            </Option>
            <Option id="6" value="sunka">
              Šunka
            </Option>
          </Select>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Multiselect</h5>
        <div className="mt-4">
          <Select label="Izberi več možnosti" placeholder="Izberi..." multi>
            <Option id="1" value="pleskavica">
              Pleskavica
            </Option>
            <Option id="2" value="hrenovka">
              Hrenovka
            </Option>
            <Option id="3" value="pecenica">
              Pečenica
            </Option>
            <Option id="4" value="krvavica">
              Krvavica
            </Option>
            <Option id="5" value="klobasa">
              Klobasa
            </Option>
            <Option id="6" value="sunka">
              Šunka
            </Option>
          </Select>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>With icon, disabled, initial values</h5>
        <div className="mt-4">
          <Select
            label="Izberi več možnosti"
            defaultValue={["pleskavica", "klobasa"]}
            placeholder="Izberi..."
            multi
          >
            <Option id="1" value="pleskavica">
              Pleskavica
            </Option>
            <Option id="2" value="hrenovka" disabled>
              Hrenovka
            </Option>
            <Option id="3" value="pecenica" icon={<IconStarFull />}>
              Pečenica
            </Option>
            <Option id="4" value="krvavica">
              Krvavica
            </Option>
            <Option id="5" value="klobasa" icon={<IconAid />}>
              Klobasa
            </Option>
            <Option id="6" value="sunka">
              Šunka
            </Option>
          </Select>
        </div>
      </div>

      <div className="mt-14">
        <h5>A select with a custom trigger</h5>
        <div className="mt-4">
          <Select
            customTrigger={
              <Button renderStyle="icon">
                <IconColumns />
              </Button>
            }
          >
            <Option id="1" value="pleskavica">
              Pleskavica
            </Option>
            <Option id="2" value="hrenovka">
              Hrenovka
            </Option>
            <Option id="3" value="pecenica">
              Pečenica
            </Option>
            <Option id="4" value="krvavica">
              Krvavica
            </Option>
            <Option id="5" value="klobasa">
              Klobasa
            </Option>
            <Option id="6" value="sunka">
              Šunka
            </Option>
            <Option id="7" value="longname">
              A route with an unusually long name
            </Option>
          </Select>
        </div>
      </div>

      <div className="mt-14 w-96">
        <h5>A wide select</h5>
        <div className="mt-4">
          <Select label="Izberi možnost" placeholder="Izberi možnost">
            <Option id="1" value="pleskavica">
              Pleskavica
            </Option>
            <Option id="2" value="hrenovka">
              Hrenovka
            </Option>
            <Option id="3" value="pecenica">
              Pečenica
            </Option>
            <Option id="4" value="krvavica">
              Krvavica
            </Option>
            <Option id="5" value="klobasa">
              Klobasa
            </Option>
            <Option id="6" value="sunka">
              Šunka
            </Option>
          </Select>
        </div>
      </div>

      <div className="mt-14 w-40">
        <h5>A narrow select</h5>
        <div className="mt-4">
          <Select label="Izberi možnost" placeholder="Izberi možnost">
            <Option id="1" value="pleskavica">
              Pleskavica
            </Option>
            <Option id="2" value="hrenovka">
              Hrenovka
            </Option>
            <Option id="3" value="pecenica">
              Pečenica
            </Option>
            <Option id="4" value="krvavica">
              Krvavica
            </Option>
            <Option id="5" value="klobasa">
              Klobasa
            </Option>
            <Option id="6" value="sunka">
              Šunka
            </Option>
            <Option id="7" value="longname">
              A route with an unusually long name
            </Option>
          </Select>
        </div>
      </div>

      <div className="mt-14">
        <h5>Selects in a flex</h5>
        <div className="mt-4 flex gap-4">
          <div className="min-w-0 flex-1">
            <Select label="Izberi možnost" placeholder="Izberi možnost">
              <Option id="1" value="pleskavica">
                A route with an unusually long name
              </Option>
              <Option id="2" value="hrenovka">
                Hrenovka
              </Option>
              <Option id="3" value="pecenica">
                Pečenica do vrha
              </Option>
              <Option id="4" value="krvavica">
                Krvavica
              </Option>
              <Option id="5" value="klobasa">
                Klobasa
              </Option>
              <Option id="6" value="sunka">
                Šunka
              </Option>
            </Select>
          </div>
          <div className="min-w-0 flex-1">
            <Select label="Izberi možnost" placeholder="Izberi možnost">
              <Option id="1" value="pleskavica">
                Pleskavica
              </Option>
              <Option id="2" value="hrenovka">
                Hrenovka
              </Option>
              <Option id="3" value="pecenica">
                Pečenica do vrha
              </Option>
              <Option id="4" value="krvavica">
                Krvavica
              </Option>
              <Option id="5" value="klobasa">
                Klobasa
              </Option>
              <Option id="6" value="sunka">
                Šunka
              </Option>
            </Select>
          </div>
          <div className="min-w-0 flex-1">
            <Select label="Izberi možnost" placeholder="Izberi možnost">
              <Option id="1" value="pleskavica">
                Pleskavica
              </Option>
              <Option id="2" value="hrenovka">
                Hrenovka
              </Option>
              <Option id="3" value="pecenica">
                Pečenica
              </Option>
              <Option id="4" value="krvavica">
                Krvavica
              </Option>
              <Option id="5" value="klobasa">
                Klobasa
              </Option>
              <Option id="6" value="sunka">
                Šunka
              </Option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectPage;
