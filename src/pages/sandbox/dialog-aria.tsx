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
      <h3>Modal dialog demo (react aria)</h3>

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
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                  dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam,
                  nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                  iure reprehenderit qui in ea voluptate velit esse quam nihil
                  molestiae consequatur, vel illum qui dolorem eum fugiat quo
                  voluptas nulla pariatur?
                </p>
                <p>
                  t vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui officia deserunt
                  mollitia animi, id est laborum et dolorum fuga. Et harum
                  quidem rerum facilis est et expedita distinctio. Nam libero
                  tempore, cum soluta nobis est eligendi optio cumque nihil
                  impedit quo minus id quod maxime placeat facere possimus,
                  omnis voluptas assumenda est, omnis dolor repellendus.
                  Temporibus autem quibusdam et aut officiis debitis aut rerum
                  necessitatibus saepe eveniet ut et voluptates repudiandae sint
                  et molestiae non recusandae. Itaque earum rerum hic tenetur a
                  sapiente delectus, ut aut reiciendis voluptatibus maiores
                  alias consequatur aut perferendis doloribus asperiores
                  repellat.
                </p>
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
