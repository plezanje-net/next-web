import { cloneElement, ReactElement, useRef, useState } from "react";
import {
  Description,
  Dialog as DialogHUI,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Button from "./button";

export enum DialogSize {
  small = "max-w-sm",
  medium = "max-w-lg",
  large = "max-w-2xl",
  hug = "w-fit max-w-[100%]",
}

export enum DialogTitleSize {
  regular = "h4",
  large = "h3",
}

interface DialogProps {
  children: ReactElement;
  title: string;
  openTrigger: ReactElement;
  confirm?: { label: string; callback?: () => void; disabled?: boolean };
  cancel?: { label: string; callback?: () => void };
  dialogSize?: DialogSize;
  closeWithEscOrPressOutside?: boolean;
  closeCallback?: () => void;
  titleSize?: DialogTitleSize;
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
  titleSize = DialogTitleSize.regular,
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

  return (
    <>
      {cloneElement(openTrigger, {
        onClick: () => setIsOpen(true),
      })}
      <DialogHUI open={isOpen} onClose={handleClose}>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div
          className="fixed inset-0 bg-neutral-900 bg-opacity-25"
          aria-hidden="true"
        />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 overflow-y-auto p-10">
          <DialogPanel
            className={`mx-auto rounded-lg bg-white shadow-lg px-4 xs:px-8 py-8 ${dialogSize}`}
          >
            <DialogTitle as={titleSize}>{title}</DialogTitle>

            <Description className="mt-8" as="div">
              {children}
            </Description>

            <div className="mt-8 flex flex-wrap justify-end gap-4">
              {cancel && (
                <Button variant="secondary" onClick={handleCancel}>
                  {cancel.label}
                </Button>
              )}
              {confirm && (
                <Button onClick={handleConfirm} disabled={confirm.disabled}>
                  {confirm.label}
                </Button>
              )}
            </div>
          </DialogPanel>
        </div>
      </DialogHUI>
    </>
  );
}

export default Dialog;
