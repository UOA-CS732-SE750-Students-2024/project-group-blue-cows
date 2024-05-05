import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { ButtonProps, Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";

export function Modal({ children, className, ...props }: ButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className=" bg-blue-500 text-white">
          Sign In or Register
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Log In / Register
          </DialogTitle>
        </DialogHeader>
        <Button
          type="submit"
          className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 text-xl h-24 w-full"
          onClick={() => {
            toast.info("Loading...", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            signIn("google");
          }}
        >
          <img src="/google.svg" alt="Google Logo" className="w-8 h-8" />
          Sign In with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
