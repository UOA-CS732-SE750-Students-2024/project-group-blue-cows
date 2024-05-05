"use client";
import * as Dialogue from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { ReactNode, useState } from "react";

interface ModalState {
  open: boolean;
  title?: string;
  content: ReactNode;
}

let setState = ({ open, title, content }: ModalState) => {};

export function Modal() {
  const [{ open, title, content }, setStateTemp] = useState<ModalState>({
    open: false,
    content: "",
  });
  setState = setStateTemp;
  const setOpen = (open: boolean) => {
    setState({ open, title, content });
  };

  return (
    <Dialogue.Root open={open} onOpenChange={setOpen}>
      <Dialogue.Trigger asChild>
        <Button variant="default" className=" bg-blue-500 text-white">
          Sign In or Register
        </Button>
      </Dialogue.Trigger>
      <Dialogue.Portal>
        <Dialogue.Overlay className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Dialogue.Content className="w-3/4 h-3/4 flex flex-col items-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 text-xl">
            <Dialogue.Title className="text-center text-2xl">
              {undefined}
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
}

export const openModal = ({ title, content }: OpenModalProps) => {
  setState({ open: true, title, content });
};
