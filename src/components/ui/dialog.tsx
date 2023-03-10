import { useRef } from "react";
import { AriaDialogProps, useDialog } from "react-aria";

interface DialogProps extends AriaDialogProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

function Dialog(props: DialogProps) {
  const dialogRef = useRef(null);
  const { dialogProps, titleProps } = useDialog(props, dialogRef);
  const { title, children } = props;

  return (
    <div
      {...dialogProps}
      ref={dialogRef}
      className="rounded-lg bg-white py-10 px-8 outline-none"
    >
      <h4 {...titleProps}>{title}</h4>
      {children}
    </div>
  );
}

export default Dialog;
