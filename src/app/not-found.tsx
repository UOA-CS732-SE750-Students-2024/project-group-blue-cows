import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-xl text-gray-700 mb-8">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="text-blue-600 hover:underline font-bold text-lg"
      >
        Go back to the home page
      </Link>
    </div>
  );
}
