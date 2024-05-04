"use client";

import ErrorPage from "./error";

// Catches errors thrown in root layout
export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <ErrorPage error={error} reset={reset} />;
}