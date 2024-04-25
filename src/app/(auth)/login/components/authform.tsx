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

interface UserAuthProps extends React.HTMLAttributes<HTMLDivElement> {}

const auth = getAuth();
const uiConfig = {
  signInFlow: "popup",
  signInOptions: [GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    // signInSuccessWithAuthResult: (authResult, redirectUrl) => {
    //   // Handle sign-in success. For example, you can set the user's session and redirect to a different page.
    //   console.log(authResult, redirectUrl);
    //   return false; // This tells FirebaseUI not to redirect.
    // },
  },
};

export default function AuthForm({ className, ...props }: UserAuthProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  async function firebaseSignIn() {
    setIsLoading(true);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
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
          </div>
          <Button disabled={isLoading}>
            {isLoading && <IoReload className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <div className={cn("grid gap-6", className)} {...props}>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          </div>
        </div>
      </form>
    </div>
  );
}
