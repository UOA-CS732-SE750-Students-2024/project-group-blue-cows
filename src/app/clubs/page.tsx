import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function ClubsPage() {
  return (
    <main className="h-full">
      <div className="flex flex-col justify-center items-center gap-2 h-1/3 bg-[url('cow-banner.svg')] bg-cover">
        <h2 className="text-center text-xl font-bold">Browse Clubs</h2>
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
    </main>
  );
}
