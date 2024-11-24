import {
  cloneElement,
  Dispatch,
  ReactElement,
  SetStateAction,
  useState,
} from "react";
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
  openTrigger?: ReactElement;
  confirm?: {
    label: string;
    callback?: () => void;
    disabled?: boolean;
    loading?: boolean;
    dontCloseOnConfirm?: boolean;
  };
  cancel?: { label: string; callback?: () => void; disabled?: boolean };
  dialogSize?: DialogSize;
  closeWithEscOrPressOutside?: boolean;
  closeCallback?: () => void;
  titleSize?: DialogTitleSize;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
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
  isOpen,
  setIsOpen,
}: DialogProps) {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const isControlledIsOpen = isOpen !== undefined;
  const isOpenValue = isControlledIsOpen ? isOpen : uncontrolledIsOpen;

  const handleSetIsOpen = (v: boolean) => {
    if (!isControlledIsOpen) {
      setUncontrolledIsOpen(v);
    }

    if (setIsOpen) {
      setIsOpen(v);
    }
  };

  const handleConfirm = () => {
    if (!confirm?.dontCloseOnConfirm) {
      handleSetIsOpen(false);
    }
    confirm?.callback && confirm.callback();
  };

  const handleCancel = () => {
    handleSetIsOpen(false);
    cancel?.callback && cancel.callback();
  };

  const handleClose = () => {
    if (closeWithEscOrPressOutside) {
      handleSetIsOpen(false);
      closeCallback && closeCallback();
    }
  };

  return (
    <>
      {openTrigger &&
        cloneElement(openTrigger, {
          onClick: () => handleSetIsOpen(true),
        })}
      <DialogHUI open={isOpenValue} onClose={handleClose}>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div
          className="fixed inset-0 bg-neutral-900 bg-opacity-25 z-30"
          aria-hidden="true"
        />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 overflow-y-auto p-5 xs:p-10 z-30">
          <DialogPanel
            className={`mx-auto rounded-lg bg-white shadow-lg p-8 ${dialogSize}`}
          >
            <DialogTitle as={titleSize}>{title}</DialogTitle>

            <Description className="mt-8" as="div">
              {children}
            </Description>

            <div className="mt-8 flex flex-wrap justify-end gap-4">
              {cancel && (
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={cancel.disabled}
                >
                  {cancel.label}
                </Button>
              )}
              {confirm && (
                <Button
                  onClick={handleConfirm}
                  disabled={confirm.disabled}
                  loading={confirm.loading}
                >
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
