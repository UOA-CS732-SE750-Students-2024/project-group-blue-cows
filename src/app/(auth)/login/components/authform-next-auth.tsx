import { cn } from "@/util/cnUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoReload } from "react-icons/io5";
import React from "react";

interface UserAuthProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AuthForm({ className, ...props }: UserAuthProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleGoogleSignIn = () => {
    window.location.href = "https://accounts.google.com";
  };

  return (
    <div className={cn("auth-form", className)} {...props}>
      <Button onClick={handleGoogleSignIn}>Sign In with Google</Button>
    </div>
  );
}
