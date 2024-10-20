"use client";
import { IconSize } from "@/components/ui/icons/icon-size";
import Button from "@/components/ui/button";
import IconColumns from "@/components/ui/icons/columns";
import IconStarFull from "@/components/ui/icons/star-full";
import { Select, Option } from "@/components/ui/select";
import { gradingSystems } from "@/utils/grading-systems";

import { useState } from "react";
import IconRepeat from "@/components/ui/icons/repeat";

function SelectPage() {
  const grades = gradingSystems.french.grades;

  const [s1Value, setS1Value] = useState("");
  const [s2Value, setS2Value] = useState("pleskavica");
  const [s3Value, setS3Value] = useState<string[]>([]);
  const [s4Value, setS4Value] = useState<string[]>(["pleskavica", "klobasa"]);
  const [s5Value, setS5Value] = useState("");
  const [s6Value, setS6Value] = useState("");
  const [s7Value, setS7Value] = useState("");
  const [s8Value, setS8Value] = useState("");
  const [s9Value, setS9Value] = useState("");
  const [s10Value, setS10Value] = useState("");
  const [s11Value, setS11Value] = useState("");

  return (
    <div className="m-8">
      <h3>Select demo</h3>

      <div className="mt-14 w-80">
        <h5>A default select</h5>
        <div className="mt-4">
          <Select
            label="Izberi možnost"
            placeholder="Izberi možnost"
            value={s1Value}
            onChange={setS1Value}
          >
            <Option value="pleskavica">Pleskavica</Option>
            <Option value="hrenovka">Hrenovka</Option>
            <Option value="pecenica">Pečenica</Option>
            <Option value="krvavica">Krvavica</Option>
            <Option value="klobasa">Klobasa</Option>
            <Option value="sunka">Šunka</Option>
          </Select>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>With initial value</h5>
        <div className="mt-4">
          <Select
            label="Izberi možnost"
            placeholder="Izberi možnost"
            value={s2Value}
            onChange={setS2Value}
          >
            <Option value="pleskavica">Pleskavica</Option>
            <Option value="hrenovka">Hrenovka</Option>
            <Option value="pecenica">Pečenica</Option>
            <Option value="krvavica">Krvavica</Option>
            <Option value="klobasa">Klobasa</Option>
            <Option value="sunka">Šunka</Option>
          </Select>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Multiselect</h5>
        <div className="mt-4">
          <Select
            label="Izberi več možnosti"
            placeholder="Izberi..."
            multi
            value={s3Value}
            onChange={setS3Value}
          >
            <Option value="pleskavica">Pleskavica</Option>
            <Option value="hrenovka">Hrenovka</Option>
            <Option value="pecenica">Pečenica</Option>
            <Option value="krvavica">Krvavica</Option>
            <Option value="klobasa">Klobasa</Option>
            <Option value="sunka">Šunka</Option>
          </Select>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>With icon, disabled, initial values</h5>
        <div className="mt-4">
          <Select
            label="Izberi več možnosti"
            placeholder="Izberi..."
            multi
            value={s4Value}
            onChange={setS4Value}
          >
            <Option value="pleskavica">
              <span>
                <IconStarFull size={IconSize.small} inline />
                <span className="pl-1">Pleskavica</span>
              </span>
            </Option>
            <Option value="hrenovka" disabled>
              Hrenovka
            </Option>
            <Option value="pecenica">Pečenica</Option>
            <Option value="krvavica">Krvavica</Option>
            <Option value="klobasa">Klobasa</Option>
            <Option value="sunka">
              <span>
                <IconRepeat size={IconSize.small} inline />
                <span className="pl-1">Šunka</span>
              </span>
            </Option>
          </Select>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>A disabled select</h5>
        <div className="mt-4">
          <Select
            label="Izberi možnost"
            placeholder="Izberi možnost"
            value="pleskavica"
            onChange={() => {}}
            disabled
          >
            <Option value="pleskavica">Pleskavica</Option>
            <Option value="hrenovka">Hrenovka</Option>
            <Option value="pecenica">Pečenica</Option>
            <Option value="krvavica">Krvavica</Option>
            <Option value="klobasa">Klobasa</Option>
            <Option value="sunka">Šunka</Option>
          </Select>
        </div>
      </div>

      <div className="mt-14">
        <h5>A select with a custom trigger</h5>
        <div className="mt-4">
          <Select
            customTrigger={
              <Button variant="quaternary">
                <IconColumns />
              </Button>
            }
            value={s5Value}
            onChange={setS5Value}
          >
            <Option value="pleskavica">Pleskavica</Option>
            <Option value="hrenovka">Hrenovka</Option>
            <Option value="pecenica">Pečenica</Option>
            <Option value="krvavica">Krvavica</Option>
            <Option value="klobasa">Klobasa</Option>
            <Option value="sunka">Šunka</Option>
            <Option value="longname">
              A route with an unusually long name
            </Option>
          </Select>
        </div>
      </div>

      <div className="mt-14 w-96">
        <h5>A wide select</h5>
        <div className="mt-4">
          <Select
            label="Izberi možnost"
            placeholder="Izberi možnost"
            value={s6Value}
            onChange={setS6Value}
          >
            <Option value="pleskavica">Pleskavica</Option>
            <Option value="hrenovka">Hrenovka</Option>
            <Option value="pecenica">Pečenica</Option>
            <Option value="krvavica">Krvavica</Option>
            <Option value="klobasa">Klobasa</Option>
            <Option value="sunka">Šunka</Option>
          </Select>
        </div>
      </div>

      <div className="mt-14 w-40">
        <h5>A narrow select</h5>
        <div className="mt-4 text-right">
          <Select
            label="Izberi možnost"
            placeholder="Izberi možnost"
            value={s7Value}
            onChange={setS7Value}
          >
            <Option value="pleskavica">Pleskavica</Option>
            <Option value="hrenovka">Hrenovka</Option>
            <Option value="pecenica">Pečenica</Option>
            <Option value="krvavica">Krvavica</Option>
            <Option value="klobasa">Klobasa</Option>
            <Option value="sunka">Šunka</Option>
            <Option value="longname">
              A route with an unusually long name
            </Option>
          </Select>
        </div>
      </div>

      <div className="mt-14">
        <h5>Selects in a flex</h5>
        <div className="mt-4 flex gap-4">
          <div className="min-w-0 flex-1">
            <Select
              label="Izberi možnost"
              placeholder="Izberi možnost"
              value={s8Value}
              onChange={setS8Value}
            >
              <Option value="pleskavica">
                A route with an unusually long name
              </Option>
              <Option value="hrenovka">Hrenovka</Option>
              <Option value="pecenica">Pečenica do vrha</Option>
              <Option value="krvavica">Krvavica</Option>
              <Option value="klobasa">Klobasa</Option>
              <Option value="sunka">Šunka</Option>
            </Select>
          </div>
          <div className="min-w-0 flex-1">
            <Select
              label="Izberi možnost"
              placeholder="Izberi možnost"
              value={s9Value}
              onChange={setS9Value}
            >
              <Option value="pleskavica">Pleskavica</Option>
              <Option value="hrenovka">Hrenovka</Option>
              <Option value="pecenica">Pečenica do vrha</Option>
              <Option value="krvavica">Krvavica</Option>
              <Option value="klobasa">Klobasa</Option>
              <Option value="sunka">Šunka</Option>
            </Select>
          </div>
          <div className="min-w-0 flex-1">
            <Select
              label="Izberi možnost"
              placeholder="Izberi možnost"
              value={s10Value}
              onChange={setS10Value}
            >
              <Option value="pleskavica">Pleskavica</Option>
              <Option value="hrenovka">Hrenovka</Option>
              <Option value="pecenica">Pečenica</Option>
              <Option value="krvavica">Krvavica</Option>
              <Option value="klobasa">Klobasa</Option>
              <Option value="sunka">Šunka</Option>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>A select for grades</h5>
        <Select value={s11Value} onChange={setS11Value}>
          {grades.map((grade) => (
            <Option key={grade.id} value={grade.name}>
              {grade.name}
            </Option>
          ))}
        </Select>
        <select>          {grades.map((grade) => (
          <option key={grade.id} value={grade.name}>
            {grade.name}
          </option>
        ))}</select>
      </div>
    </div>
  );
}

export default SelectPage;
