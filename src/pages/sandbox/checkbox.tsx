import Checkbox from "../../components/ui/checkbox";

function CheckboxPage() {
  return (
    <div className="m-8">
      <h1 className="text-xl">Checkbox demo</h1>

      <div className="mt-10">
        <Checkbox>Check me, I am unchecked</Checkbox>
      </div>

      <div>
        <Checkbox defaultSelected>Uncheck me, I am checked</Checkbox>
      </div>

      <div>
        <Checkbox isDisabled>Cannot check me</Checkbox>
      </div>

      <div>
        <Checkbox isDisabled defaultSelected>
          Cannot uncheck me
        </Checkbox>
      </div>

      <div>
        <Checkbox aria-label="A checkbox with no visible label"></Checkbox>
      </div>

      <div>
        <Checkbox aria-labelledby="labelDiv"></Checkbox>
      </div>

      <div id="labelDiv">I am a detached label for the last checkbox</div>

      <div className="mt-16">
        <h3 className="text-lg">Notes</h3>
        <div className="pl-4">
          <ul className="mt-2 list-outside list-disc">
            <li>
              Click area should have a minimum size of 48x48px. Because of this,
              checkboxes have horizontal padding of 16px. This is evened out
              with negative horizontal margins. Height is set to a fixed 48px
              and should be taken into account when positioning the checkboxes.
            </li>
            <li>
              The last checkbox has no label but is labeled by another div. One
              before last has no label at all, but has aria-label set.
            </li>
            <li>
              Indeterminate and error states are not defined (designed). They
              will be added if/when needed.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default CheckboxPage;
