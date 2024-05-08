"use client";
import { ModalProps } from "@/util/modalUtils";
import * as Dialogue from "@radix-ui/react-dialog";
import { useState } from "react";
import { BlueButton, YellowButton } from "./buttons";

type ModalTypes = "confirm" | "alert";

type OpenModalProps = ModalProps & { type: ModalTypes };

type ModalState = OpenModalProps & { open: boolean };

let setState = ({ open, title, content, className }: ModalState) => {};

export function Modal() {
  const [{ open, title, content, type, className }, setStateTemp] =
    useState<ModalState>({
      open: false,
      content: "",
      type: "alert",
    });
  setState = setStateTemp;

  const setOpen = (open: boolean, resolveValue?: string) => {
    setState({ open, title, type, content });
    if (!open) {
      resolve(resolveValue);
      resolve = defaultResolve;
    }
  };

  return (
    <Dialogue.Root open={open} onOpenChange={setOpen}>
      <Dialogue.Portal>
        <Dialogue.Overlay className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Dialogue.Content
            className={`w-3/4 h-3/4 flex flex-col items-center gap-2 justify-stretch bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 text-xl p-6 ${className}`}
          >
            <Dialogue.Title className="text-center text-2xl">
              {title}
            </Dialogue.Title>
            {content}
            <Buttons
              type={type}
              close={(resolveValue?: string) => setOpen(false, resolveValue)}
            />
          </Dialogue.Content>
        </Dialogue.Overlay>
      </Dialogue.Portal>
    </Dialogue.Root>
  );
}

function Buttons({
  type,
  close,
}: {
  type: ModalTypes;
  close: (resolveValue?: string) => void;
}) {
  return (
    <div className="flex w-full justify-center gap-6 mt-auto">
      {type === "confirm" && (
        <YellowButton className="w-1/2" onClick={() => close(undefined)}>
          Cancel
        </YellowButton>
      )}
      <BlueButton className="w-1/2" onClick={() => close("confirm")}>
        Confirm
      </BlueButton>
    </div>
  );
}

const defaultResolve: (value?: string) => void = () => {};

let resolve: (value?: string) => void = defaultResolve;

export const openModal = async ({
  title,
  content,
  className,
  type,
}: OpenModalProps) => {
  setState({ open: true, title, content, type, className });
  return new Promise((res) => (resolve = res));
};
