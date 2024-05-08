import { openModal } from "@/components/misc/Modal";
import { ReactNode } from "react";

export interface ModalProps {
  title?: string;
  content: ReactNode;
  className?: string;
}

// These functions open a modal that you can customise with className
// await them to make them blocking like built-in alert and confirm

// Returns a promise that resolves when the modal is closed:
// "confirm" if the user clicked the confirm button
// "" (empty string) if the user clicked the cancel button or clicked away

export function confirm(props: ModalProps) {
  return openModal({ ...props, type: "confirm" });
}

export function alert(props: ModalProps) {
  return openModal({ ...props, type: "alert" });
}

// These resolve to truthy/falsy strings so prompt can be easily implemented if anyone wants to
