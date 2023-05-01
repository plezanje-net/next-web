import ButtonGood from "../../components/ui/button-good";

function ButtonGoodPage() {
  return (
    <div className="m-8">
      <h3>Button good demo</h3>

      <div className="mt-14 w-80">
        <h5>Default (primary) button</h5>
        <div className="mt-4">
          <ButtonGood variant="primary">Button</ButtonGood>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Secondary button</h5>
        <div className="mt-4">
          <ButtonGood variant="secondary">Button</ButtonGood>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>A disabled primary button</h5>
        <div className="mt-4">
          <ButtonGood variant="primary" isDisabled>
            Button
          </ButtonGood>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>A disabled secondary button</h5>
        <div className="mt-4">
          <ButtonGood variant="secondary" isDisabled>
            Button
          </ButtonGood>
        </div>
      </div>

      {/* <div className="mt-14 w-80">
        <h5>A loading button (TODO)</h5>
        <Button variant="secondary" className="mt-4" loading>
          Button
        </Button>
      </div> */}

      <div className="mt-16">
        <h3 className="text-lg">Notes</h3>
        <div className="pl-4">
          <ul className="mt-2 list-outside list-disc">
            <li>A button with icon should be implemented.</li>
            <li>A loading state should be designed and implemented.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ButtonGoodPage;
