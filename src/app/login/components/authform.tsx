"use client"
// https://github.com/shadcn-ui/ui/blob/main/apps/www/app/(app)/examples/authentication/components/user-auth-form.tsx
import { cn } from "@/util/cnUtils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" 
import { Label } from "@/components/ui/label"; 
import { IoReload } from "react-icons/io5";
import React from "react";

interface UserAuthProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AuthForm({ className, ...props }: UserAuthProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
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
          <Button disabled={isLoading}>
            {isLoading && (
              <IoReload className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      </div>
    );
  }