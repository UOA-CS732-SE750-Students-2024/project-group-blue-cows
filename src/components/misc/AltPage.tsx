// Used by not-found.tsx, error.tsx, loading.tsx etc
export default function AltPage({
  header,
  className = "text-red-600",
  subtitle,
  children,
}: {
  header: string;
  subtitle: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="h-full flex flex-col items-center justify-center">
      <h1 className={`text-6xl font-bold text-red-600 mb-4 ${className}`}>
        {header}
      </h1>
      <p className="text-xl text-gray-700 mb-8">{subtitle}</p>
      {children}
    </main>
  );
}
