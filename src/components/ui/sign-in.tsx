import { useRouter } from "next/navigation";

export function SignIn() {
  const router = useRouter();

  return (
    <form>
      <button type="button" onClick={() => router.push("/login")}>
        Sign in
      </button>
    </form>
  );
}
