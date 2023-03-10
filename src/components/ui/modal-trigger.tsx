import { useOverlayTrigger } from "react-aria";
import { OverlayTriggerProps } from "@react-stately/overlays";
import { useOverlayTriggerState } from "@react-stately/overlays";
import Button from "./button";
import { Modal } from "./modal";
import { cloneElement, ReactElement } from "react";

interface ModalTriggerProps extends OverlayTriggerProps {
  children: (close: () => void) => ReactElement;
  label: string;
  size?: "small" | "medium" | "large";
}

function ModalTrigger(props: ModalTriggerProps) {
  const { children, label } = props;
  const state = useOverlayTriggerState(props);
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state
  );

  return (
    <>
      <Button {...triggerProps}>{label}</Button>
      {state.isOpen && (
        <Modal {...props} state={state}>
          {cloneElement(children(state.close), overlayProps)}
        </Modal>
      )}
    </>
  );
}

export default ModalTrigger;
