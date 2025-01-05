import Dialog, { DialogSize } from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Crag, Route, Sector } from "@/graphql/generated";
import updateRouteAction from "../[cragSlug]/sectors/[sectorId]/routes/server-actions/update-route-action";
import updateSectorAction from "../[cragSlug]/sectors/server-actions/update-sector-action";
import updateCragAction from "../[cragSlug]/edit/server-actions/update-crag-action";
import Checkbox from "@/components/ui/checkbox";

type TSuggestPublishDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  contributable: Route | Sector | Crag;
};

function SuggestPublishDialog({
  isOpen,
  setIsOpen,
  contributable,
}: TSuggestPublishDialogProps) {
  const router = useRouter();

  const [cascadePublish, setCascadePublish] = useState(true);
  const [loading, setLoading] = useState(false);

  let description = "";
  let cascadeText = null;
  switch (contributable.__typename) {
    case "Route":
      description = `Ali res želiš uredništvu predlagati objavo smeri `;
      break;

    case "Sector":
      description = `Ali res želiš uredništvu predlagati objavo sektorja `;
      cascadeText = contributable.routes.length
        ? "Predlagaj tudi objavo vseh smeri v tem sektorju."
        : null;
      break;

    case "Crag":
      description = `Ali res želiš uredništvu predlagati objavo plezališča `;
      cascadeText = contributable.sectors.length
        ? contributable.sectors.some((sector) => sector.routes.length)
          ? "Predlagaj tudi objavo vseh sektorjev in vseh smeri v tem plezališču."
          : "Predlagaj tudi objavo vseh sektorje v tem plezališču."
        : null;
      break;
  }

  const handleConfirm = async () => {
    setLoading(true);

    const data = {
      id: contributable.id,
      publishStatus: "in_review",
      ...(contributable.__typename !== "Route" && {
        cascadePublishStatus: cascadePublish,
      }),
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
  };

  return (
    <Dialog
      title="Predlog uredništvu"
      dialogSize={DialogSize.medium}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cancel={{ label: "Prekliči", disabled: loading }}
      confirm={{
        label: "Predlagaj objavo",
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

        {cascadeText && (
          <div className="mt-4">
            <Checkbox
              label={cascadeText}
              checked={cascadePublish}
              onChange={setCascadePublish}
              disabled={loading}
            />
          </div>
        )}
      </div>
    </Dialog>
  );
}

export default SuggestPublishDialog;
