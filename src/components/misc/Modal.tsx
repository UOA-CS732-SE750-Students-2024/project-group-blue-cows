"use client";
import * as Dialogue from "@radix-ui/react-dialog";
import { ReactNode, useState } from "react";

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
      resolve(null);
      resolve = defaultResolve;
    }
  };

  return (
    <Dialogue.Root open={open} onOpenChange={setOpen}>
      <Dialogue.Portal>
        <Dialogue.Overlay className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Dialogue.Content
            className={`w-3/4 h-3/4 flex flex-col items-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 text-xl ${className}`}
          >
            <Dialogue.Title className="text-center text-2xl">
              {title}
            </Dialogue.Title>
            {content}
          </Dialogue.Content>
        </Dialogue.Overlay>
      </Dialogue.Portal>
    </Dialogue.Root>
  );
}

interface OpenModalProps {
  title?: string;
  content: ReactNode;
  className?: string;
}

const defaultResolve: (value: unknown) => void = () => {
  throw new Error("Modal not initialized");
};

let resolve: (value: unknown) => void = defaultResolve;

export const openModal = async ({
  title,
  content,
  className,
}: OpenModalProps) => {
  setState({ open: true, title, content, className });
  return new Promise((res) => (resolve = res));
};
