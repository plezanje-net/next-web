import Button from "../../components/ui/button";
import ModalTrigger from "../../components/ui/modal-trigger";
import Dialog from "../../components/ui/dialog";
import { useState } from "react";
import IconFilter from "../../components/ui/icons/filter";

function DialogAriaPage() {
  let [clicked, setClicked] = useState("Nothing yet");

  const dialogButtonClickHandler = (close: () => void, clicked: string) => {
    // do something
    setClicked(clicked);

    // then close the dialog
    close();
  };

  return (
    <div className="m-8">
      <h3>Modal dialog demo (React Aria)</h3>

      <div className="mt-14 w-80">
        <h5>Default (small) modal dialog</h5>
        <div className="mt-4"></div>

        <ModalTrigger triggerLabel="Open Dialog" triggerRenderStyle="button">
          {(close) => (
            <Dialog title="Dialog Title">
              <div className="mt-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                maximus bibendum nisi vel lacinia. Curabitur sagittis elit nisi,
                sit amet lacinia nibh sollicitudin a.
              </div>
              <div className="mt-10 flex flex-wrap justify-end gap-4">
                <Button
                  variant="secondary"
                  onPress={() => dialogButtonClickHandler(close, "Cancel")}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => dialogButtonClickHandler(close, "Apply")}
                >
                  Apply
                </Button>
              </div>
            </Dialog>
          )}
        </ModalTrigger>
        <div className="mt-4">{clicked} was clicked.</div>
      </div>

      <div className="mt-14 w-80">
        <h5>Medium modal dialog with an icon trigger</h5>
        <div className="mt-4"></div>
        <ModalTrigger
          triggerLabel={<IconFilter />}
          triggerRenderStyle="icon"
          dialogSize="medium"
        >
          {(close) => (
            <Dialog title="Dialog Title">
              <div className="mt-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                maximus bibendum nisi vel lacinia. Curabitur sagittis elit nisi,
                sit amet lacinia nibh sollicitudin a.
              </div>
              <div className="mt-10 flex flex-wrap justify-end gap-4">
                <Button variant="secondary" onPress={close}>
                  Cancel
                </Button>
                <Button onPress={close}>Apply</Button>
              </div>
            </Dialog>
          )}
        </ModalTrigger>
      </div>

      <div className="mt-14 w-80">
        <h5>Large modal dialog with a link trigger</h5>
        <div className="mt-4"></div>
        <ModalTrigger
          triggerRenderStyle="link"
          triggerLabel="Open Dialog"
          dialogSize="large"
        >
          {(close) => (
            <Dialog title="Dialog Title">
              <div className="mt-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                maximus bibendum nisi vel lacinia. Curabitur sagittis elit nisi,
                sit amet lacinia nibh sollicitudin a.
              </div>
              <div className="mt-10 flex flex-wrap justify-end gap-4">
                <Button variant="secondary" onPress={close}>
                  Cancel
                </Button>
                <Button onPress={close}>Apply</Button>
              </div>
            </Dialog>
          )}
        </ModalTrigger>
      </div>

      <div className="mt-14 w-80">
        <h5>Modal dialog with a secondary button trigger</h5>
        <div className="mt-4"></div>
        <ModalTrigger triggerVariant="secondary" triggerLabel="Open Dialog">
          {(close) => (
            <Dialog title="Dialog Title">
              <div className="mt-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                maximus bibendum nisi vel lacinia. Curabitur sagittis elit nisi,
                sit amet lacinia nibh sollicitudin a.
              </div>
              <div className="mt-10 flex flex-wrap justify-end gap-4">
                <Button variant="secondary" onPress={close}>
                  Cancel
                </Button>
                <Button onPress={close}>Apply</Button>
              </div>
            </Dialog>
          )}
        </ModalTrigger>
      </div>

      <div className="mt-14 w-80">
        <h5>Modal dialog with a secondary link trigger</h5>
        <div className="mt-4"></div>
        <ModalTrigger
          triggerRenderStyle="link"
          triggerVariant="secondary"
          triggerLabel="Open Dialog"
        >
          {(close) => (
            <Dialog title="Dialog Title">
              <div className="mt-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                maximus bibendum nisi vel lacinia. Curabitur sagittis elit nisi,
                sit amet lacinia nibh sollicitudin a.
              </div>
              <div className="mt-10 flex flex-wrap justify-end gap-4">
                <Button variant="secondary" onPress={close}>
                  Cancel
                </Button>
                <Button onPress={close}>Apply</Button>
              </div>
            </Dialog>
          )}
        </ModalTrigger>
      </div>

      <div className="mt-16">
        <h3 className="text-lg">Notes</h3>
        <div className="pl-4">
          <ul className="mt-2 list-outside list-disc">
            <li>
              A dialog trigger can be a classic button, an icon button, or a
              link button.
            </li>
            <li>Other types of triggers will be added if needed.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DialogAriaPage;
