"use client";

import Button from "@/components/ui/button";
import Dialog, { DialogSize } from "@/components/ui/dialog";
import IconPlus from "@/components/ui/icons/plus";

function AddActivity() {
  return (
    <Dialog
      title="Dodajanje aktivnosti"
      openTrigger={
        <Button variant="quaternary">
          <span className="flex">
            <IconPlus />
            <span className="ml-2">Dodaj aktivnost</span>
          </span>
        </Button>
      }
      dialogSize={DialogSize.large}
      confirm={{ label: "Shrani" }}
      cancel={{ label: "Prekliči" }}
    >
      <div>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-4">
          <div className="flex-1">datum</div>
          <div className="flex-1">vrsta aktivnosti</div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-4">
          <div className="flex-1">lokacija</div>
          <div className="flex-1">trajanje</div>
        </div>
        <div>opis aktivnosti</div>
      </div>
    </Dialog>
  );
}

export default AddActivity;