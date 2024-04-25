"use client"
// https://github.com/shadcn-ui/ui/blob/main/apps/www/app/(app)/examples/authentication/components/user-auth-form.tsx
import { cn } from "@/util/cnUtils"
import { Button } from "@/components/ui/button"
import { IoReload } from "react-icons/io5";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";   
import React from "react";

interface UserAuthProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AuthForm({ className, ...props }: UserAuthProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

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
          <Button onClick = {firebaseSignIn} disabled={isLoading}>
            {isLoading && (
              <IoReload className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
    );
  }