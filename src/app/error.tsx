"use client";

// Catches errors thrown in pages and child layouts
export default function ErrorPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">
        500 - Internal Server Error
      </h1>
      <p className="text-xl text-gray-700 mb-8">
        Something went wrong on our end. Please try again later.
      </p>
    </div>
  );
}