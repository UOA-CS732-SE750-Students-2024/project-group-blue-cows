"use client";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { showToastDemo } from "@/util/toastUtils";

// Use this page to test your components
export default function TestPage() {
  // redirect("/clubs"); // Uncomment me for the submission

  // Next https://nextjs.org/docs
  // Shadcn https://ui.shadcn.com/
  // react-toastify https://fkhadra.github.io/react-toastify/introduction

  return (
    <main>
      <h1>Test</h1>
      <Button onClick={() => showToastDemo("🍞!")}>🍞</Button>
    </main>
  );
}
