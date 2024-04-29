import Image from "next/image";
import { Input } from "@/components/ui/input";
import { FilterForm } from "@/components/ui/filter-form";

export default function ClubsPage() {
  return (
    <main className="h-full">
      <div className="flex flex-col justify-center items-center gap-4 h-1/3 bg-[url('cow-banner.svg')] bg-cover">
        <h2 className="text-center text-2xl font-semibold">Browse Clubs</h2>
        <div role="doc-subtitle" className="text-center">
          Find a club that suits your interests and goals.
        </div>
        <div className="w-1/2 flex relative">
          <Image
            src="nav-search-icon.svg"
            alt=""
            width={5}
            height={5}
            className="brightness-75 w-5 h-auto absolute top-2.5 left-2.5"
          />
          <Input
            type="search"
            placeholder="Search"
            className="w-full rounded-lg pl-10"
          />
        </div>
      </div>
      <div className="w-full flex">
        <FilterForm />
        <div>{/* This bit should be okay */}</div>
      </div>
    </main>
  );
}
