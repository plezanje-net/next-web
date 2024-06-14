"use client";

import { LogRoutesProvider } from "@/components/log-dialog/log-routes-context";
import LogDialog from "@/components/log-dialog/log-dialog";
import Button from "@/components/ui/button";

function LogDialogPage() {
  return (
    <div className="mt-4 flex justify-center">
      <LogRoutesProvider>
        <LogDialog openTrigger={<Button>Log routes</Button>} />
      </LogRoutesProvider>
    </div>
  );
}

export default LogDialogPage;
