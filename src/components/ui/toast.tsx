import { Dispatch, SetStateAction, useEffect } from "react";
import IconClose from "./icons/close";
import Button from "./button";

type TToastProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  message: string;
};

function Toast({ show, setShow, message }: TToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000); // Dismiss after 3 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [show, setShow]);

  return (
    <div className="fixed bottom-8 flex w-full pointer-events-none">
      <div
        className={`border border-neutral-100 max-w-sm mx-auto transition-all rounded-lg shadow-lg bg-white pointer-events-auto p-8 inline-flex justify-center gap-4 ${
          show
            ? "translate-y-0 opacity-100"
            : "translate-y-[calc(100%+40px)] opacity-0"
        }`}
      >
        <div>{message}</div>
        <div className="-mt-1 -mr-1 -mb-1">
          <Button variant="quaternary" onClick={() => setShow(false)}>
            <IconClose />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Toast;
