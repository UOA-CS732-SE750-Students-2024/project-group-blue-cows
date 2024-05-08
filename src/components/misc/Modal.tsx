"use client";
import * as Dialogue from "@radix-ui/react-dialog";
import { ReactNode, useState } from "react";
import { BlueButton, YellowButton } from "./buttons";

interface ModalState {
  open: boolean;
  title?: string;
  content: ReactNode;
  className?: string;
}

let setState = ({ open, title, content, className }: ModalState) => {};

export function Modal() {
  const [{ open, title, content, className }, setStateTemp] =
    useState<ModalState>({
      open: false,
      content: "",
    });
  setState = setStateTemp;
  const setOpen = (open: boolean) => {
    setState({ open, title, content });
    if (!open) {
      resolve(false);
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
            <Buttons />
          </Dialogue.Content>
        </Dialogue.Overlay>
      </Dialogue.Portal>
    </Dialogue.Root>
  );
}

function Buttons() {
  return (
    <div className="flex justify-center gap-4 mt-auto">
      <YellowButton onClick={() => resolve(true)}>Confirm</YellowButton>
      <BlueButton onClick={() => resolve(false)}>Cancel</BlueButton>
    </div>
  );
}

interface OpenModalProps {
  title?: string;
  content: ReactNode;
  className?: string;
}

const defaultResolve: (value: unknown) => void = () => {};

let resolve: (value: unknown) => void = defaultResolve;

export const openModal = async ({
  title,
  content,
  className,
}: OpenModalProps) => {
  setState({ open: true, title, content, className });
  return new Promise((res) => (resolve = res));
};
