"use client";
import IconColumns from "@/components/ui/icons/columns";
import Button from "@/components/ui/button";

function ButtonPage() {
  return (
    <div className="m-8">
      <h3>Button demo</h3>

      <div className="mt-14 w-80">
        <h5>Primary button</h5>
        <div className="mt-4">
          <Button variant="primary">Button</Button>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Primary button disabled</h5>
        <div className="mt-4">
          <Button variant="primary" disabled>
            Button
          </Button>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Primary button loading</h5>
        <div className="mt-4">
          <Button variant="primary" disabled loading>
            Button
          </Button>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Secondary button</h5>
        <div className="mt-4">
          <Button variant="secondary">Button</Button>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Secondary button disabled</h5>
        <div className="mt-4">
          <Button variant="secondary" disabled>
            Button
          </Button>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Secondary button loading</h5>
        <div className="mt-4">
          <Button variant="secondary" disabled loading>
            Button
          </Button>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Tertiary button (text only)</h5>
        <div className="mt-4">
          <Button variant="tertiary">Button</Button>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Tertiary button (icon only)</h5>
        <div className="mt-4">
          <Button variant="tertiary">
            <IconColumns />
          </Button>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Tertiary button (icon and text)</h5>
        <div className="mt-4">
          <Button variant="tertiary">
            <span className="flex">
              <IconColumns />
              <span>
                <span className="ml-2">Button</span>
              </span>
            </span>
          </Button>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Tertiary button disabled</h5>
        <div className="mt-4">
          <Button variant="tertiary" disabled>
            <span className="flex">
              <IconColumns />
              <span>
                <span className="ml-2">Button</span>
              </span>
            </span>
          </Button>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Quaternary button (text only)</h5>
        <div className="mt-4">
          <Button variant="quaternary">Button</Button>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Quaternary button (icon only)</h5>
        <div className="mt-4">
          <Button variant="quaternary">
            <IconColumns />
          </Button>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Quaternary button (icon and text)</h5>
        <div className="mt-4">
          <Button variant="quaternary">
            <span className="flex">
              <IconColumns />
              <span>
                <span className="ml-2">Button</span>
              </span>
            </span>
          </Button>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Quaternary button disabled</h5>
        <div className="mt-4">
          <Button variant="quaternary" disabled>
            <span className="flex">
              <IconColumns />
              <span>
                <span className="ml-2">Button</span>
              </span>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ButtonPage;
