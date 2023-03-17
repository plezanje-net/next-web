import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

export enum DialogSize {
  small = "max-w-sm",
  medium = "max-w-lg",
  large = "max-w-2xl",
}

interface DialogProps {
  dialogSize?: DialogSize;
  title: string;
  openTrigger: ReactNode;
  confirmTrigger: ReactNode;
  cancelTrigger: ReactNode;
  closeWithEscape?: boolean;
  closeWithPressOutside?: boolean;
  children: ReactNode;
}

function DialogRad(props: DialogProps) {
  const {
    dialogSize = DialogSize.small,
    title,
    openTrigger,
    confirmTrigger,
    cancelTrigger,
    closeWithEscape = true,
    closeWithPressOutside = true,
    children,
  } = props;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{openTrigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 overflow-y-auto bg-neutral-900 bg-opacity-25 p-10">
          <Dialog.Content
            className={`mx-auto rounded-lg bg-white py-10 px-8 shadow-lg ${dialogSize}`}
            {...(!closeWithEscape && {
              onEscapeKeyDown: (event) => event.preventDefault(),
            })}
            {...(!closeWithPressOutside && {
              onPointerDownOutside: (event) => event.preventDefault(),
            })}
          >
            <Dialog.Title asChild>
              <h4>{title}</h4>
            </Dialog.Title>
            <Dialog.Description className="mt-8" asChild>
              {children}
            </Dialog.Description>
            <div className="mt-10 flex flex-wrap justify-end gap-4">
              <Dialog.Close asChild>{cancelTrigger}</Dialog.Close>
              <Dialog.Close asChild>{confirmTrigger}</Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default DialogRad;
