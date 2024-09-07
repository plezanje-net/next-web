"use client";

import Button from "@/components/ui/button";
import Toast from "@/components/ui/toast";
import { useState } from "react";

function ToastPage() {
  const [showToast, setShowToast] = useState(false);

  return (
    <>
      <div className="flex flex-wrap justify-center mt-4">
        <Button onClick={() => setShowToast(true)}>Make toast</Button>
      </div>
      <Toast
        show={showToast}
        setShow={setShowToast}
        message="Toast mit Schäuferla."
      />
    </>
  );
}

export default ToastPage;
