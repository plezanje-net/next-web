"use client";

import ImageUploadForm from "./image-upload-form";
import Dialog from "../ui/dialog";
import Button from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

function ImageUploadDialog({
  authToken,
  entityId,
  entityType,
}: {
  authToken: string;
  entityId: string;
  entityType: string;
}) {
  const router = useRouter();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Dialog
        title="Dodajanje fotografije"
        openTrigger={<Button>Dodaj fotografijo</Button>}
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        closeWithEscOrPressOutside={!loading}
        confirm={{
          label: "Objavi",
          disabled: loading,
          loading: loading,
          type: "submit",
          form: "image-upload-form",
          dontCloseOnConfirm: true,
        }}
        cancel={{ label: "Prekliči", disabled: loading }}
      >
        <ImageUploadForm
          entityType={entityType}
          entityId={entityId}
          authToken={authToken}
          loading={loading}
          onLoadingChange={setLoading}
          onUploadSuccess={() => {
            setDialogIsOpen(false);
            router.refresh();
          }}
        />
      </Dialog>
    </div>
  );
}

export default ImageUploadDialog;
