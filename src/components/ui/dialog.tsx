import { cloneElement, ReactElement, useRef, useState } from "react";
import { Dialog as DialogHUI } from "@headlessui/react";
import Button from "./button";

export enum DialogSize {
  small = "max-w-sm",
  medium = "max-w-lg",
  large = "max-w-2xl",
  hug = "w-fit max-w-[100%]",
}

interface DialogProps {
  children: ReactElement;
  title: string;
  openTrigger: ReactElement;
  confirm?: { label: string; callback?: () => void };
  cancel?: { label: string; callback?: () => void };
  dialogSize?: DialogSize;
  closeWithEscOrPressOutside?: boolean;
  closeCallback?: () => void;
}

function Dialog({
  children,
  title,
  openTrigger,
  confirm,
  cancel,
  dialogSize = DialogSize.small,
  closeWithEscOrPressOutside = true,
  closeCallback,
}: DialogProps) {
  let [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    setIsOpen(false);
    confirm?.callback && confirm.callback();
  };

  const handleCancel = () => {
    setIsOpen(false);
    cancel?.callback && cancel.callback();
  };

  const handleClose = () => {
    if (closeWithEscOrPressOutside) {
      setIsOpen(false);
      closeCallback && closeCallback();
    }
  };

  const initFocusRef = useRef(null);

  return (
    <>
      {cloneElement(openTrigger, {
        onClick: () => setIsOpen(true),
      })}
      <DialogHUI
        open={isOpen}
        onClose={handleClose}
        initialFocus={initFocusRef}
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div
          className="fixed inset-0 bg-neutral-900 bg-opacity-25"
          aria-hidden="true"
        />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 overflow-y-auto p-10">
          <DialogHUI.Panel
            ref={initFocusRef}
            className={`mx-auto rounded-lg bg-white px-8 py-8 shadow-lg ${dialogSize}`}
          >
            <DialogHUI.Title as="h4">{title}</DialogHUI.Title>
            {isOpen && (
              <DialogHUI.Description className="mt-8" as="div">
                {children}
              </DialogHUI.Description>
            )}
            <div className="mt-10 flex flex-wrap justify-end gap-4">
              {cancel && (
                <Button variant="secondary" onClick={handleCancel}>
                  {cancel.label}
                </Button>
              )}
              {confirm && (
                <Button onClick={handleConfirm}>{confirm.label}</Button>
              )}
            </div>
          </DialogHUI.Panel>
        </div>
      </DialogHUI>
    </>
  );
}

export default Dialog;
