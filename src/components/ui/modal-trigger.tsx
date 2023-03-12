import { useOverlayTrigger } from "react-aria";
import { OverlayTriggerProps } from "@react-stately/overlays";
import { useOverlayTriggerState } from "@react-stately/overlays";
import Button from "./button";
import { Modal } from "./modal";
import { cloneElement, ReactElement, ReactNode } from "react";

interface ModalTriggerProps extends OverlayTriggerProps {
  children: (close: () => void) => ReactElement;
  triggerRenderStyle?: "button" | "icon" | "link";
  triggerVariant?: "primary" | "secondary";
  triggerLabel: string | ReactNode;
  dialogSize?: "small" | "medium" | "large";
}

function ModalTrigger(props: ModalTriggerProps) {
  const { children, triggerLabel } = props;
  const state = useOverlayTriggerState(props);
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state
  );

  return (
    <>
      <Button
        {...triggerProps}
        variant={props.triggerVariant}
        renderStyle={props.triggerRenderStyle}
      >
        {triggerLabel}
      </Button>
      {state.isOpen && (
        <Modal {...props} size={props.dialogSize} state={state}>
          {cloneElement(children(state.close), overlayProps)}
        </Modal>
      )}
    </>
  );
}

export default ModalTrigger;
