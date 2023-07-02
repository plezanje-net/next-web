"use client";
import { Radio, RadioGroup } from "../../../components/ui/radio-group";
import {
  RadioGroupHeadless,
  RadioHeadless,
} from "../../../components/ui/radio-group-headless";

function RadioGroupPage() {
  return (
    <div className="m-8">
      <h1 className="text-xl">Radio group demo</h1>

      {/* default example */}
      <div className="mt-10">
        <RadioGroup label="Choose your favourite" defaultValue="1">
          <Radio value="1">Krvavica</Radio>
          <Radio value="2">Pleskavica</Radio>
          <Radio value="3">Klobasa</Radio>
        </RadioGroup>
      </div>

      <div className="mt-10">
        <RadioGroupHeadless
          label="Choose your favourite HEADLESS"
          defaultValue="2"
        >
          <RadioHeadless value="1">Krvavica</RadioHeadless>
          <RadioHeadless value="2">Pleskavica</RadioHeadless>
          <RadioHeadless value="3">Klobasa</RadioHeadless>
        </RadioGroupHeadless>
      </div>

      {/* example with one option disabled */}
      <div className="mt-8">
        <RadioGroup label="Choose your favourite from what is left">
          <Radio value="1">Krvavica</Radio>
          <Radio value="2">Pleskavica</Radio>
          <Radio value="3" isDisabled>
            Klobasa
          </Radio>
        </RadioGroup>
      </div>

      <div className="mt-10">
        <RadioGroupHeadless label="Choose your favourite from what is left HEADLESS">
          <RadioHeadless value="1">Krvavica</RadioHeadless>
          <RadioHeadless value="2">Pleskavica</RadioHeadless>
          <RadioHeadless value="3" disabled>
            Klobasa
          </RadioHeadless>
        </RadioGroupHeadless>
      </div>

      {/* example with all options disabled */}
      <div className="mt-8">
        <RadioGroup label="I chose your favourite" defaultValue="3" isDisabled>
          <Radio value="1">Krvavica</Radio>
          <Radio value="2">Pleskavica</Radio>
          <Radio value="3">Klobasa</Radio>
        </RadioGroup>
      </div>

      <div className="mt-10">
        <RadioGroupHeadless
          label="I chose your favourite HEADLESS"
          defaultValue="3"
          disabled
        >
          <RadioHeadless value="1">Krvavica</RadioHeadless>
          <RadioHeadless value="2">Pleskavica</RadioHeadless>
          <RadioHeadless value="3">Klobasa</RadioHeadless>
        </RadioGroupHeadless>
      </div>

      {/* example with error message */}
      <div className="mt-8">
        <RadioGroup
          label="Choose your favourite"
          validationState="invalid"
          errorMessage="You must choose one."
        >
          <Radio value="1">Krvavica</Radio>
          <Radio value="2">Pleskavica</Radio>
          <Radio value="3">Klobasa</Radio>
        </RadioGroup>
      </div>

      <div className="mt-10">
        <RadioGroupHeadless
          label="Choose your favourite HEADLESS"
          error="You must choose one."
        >
          <RadioHeadless value="1">Krvavica</RadioHeadless>
          <RadioHeadless value="2">Pleskavica</RadioHeadless>
          <RadioHeadless value="3">Klobasa</RadioHeadless>
        </RadioGroupHeadless>
      </div>

      {/* example with error message and one option checked */}
      <div className="mt-8">
        <RadioGroup
          label="Choose your favourite"
          validationState="invalid"
          errorMessage="Wrong choice."
          defaultValue="1"
        >
          <Radio value="1">Krvavica</Radio>
          <Radio value="2">Pleskavica</Radio>
          <Radio value="3">Klobasa</Radio>
        </RadioGroup>
      </div>

      <div className="mt-10">
        <RadioGroupHeadless
          label="Choose your favourite HEADLESS"
          error="Wrong choice."
          defaultValue="1"
        >
          <RadioHeadless value="1">Krvavica</RadioHeadless>
          <RadioHeadless value="2">Pleskavica</RadioHeadless>
          <RadioHeadless value="3">Klobasa</RadioHeadless>
        </RadioGroupHeadless>
      </div>

      {/* example with description */}
      <div className="mt-8">
        <RadioGroup
          label="Choose your favourite"
          description="Choose the route you like the most."
        >
          <Radio value="1">Krvavica</Radio>
          <Radio value="2">Pleskavica</Radio>
          <Radio value="3">Klobasa</Radio>
        </RadioGroup>
      </div>

      <div className="mt-10">
        <RadioGroupHeadless
          label="Choose your favourite HEADLESS"
          description="Choose the route you like the most."
        >
          <RadioHeadless value="1">Krvavica</RadioHeadless>
          <RadioHeadless value="2">Pleskavica</RadioHeadless>
          <RadioHeadless value="3">Klobasa</RadioHeadless>
        </RadioGroupHeadless>
      </div>

      {/* example of inline variant */}
      <div className="mt-10">
        <RadioGroup label="Choose your favourite" inline>
          <Radio value="1">Krvavica</Radio>
          <Radio value="2">Pleskavica</Radio>
          <Radio value="3">Klobasa</Radio>
        </RadioGroup>
      </div>

      <div className="mt-10">
        <RadioGroupHeadless label="Choose your favourite HEADLESS" inline>
          <RadioHeadless value="1">Krvavica</RadioHeadless>
          <RadioHeadless value="2">Pleskavica</RadioHeadless>
          <RadioHeadless value="3">Klobasa</RadioHeadless>
        </RadioGroupHeadless>
      </div>

      <div className="mt-16">
        <h3 className="text-lg">Notes</h3>
        <div className="pl-4">
          <ul className="mt-2 list-outside list-disc">
            <li>
              Try tabbing between controls, then use up/down arrows to choose
            </li>
            <li className="text-red-500">What to do with min 48px hit area?</li>
            <li>
              Should invalid choice be red? Do not really see this use case...
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RadioGroupPage;
