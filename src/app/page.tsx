import { redirect } from "next/navigation";

// Testing page is now at /test
export default function RootPage() {
  redirect("/clubs");
}
