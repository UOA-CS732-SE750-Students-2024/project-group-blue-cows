import AltPage from "@/components/misc/AltPage";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function LoadingPage() {
  return (
    <AltPage
      header="Loading..."
      className="text-blue-custom"
      subtitle="If the issue persists, please reload the page."
    >
      <LoadingSpinner />
    </AltPage>
  );
}
