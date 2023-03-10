import { ReactNode, useRef } from "react";
import {
  Overlay,
  useModalOverlay,
  AriaModalOverlayProps,
} from "@react-aria/overlays";
import { OverlayTriggerState } from "@react-stately/overlays";

interface ModalProps extends AriaModalOverlayProps {
  children: ReactNode;
  state: OverlayTriggerState;
  size?: "small" | "medium" | "large";
}

export function Modal(props: ModalProps) {
  const { children, state } = props;
  const modalRef = useRef(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, modalRef);

  const maxWidth =
    props?.size === "medium"
      ? "max-w-lg"
      : props?.size === "large"
      ? "max-w-2xl"
      : "max-w-sm";

  return (
    <Overlay>
      <div
        className="fixed inset-0 overflow-y-auto bg-neutral-900 bg-opacity-25"
        {...underlayProps}
      >
        <div {...modalProps} ref={modalRef} className="px-10">
          <div
            className={`mx-auto my-10 rounded-lg shadow-lg outline-none ${maxWidth}`}
          >
            {children}
          </div>
        </div>
      </div>
    </Overlay>
  );
}
