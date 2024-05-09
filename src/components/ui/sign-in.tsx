import { signIn } from "next-auth/react";
import { Button } from "./button";
import Image from "next/image";
import { toastLogin } from "@/util/toastUtils";

export function SignIn() {
  return (
    <form
      action={() => {
        toastLogin("Signing in with Google");
        signIn("google");
      }}
    >
      <Button
        type="submit"
        className="px-8 py-2 hover:bg-slate-800 border border-slate-700 lg:text-sm w-full"
      >
        <Image
          src="/google.svg"
          width={20}
          height={20}
          alt="Google Logo"
          className="pr-2 w-6 h-6"
        />
        Sign in<span className="ml-1 hidden lg:inline">with Google</span>
      </Button>
    </form>
  );
}
