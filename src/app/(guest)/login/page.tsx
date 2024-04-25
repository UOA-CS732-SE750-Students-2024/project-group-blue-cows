import AuthForm from "@/components/form/authform";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen scale-140">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] bg-gray-200 p-4 rounded-lg shadow-lg ">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
        </div>
        <div>
          <AuthForm />
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/sign-up"
            className="underline underline-offset-4 hover:text-primary"
          >
            Create new account
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
