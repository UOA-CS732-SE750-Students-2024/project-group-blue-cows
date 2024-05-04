import { signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { toast } from "react-toastify";
import Image from "next/image";
import { showToastLogin } from "@/util/toastUtils";

export function SignIn() {
  return (
    <form
      action={() => {
        showToastLogin("Signing in with Google");
        signIn("google");
      }}
    >
      <Button
        type="submit"
        className="px-8 py-2 hover:bg-slate-800 border border-slate-700 text-sm w-full"
      >
        <Image
          src="/google.svg"
          width={20}
          height={20}
          alt="Google Logo"
          className="pr-2 w-6 h-6"
        />
        Sign in with Google
      </Button>
    </form>
  );
}
