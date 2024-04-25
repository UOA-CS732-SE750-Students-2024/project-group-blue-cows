"use client";
// https://github.com/shadcn-ui/ui/blob/main/apps/www/app/(app)/examples/authentication/components/user-auth-form.tsx
import { cn } from "@/util/cnUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoReload } from "react-icons/io5";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import React from "react";
import { signIn } from "next-auth/react";

interface UserAuthProps extends React.HTMLAttributes<HTMLDivElement> {}

// const auth = getAuth();
// const uiConfig = {
//   signInFlow: "popup",
//   signInOptions: [GoogleAuthProvider.PROVIDER_ID],
//   callbacks: {
//     // signInSuccessWithAuthResult: (authResult, redirectUrl) => {
//     //   // Handle sign-in success. For example, you can set the user's session and redirect to a different page.
//     //   console.log(authResult, redirectUrl);
//     //   return false; // This tells FirebaseUI not to redirect.
//     // },
//   },
// };

export default function AuthForm({ className, ...props }: UserAuthProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form
        action={() => {
          signIn("google", { callbackUrl: "/" });
        }}
      >
        <div className="grid gap-2">
          {/* <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="andrew.meads@auckland.ac.nz"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div> */}
          <Button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50"
          >
            <img src="/google.svg" alt="Google Logo" className="w-4 h-4" />
            Sign In with Google
          </Button>
        </div>
      </form>
    </div>
  );
}
