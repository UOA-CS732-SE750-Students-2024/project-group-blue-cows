import { signInAction } from "@/services/authServices"


export function SignIn() {
  return (
    <form
      action={() => {signInAction("google")}}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
} 