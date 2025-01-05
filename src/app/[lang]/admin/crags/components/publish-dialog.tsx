import Dialog from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Crag, Route, Sector } from "@/graphql/generated";
import updateRouteAction from "../[cragSlug]/sectors/[sectorId]/routes/server-actions/update-route-action";
import updateSectorAction from "../[cragSlug]/sectors/server-actions/update-sector-action";
import updateCragAction from "../[cragSlug]/edit/server-actions/update-crag-action";
import Checkbox from "@/components/ui/checkbox";

type TPublishDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  contributable: Route | Sector | Crag;
};

function PublishDialog({
  isOpen,
  setIsOpen,
  contributable,
}: TPublishDialogProps) {
  const router = useRouter();

  const [cascadePublish, setCascadePublish] = useState(true);
  const [loading, setLoading] = useState(false);

  let title = "";
  let description = "";
  let cascadeText = null;
  switch (contributable.__typename) {
    case "Route":
      title = "Objava smeri";
      description = `Ali res želiš objaviti smer `;
      break;

    case "Sector":
      title = "Objava sektorja";
      description = `Ali res želiš objaviti sektor `;
      cascadeText = contributable.routes.length
        ? "Objavi tudi vse smeri v tem sektorju."
        : null;
      break;

    case "Crag":
      title = "Objava plezališča";
      description = `Ali res želiš objaviti plezališče `;
      cascadeText = contributable.sectors.length
        ? contributable.sectors.some((sector) => sector.routes.length)
          ? "Objavi tudi vse sektorje in vse smeri v tem plezališču."
          : "Objavi tudi vse sektorje v tem plezališču."
        : null;
      break;
  }

  const handleConfirm = async () => {
    setLoading(true);

    const data = {
      id: contributable.id,
      publishStatus: "published",
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
      title={title}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cancel={{ label: "Prekliči", disabled: loading }}
      confirm={{
        label: "Objavi",
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

export default PublishDialog;
