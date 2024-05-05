"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { ButtonProps, Button } from "../ui/button";
import { useState } from "react";
import { showToastDemo } from "@/util/toastUtils";

export function Modal({ children, className, ...props }: ButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className=" bg-blue-500 text-white">
          Sign In or Register
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="text-center text-2xl">
          Log In / Register
        </DialogTitle>
        <Button
          type="submit"
          className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 text-xl h-24 w-full"
          onClick={() => {
            showToastDemo("Sign In with Google");
          }}
        >
          Sign In with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
