import { useState } from "react";
import Button from "../../components/ui/button";
import Dialog, { DialogSize } from "../../components/ui/dialog";
import IconFilter from "../../components/ui/icons/filter";
import Link from "../../components/ui/link";

function DialogPage() {
  let [dialogResponse, setDialogResponse] = useState("Nothing yet");

  const handleConfirm = () => {
    console.log("dialog confirmed");
    setDialogResponse("Confirmed");
  };

  const handleCancel = () => {
    console.log("dialog canceled");
    setDialogResponse("Canceled");
  };

  return (
    <div className="m-8">
      <h3>Dialog demo (headless)</h3>

      <div className="mt-14 w-80">
        <h5>Default dialog</h5>
        <div className="mt-4">
          <Dialog
            title="Test Dialog"
            openTrigger={<Button>Open Dialog</Button>}
            confirm={{ label: "Confirm" }}
            cancel={{ label: "Cancel" }}
          >
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              maximus bibendum nisi vel lacinia. Curabitur sagittis elit nisi,
              sit amet lacinia nibh sollicitudin a.
            </div>
          </Dialog>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Medium dialog with an icon trigger</h5>
        <div className="mt-4">
          <Dialog
            title="Test Dialog"
            openTrigger={
              <Button renderStyle="icon">
                <IconFilter />
              </Button>
            }
            confirm={{ label: "Confirm" }}
            cancel={{ label: "Cancel" }}
            dialogSize={DialogSize.medium}
          >
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              maximus bibendum nisi vel lacinia. Curabitur sagittis elit nisi,
              sit amet lacinia nibh sollicitudin a.
            </div>
          </Dialog>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Large dialog with a link trigger</h5>
        <div className="mt-4">
          <Dialog
            title="Test Dialog"
            openTrigger={<Link href="">Open Dialog</Link>}
            confirm={{ label: "Confirm" }}
            cancel={{ label: "Cancel" }}
            dialogSize={DialogSize.large}
          >
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              maximus bibendum nisi vel lacinia. Curabitur sagittis elit nisi,
              sit amet lacinia nibh sollicitudin a.
            </div>
          </Dialog>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>A lot of content scrolls</h5>
        <div className="mt-4">
          <Dialog
            title="Test Dialog"
            openTrigger={<Button>Open Dialog</Button>}
            confirm={{ label: "Confirm" }}
            cancel={{ label: "Cancel" }}
          >
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?
              </p>
              <p>
                t vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat.
              </p>
            </div>
          </Dialog>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>
          A dialog that cannot be dismissed with the Escape key nor with outside
          click
        </h5>
        <div className="mt-4">
          <Dialog
            title="Test Dialog"
            openTrigger={<Button>Open Dialog</Button>}
            confirm={{ label: "Confirm" }}
            cancel={{ label: "Cancel" }}
            closeWithEscOrPressOutside={false}
          >
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              maximus bibendum nisi vel lacinia. Curabitur sagittis elit nisi,
              sit amet lacinia nibh sollicitudin a.
            </div>
          </Dialog>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>A dialog with response</h5>

        <div className="mt-4">
          <Dialog
            title="Test Dialog"
            openTrigger={<Button>Open Dialog</Button>}
            confirm={{ label: "Confirm", callback: handleConfirm }}
            cancel={{ label: "Cancel", callback: handleCancel }}
          >
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              maximus bibendum nisi vel lacinia. Curabitur sagittis elit nisi,
              sit amet lacinia nibh sollicitudin a.
            </div>
          </Dialog>
          <div className="mt-2">Response: {dialogResponse}</div>
        </div>
      </div>
    </div>
  );
}

export default DialogPage;
