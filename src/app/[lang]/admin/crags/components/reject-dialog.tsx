import Dialog from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Crag, Route, Sector } from "@/graphql/generated";
import updateRouteAction from "../[cragSlug]/sectors/[sectorId]/routes/server-actions/update-route-action";
import updateSectorAction from "../[cragSlug]/sectors/server-actions/update-sector-action";
import updateCragAction from "../[cragSlug]/edit/server-actions/update-crag-action";
import Checkbox from "@/components/ui/checkbox";
import TextArea from "@/components/ui/text-area";

type TRejectDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  contributable: Route | Sector | Crag;
};

function RejectDialog({
  isOpen,
  setIsOpen,
  contributable,
}: TRejectDialogProps) {
  const router = useRouter();

  const [rejectionMessage, setRejectionMessage] = useState("");
  const [rejectionMessageError, setRejectionMessageError] = useState("");

  const [loading, setLoading] = useState(false);

  let description = "";
  let cascadeText = null;
  let rejectionDescription = "";
  switch (contributable.__typename) {
    case "Route":
      description = `Ali res želiš zavrniti objavo smeri `;
      rejectionDescription =
        "Razlog za zavrnitev objave smeri bo posredovan osebi, ki je predlagala objavo. Na podlagi tega sporočila bo lahko smer uredila tako, da bo primerna za objavo.";
      break;

    case "Sector":
      description = `Ali res želiš zavrniti objavo sektorja `;
      cascadeText = contributable.routes.length
        ? "Zavrni tudi objavo vseh smeri v tem sektorju."
        : null;
      rejectionDescription =
        "Razlog za zavrnitev objave sektorja bo posredovan osebi, ki je predlagala objavo. Na podlagi tega sporočila bo lahko sektor uredila tako, da bo primeren za objavo.";
      break;

    case "Crag":
      description = `Ali res želiš zavrniti objavo plezališča `;
      cascadeText = contributable.sectors.length
        ? contributable.sectors.some((sector) => sector.routes.length)
          ? "Zavrni tudi objavo vseh sektorje in vseh smeri v tem plezališču."
          : "Zavrni tudi objavo vseh sektorjev v tem plezališču."
        : null;
      rejectionDescription =
        "Razlog za zavrnitev objave plezališča bo posredovan osebi, ki je predlagala objavo. Na podlagi tega sporočila bo lahko plezališče uredila tako, da bo primerno za objavo.";
      break;
  }

  const handleRejectionMessageChange = (message: string) => {
    setRejectionMessageError("");
    setRejectionMessage(message);
  };

  const handleConfirm = async () => {
    setLoading(true);

    // Validate form
    //    - rejection message is required
    if (!rejectionMessage) {
      setRejectionMessageError("Razlog za zavrnitev je obvezen podatek.");
      setLoading(false);
      return;
    }

    const data = {
      id: contributable.id,
      publishStatus: "draft",
      ...(contributable.__typename !== "Route" && {
        cascadePublishStatus: true,
      }),
      rejectionMessage: rejectionMessage,
    };

    switch (contributable.__typename) {
      case "Route":
        await updateRouteAction(data);
        break;
      case "Sector":
        await updateSectorAction(data);
        break;
      case "Crag":
        await updateCragAction(data);
    }

    setIsOpen(false);
    setLoading(false);
    router.refresh();

    // TODO: if this was a crag that was rejected, redirect somewhere... where?
  };

  return (
    <Dialog
      title="Zavrnitev objave"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cancel={{ label: "Prekliči", disabled: loading }}
      confirm={{
        label: "Zavrni objavo",
        callback: handleConfirm,
        dontCloseOnConfirm: true,
        loading: loading,
        disabled: loading,
      }}
    >
      <div>
        <div>
          {description}
          <span className="font-medium">{contributable.name}</span>?
        </div>

        <div className="mt-4">
          <TextArea
            value={rejectionMessage}
            onChange={handleRejectionMessageChange}
            label="Razlog za zavrnitev"
            description={rejectionDescription}
            errorMessage={rejectionMessageError}
            isDisabled={loading}
          />
        </div>

        {cascadeText && (
          <div className="mt-4">
            <Checkbox label={cascadeText} checked={true} disabled />
          </div>
        )}
      </div>
    </Dialog>
  );
}

export default RejectDialog;
