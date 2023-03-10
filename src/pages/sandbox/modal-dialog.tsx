import Button from "../../components/ui/button";
import ModalTrigger from "../../components/ui/modal-trigger";
import Dialog from "../../components/ui/dialog";

function ModalDialogPage() {
  return (
    <div className="m-8">
      <h3>Modal dialog demo</h3>

      <div className="mt-14 w-80">
        <h5>Default (small) modal dialog</h5>
        <div className="mt-4"></div>
        <ModalTrigger label="Open Dialog">
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
        <h5>Medium modal dialog</h5>
        <div className="mt-4"></div>
        <ModalTrigger label="Open Dialog" size="medium">
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
        <h5>Large modal dialog</h5>
        <div className="mt-4"></div>
        <ModalTrigger label="Open Dialog" size="large">
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
    </div>
  );
}

export default ModalDialogPage;
