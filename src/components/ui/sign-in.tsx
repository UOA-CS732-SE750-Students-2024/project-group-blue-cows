"use client";
import { signIn } from "next-auth/react"

export function SignIn() {
  return (
    <form
      action={() => {signIn("google")}}
    >
      <button type="submit">Sign In</button>
    </form>
  )
} 